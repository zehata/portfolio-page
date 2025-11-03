"use server";

import { ArticleType, tables } from "@/lib/types";
import queryArticleStamps from "@/queries/queryArticleStamps";
import { keyBy } from "lodash";
import queryArticleBySlug from "@/queries/queryArticleBySlug";
import { requestConnectionPool, requestConnectionPoolEnd } from "./connection";
import { cacheLife, cacheTag } from "next/cache";

export const getArticleBySlug = async (
  articleType: ArticleType,
  slug: string,
) => {
  "use cache";
  cacheLife({ expire: 60 });
  cacheTag(tables[articleType]);

  const pool = await requestConnectionPool();

  const data = await queryArticleBySlug(pool, articleType, slug);
  const stampsData = await queryArticleStamps(pool, articleType, data.id);

  requestConnectionPoolEnd();

  return {
    id: data.id,
    title: data.title,
    created: data.created,
    modified: data.modified,
    content: data.content,
    stamps: keyBy(stampsData, "id"),
  };
};

export default getArticleBySlug;
