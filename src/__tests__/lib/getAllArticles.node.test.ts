import { ArticleType } from "@/lib/types";
import { getAllArticles } from "@/lib/getAllArticles";
import {
  QUERY_TEST_BLOG_1_ID,
  QUERY_TEST_BLOG_2_ID,
} from "@/__tests__/testlibs/testUuids";

import * as testModule from "@/queries/queryAllArticles";

jest.mock("@/queries/queryAllArticles");

describe(getAllArticles, () => {
  test("querying all blogs", async () => {
    jest.spyOn(testModule, "queryAllArticles").mockResolvedValueOnce([
      {
        id: QUERY_TEST_BLOG_1_ID,
        title: "test blog 1",
        slug: "test_blog_1",
      },
      {
        id: QUERY_TEST_BLOG_2_ID,
        title: "test blog 2",
        slug: "test_blog_2",
      },
    ]);

    const articles = await getAllArticles(ArticleType.Blog);

    expect(testModule.queryAllArticles).toHaveBeenCalledTimes(1);
    expect(articles).toStrictEqual([
      {
        id: QUERY_TEST_BLOG_1_ID,
        title: "test blog 1",
        slug: "test_blog_1",
        link: "/blogs/test_blog_1",
      },
      {
        id: QUERY_TEST_BLOG_2_ID,
        title: "test blog 2",
        slug: "test_blog_2",
        link: "/blogs/test_blog_2",
      },
    ]);
  });
});
