"server-only";

import { article } from "@/zod-objects/article";
import { DatabasePool, sql } from "slonik";
import { ArticleType, tables } from "@/lib/types";

export const queryArticle = (
  pool: DatabasePool,
  articleType: ArticleType,
  id: string,
) =>
  pool.one(sql.type(article)`
    SELECT id, title, slug, created, modified, content
    FROM ${sql.identifier([tables[articleType]])}
    WHERE id=${sql.uuid(id)};
  `);

export default queryArticle;
