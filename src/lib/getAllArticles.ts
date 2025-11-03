"use server";

import queryAllArticles from "@/queries/queryAllArticles";
import { ArticleType, tables } from "@/lib/types";
import { unstable_cache } from "next/cache";
import { requestConnectionPool, requestConnectionPoolEnd } from "@/lib/connection";

export const getAllArticles = async (articleType: ArticleType) =>
  unstable_cache(
    async (articleType: ArticleType) => {
      const pool = await requestConnectionPool();

      const data = await queryAllArticles(pool, articleType);

      requestConnectionPoolEnd();

      return data.map((data) => {
        return {
          id: data.id,
          title: data.title,
        };
      });
    },
    [],
    {
      tags: [tables[articleType]],
      revalidate: 60,
    },
  )(articleType);

export default getAllArticles;
