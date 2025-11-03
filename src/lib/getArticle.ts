"use server";

import queryArticle from "@/queries/queryArticle";
import { ArticleType, tables } from "@/lib/types";
import { unstable_cache } from "next/cache";
import queryArticleStamps from "@/queries/queryArticleStamps";
import { keyBy } from "lodash";
import { requestConnectionPool, requestConnectionPoolEnd } from "./connection";

export const getArticle = async (articleType: ArticleType, id: string) =>
  unstable_cache(
    async (articleType: ArticleType, id: string) => {
      const pool = await requestConnectionPool();

      const data = await queryArticle(pool, articleType, id);
      const stampsData = await queryArticleStamps(pool, articleType, id);

      requestConnectionPoolEnd();

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
      tags: [id, tables[articleType]],
      revalidate: 60,
    },
  )(articleType, id);

export default getArticle;
