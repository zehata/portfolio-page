import {
  requestConnectionPool,
  requestConnectionPoolEnd,
} from "@/lib/connection";
import { ArticleType } from "@/lib/types";
import queryArticleBySlug from "@/queries/queryArticleBySlug";

describe(queryArticleBySlug, () => {
  test("blogs query resulls should match snapshot", async () => {
    const pool = await requestConnectionPool();
    const result = await queryArticleBySlug(
      pool,
      ArticleType.Blog,
      "slug-test-blog",
    );
    expect(result).toMatchSnapshot();
    await requestConnectionPoolEnd();
  });
});
