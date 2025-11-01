import getArticleBySlug from "@/lib/getArticleBySlug";
import { ArticleType } from "@/lib/types";

describe(getArticleBySlug, () => {
  test("retrieving a blog by its slug", async () => {
    const article = await getArticleBySlug(ArticleType.Blog, "slug-test-blog");
  });
});
