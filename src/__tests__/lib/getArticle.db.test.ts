import { ArticleType } from "@/lib/types";
import queryArticle from "@/queries/queryArticle";
import { requestConnectionPool, requestConnectionPoolEnd } from "@/lib/connection";

const QUERY_TEST_BLOG_ID = "7f4b2d5f-4608-40ac-b1b4-24b2828bc61e";

describe(queryArticle, () => {
  const poolPromise = requestConnectionPool();

  test("querying blog", async () => {
    const pool = await poolPromise;
    const article = queryArticle(pool, ArticleType.Blog, QUERY_TEST_BLOG_ID);
  });

  requestConnectionPoolEnd();
});
