import Connection from "@/lib/Connection";
import { ArticleType } from "@/lib/types";
import queryAllArticles from "@/queries/queryAllArticles";

describe(queryAllArticles, () => {
  const poolPromise = Connection.requestConnectionPool();

  test("querying all blogs", async () => {
    const pool = await poolPromise;
    const data = queryAllArticles(pool, ArticleType.Blog);
  });
});
