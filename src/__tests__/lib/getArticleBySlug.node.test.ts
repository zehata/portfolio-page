import getArticleBySlug from "@/lib/getArticleBySlug";
import { ArticleType } from "@/lib/types";
import { QUERY_TEST_BLOG_ID } from "../testlibs/testUuids";

import * as queryArticleBySlug from "@/queries/queryArticleBySlug";
import * as queryArticleStamps from "@/queries/queryArticleStamps";

jest.mock("@/queries/queryArticleBySlug");
jest.mock("@/queries/queryArticleStamps");

describe(getArticleBySlug, () => {
  test("retrieving a blog by its slug", async () => {
    jest.spyOn(queryArticleBySlug, "queryArticleBySlug").mockResolvedValueOnce({
      id: QUERY_TEST_BLOG_ID,
      title: "test blog",
      created: "0",
      modified: "0",
      content: "blog content",
    });

    jest.spyOn(queryArticleStamps, "queryArticleStamps").mockResolvedValueOnce([
      {
        color: "#000",
        icon: "",
        id: "2a7313f5-5b8d-4b1b-9155-0c93a5ea5e80",
        label: "Status",
        value: "Ongoing",
      },
    ]);

    const article = await getArticleBySlug(ArticleType.Blog, "slug-test-blog");

    expect(queryArticleBySlug.queryArticleBySlug).toHaveBeenCalledTimes(1);
    expect(queryArticleStamps.queryArticleStamps).toHaveBeenCalledTimes(1);
    expect(article).toStrictEqual({
      id: QUERY_TEST_BLOG_ID,
      title: "test blog",
      created: "0",
      modified: "0",
      content: "blog content",
      stamps: {
        "2a7313f5-5b8d-4b1b-9155-0c93a5ea5e80": {
          color: "#000",
          icon: "",
          id: "2a7313f5-5b8d-4b1b-9155-0c93a5ea5e80",
          label: "Status",
          value: "Ongoing",
        },
      },
    });
  });
});
