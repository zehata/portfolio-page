import {
  requestConnectionPool,
  requestConnectionPoolEnd,
} from "@/lib/connection";
import { ArticleType } from "@/lib/types";
import queryAllArticles from "@/queries/queryAllArticles";

describe(queryAllArticles, () => {
  test("blogs query resulls should match snapshot", async () => {
    const pool = await requestConnectionPool();
    const result = await queryAllArticles(pool, ArticleType.Blog);
    expect(result).toMatchSnapshot();
    await requestConnectionPoolEnd();
  });
});
