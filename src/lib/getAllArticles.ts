"use server";

import queryAllArticles from "@/queries/queryAllArticles";
import { ArticleType, tables } from "@/lib/types";
import { cacheLife, cacheTag } from "next/cache";
import { createConnectionPool, endConnectionPool } from "./connection";

export const getAllArticles = async (articleType: ArticleType) => {
  "use cache";
  cacheLife({ expire: 60 });
  cacheTag(tables[articleType]);

  const pool = await createConnectionPool();

  const data = await queryAllArticles(pool, articleType);

  await endConnectionPool(pool);

  return data;
};
