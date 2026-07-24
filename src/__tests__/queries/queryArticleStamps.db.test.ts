import { ArticleType } from "@/lib/types";
import queryArticleStamps from "@/queries/queryArticleStamps";
import { QUERY_TEST_BLOG_ID } from "../testlibs/testUuids";
import { createConnectionPool, endConnectionPool } from "@/lib/connection";

describe(queryArticleStamps, () => {
  test("blogs query resulls should match snapshot", async () => {
    const pool = await createConnectionPool();
    const result = await queryArticleStamps(
      pool,
      ArticleType.Blog,
      QUERY_TEST_BLOG_ID,
    );
    expect(result).toMatchSnapshot();
    await endConnectionPool(pool);
  });
});
