import ArticlePage from "@/components/article/ArticlePage";
import { Article } from "@/lib/types";
import { render } from "@testing-library/react";

describe(ArticlePage, () => {
  test("article page should match snapshot", () => {
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
    const component = render(
      <ArticlePage articleRequest={mockArticlePromise}></ArticlePage>,
    );
    expect(component).toMatchSnapshot();
  });
});
