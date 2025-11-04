"use server";

import queryAllArticles from "@/queries/queryAllArticles";
import { ArticleType, tables } from "@/lib/types";
import {
  requestConnectionPool,
  requestConnectionPoolEnd,
} from "@/lib/connection";
import { cacheLife, cacheTag } from "next/cache";

export const getAllArticles = async (articleType: ArticleType) => {
  "use cache";
  cacheLife({ expire: 60 });
  cacheTag(tables[articleType]);

  const pool = await requestConnectionPool();

  const data = await queryAllArticles(pool, articleType);

  requestConnectionPoolEnd();

  return data;
};

export default getAllArticles;
