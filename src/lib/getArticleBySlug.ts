"use server";

import Connection from "./Connection";
import { ArticleType, tables } from "@/lib/types";
import { unstable_cache } from "next/cache";
import queryArticleStamps from "@/queries/selectArticleStampsQuery";
import { keyBy } from "lodash";
import queryArticleBySlug from "@/queries/queryArticleBySlug";

export const getArticleBySlug = async (
  articleType: ArticleType,
  slug: string,
) =>
  unstable_cache(
    async (articleType: ArticleType, slug: string) => {
      const pool = await Connection.requestConnectionPool();

      const data = await queryArticleBySlug(pool, articleType, slug);
      const stampsData = await queryArticleStamps(pool, articleType, data.id);

      await Connection.requestConnectionPoolEnd();

      return {
        id: data.id,
        title: data.title,
        created: data.created,
        modified: data.modified,
        content: data.content,
        stamps: keyBy(stampsData, "id"),
      };
    },
    [],
    {
      tags: [slug, tables[articleType]],
      revalidate: 60,
    },
  )(articleType, slug);

export default getArticleBySlug;
