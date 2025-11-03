import { ArticleType } from "@/lib/types";
import queryAllArticles from "@/queries/queryAllArticles";
import {
  requestConnectionPool,
  requestConnectionPoolEnd,
} from "@/lib/connection";

describe(queryAllArticles, () => {
  const poolPromise = requestConnectionPool();

  test("querying all blogs", async () => {
    const pool = await poolPromise;
    const article = queryAllArticles(pool, ArticleType.Blog);
  });

  requestConnectionPoolEnd();
});
