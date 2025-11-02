import Sidebar from "@/components/sidebar/sidebar";
import { ArticleType } from "@/lib/types";

describe(Sidebar, () => {
  test("Loading animation snapshot", () => {
    expect(
      Sidebar({
        articleType: ArticleType.Blog,
        items: [],
        serverStarting: false,
      }),
    ).toMatchSnapshot();
  });
});
