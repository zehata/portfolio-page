"server-only";

import { article } from "@/zod-objects/article";
import { DatabasePool, sql } from "slonik";
import { ArticleType, tables } from "@/lib/types";

export const queryArticleBySlug = (
  pool: DatabasePool,
  articleType: ArticleType,
  slug: string,
) =>
  pool.one(sql.type(article)`
    SELECT id, title, created, modified, content
    FROM ${sql.identifier([tables[articleType]])}
    WHERE slug=${slug};
  `);

export default queryArticleBySlug;
