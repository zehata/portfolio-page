import ArticlePage from "@/components/article/ArticlePage";
import { Article } from "@/lib/types";
import { render } from "@testing-library/react";
import { act } from "react";

describe(ArticlePage, () => {
  test("article page should match snapshot", async () => {
    const mockArticlePromise: Promise<Article> = new Promise((): Article => {
      return {
        id: "0",
        title: "",
        created: "0",
        modified: "0",
        content: "article content",
        stamps: {},
      };
    });
    const { container } = await act(() =>
      render(<ArticlePage articleRequest={mockArticlePromise}></ArticlePage>),
    );
    expect(container).toMatchSnapshot();
  });
});
