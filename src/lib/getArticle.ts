"use server";

import queryArticle from "@/queries/queryArticle";
import Connection from "./Connection";
import { ArticleType, tables } from "@/lib/ArticleTypes";
import { unstable_cache } from "next/cache";

export const getArticle = async (articleType: ArticleType, id: string) =>
  unstable_cache(
    async (articleType: ArticleType, id: string) => {
      const pool = await Connection.requestConnectionPool();

      const data = await queryArticle(pool, articleType, id);
    
      await Connection.requestConnectionPoolEnd();
    
      return {
        id: data.id,
        title: data.title,
        created: data.created,
        modified: data.modified,
        content: data.content,
      };
    },
    [],
    {
      tags: [id, tables[articleType]],
      revalidate: 60,
    },
  )(articleType, id);

export default getArticle;
