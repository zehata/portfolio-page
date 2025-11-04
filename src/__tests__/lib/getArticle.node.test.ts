import { ArticleType } from "@/lib/types";
import { QUERY_TEST_BLOG_ID } from "../testUuids";
import getArticle from "@/lib/getArticle";

import * as queryArticle from "@/queries/queryArticle";
import * as queryArticleStamps from "@/queries/queryArticleStamps";

jest.mock("@/queries/queryArticle");
jest.mock("@/queries/queryArticleStamps");

describe(getArticle, () => {
  test("querying blog", async () => {
    jest.spyOn(queryArticle, "queryArticle").mockResolvedValueOnce({
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
    const article = await getArticle(ArticleType.Blog, QUERY_TEST_BLOG_ID);

    expect(queryArticle.queryArticle).toHaveBeenCalledTimes(1);
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
