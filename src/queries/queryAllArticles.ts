"server-only";

import { item } from "@/zod-objects/articleId";
import { DatabasePool, sql } from "slonik";
import { ArticleType, tables } from "@/lib/ArticleTypes";

export const queryAllArticles = (
  pool: DatabasePool,
  articleType: ArticleType,
) =>
  pool.any(sql.type(item)`
    SELECT id, title
    FROM ${sql.identifier([tables[articleType]])}
    ORDER BY created DESC;
  `);

export default queryAllArticles;
