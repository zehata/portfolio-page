"use server";

import queryAllArticles from "@/queries/queryAllArticles";
import { ArticleType, tables } from "@/lib/ArticleTypes";
import Connection from "./Connection";
import { unstable_cache } from "next/cache";

export const getAllArticles = async (articleType: ArticleType) =>
  unstable_cache(
    async (articleType: ArticleType) => {
      const pool = await Connection.requestConnectionPool();

      const data = await queryAllArticles(pool, articleType);

      await Connection.requestConnectionPoolEnd();

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
