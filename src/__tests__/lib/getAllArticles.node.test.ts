import { ArticleType } from "@/lib/types";
import getAllArticles from "@/lib/getAllArticles";
import {
  QUERY_TEST_BLOG_ID,
  QUERY_TEST_PROJECT_ID,
} from "@/__tests__/testlibs/testUuids";

import * as testModule from "@/queries/queryAllArticles";

jest.mock("@/queries/queryAllArticles");

describe(getAllArticles, () => {
  test("querying all blogs", async () => {
    jest.spyOn(testModule, "queryAllArticles").mockResolvedValueOnce([
      {
        id: QUERY_TEST_BLOG_ID,
        title: "test blog",
      },
      {
        id: QUERY_TEST_PROJECT_ID,
        title: "test project",
      },
    ]);

    const articles = await getAllArticles(ArticleType.Blog);

    expect(testModule.queryAllArticles).toHaveBeenCalledTimes(1);
    expect(articles).toStrictEqual([
      {
        id: QUERY_TEST_BLOG_ID,
        title: "test blog",
      },
      {
        id: QUERY_TEST_PROJECT_ID,
        title: "test project",
      },
    ]);
  });
});
