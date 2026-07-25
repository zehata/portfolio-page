"use server";

import { ArticleType, tables } from "@/lib/types";
import queryArticleStamps from "@/queries/queryArticleStamps";
import { keyBy } from "lodash";
import queryArticleBySlug from "@/queries/queryArticleBySlug";
import { cacheLife, cacheTag } from "next/cache";
import { createConnectionPool, endConnectionPool } from "./connection";

export const getArticleBySlug = async (
  articleType: ArticleType,
  slug: string,
) => {
  "use cache";
  cacheLife({ expire: 60 });
  cacheTag(tables[articleType]);

  const pool = await createConnectionPool();

  const data = await queryArticleBySlug(pool, articleType, slug);
  const stampsData = await queryArticleStamps(pool, articleType, data.id);

  await endConnectionPool(pool);

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
