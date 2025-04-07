"server-only";

import { blogId } from "@/zod-objects/blogId";
import { unstable_cache } from "next/cache";
import { CommonQueryMethods, sql } from "slonik";

export const queryAllBlogs = (connection: CommonQueryMethods) =>
  unstable_cache(
    () => {
      return connection.many(sql.type(blogId)`
        SELECT blog_id, blog_title
        FROM blogs
      `);
    },
    [],
    { tags: ["allBlogs"] },
  )();

export default queryAllBlogs;