import { QUERY_TEST_BLOG_ID } from "@/__tests__/testUuids";
import BlogPage from "@/app/blogs/[id]/page";
import { render } from "@testing-library/react";

import * as getArticle from "@/lib/getArticle";
import { act } from "react";

jest.mock("@/lib/getArticle", () => ({
  getArticle: jest.fn(),
}));
jest.mock("@/lib/getAllArticles", () => ({
  getAllArticles: jest.fn(),
}));
jest.mock("@/lib/getArticleBySlug", () => ({
  getArticleBySlug: jest.fn(),
}));

describe(BlogPage, () => {
  it("should match snapshot", async () => {
    jest.spyOn(getArticle, "getArticle").mockResolvedValueOnce({
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
    const { container } = await act(async () =>
      render(
        await BlogPage({
          params: new Promise((resolve) => resolve({ id: QUERY_TEST_BLOG_ID })),
        }),
      ),
    );
    expect(container).toMatchSnapshot();
  });
});
