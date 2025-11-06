import {
  requestConnectionPool,
  requestConnectionPoolEnd,
} from "@/lib/connection";
import { ArticleType } from "@/lib/types";
import queryArticle from "@/queries/queryArticle";
import { QUERY_TEST_BLOG_ID } from "../testlibs/testUuids";

describe(queryArticle, () => {
  test("blogs query resulls should match snapshot", async () => {
    const pool = await requestConnectionPool();
    const result = await queryArticle(
      pool,
      ArticleType.Blog,
      QUERY_TEST_BLOG_ID,
    );
    expect(result).toMatchSnapshot();
    await requestConnectionPoolEnd();
  });
});
