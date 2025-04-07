"use server";

import queryBlog from "@/queries/queryBlog";
import { createDatabaseConnectionPool } from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";

export const getBlog = async (blogId: string) => {
  const pool = await createDatabaseConnectionPool();

  const data = await pool.connect(async (connection) => {
    return await queryBlog(connection, blogId);
  });

  await pool.end();

  return {
    blogId: data.blog_id,
    blogTitle: data.blog_title,
    blogCreated: data.blog_created,
    blogModified: data.blog_modified,
    blogContent: data.blog_content,
  }
};

export default getBlog;
