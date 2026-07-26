import Papers from "@/components/article/Papers";
import { getArticle } from "@/lib/getArticle";
import { ArticleType } from "@/lib/types";
import { getAllArticles } from "@/lib/getAllArticles";
import ArticlePage from "@/components/article/ArticlePage";
import { isValidUuid } from "@/lib/isValidUuid";
import { getArticleBySlug } from "@/lib/getArticleBySlug";
import { Metadata } from "next";
import { cacheLife } from "next/cache";

export const generateStaticParams = async () => {
  return (await getAllArticles(ArticleType.Blog)).map((blog) => {
    return { id: blog.id };
  });
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  "use cache";
  cacheLife("days");
  const articleRequest = isValidUuid((await params).id)
    ? await getArticle(ArticleType.Blog, (await params).id)
    : await getArticleBySlug(ArticleType.Blog, (await params).id);

  return {
    title: articleRequest.title,
    description: articleRequest.content,
    openGraph: {
      title: articleRequest.title,
      description: articleRequest.content,
    },
  };
};

const BlogPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const articleRequest = isValidUuid((await params).id)
    ? getArticle(ArticleType.Blog, (await params).id)
    : getArticleBySlug(ArticleType.Blog, (await params).id);

  return (
    <div className="absolute xl:relative xl:pl-8 flex-shrink-0 w-full h-full xl:w-2/3 blogid z-3">
      <div className="absolute w-full h-full -left-1 xl:left-8 top-2 paper">
        <Papers />
      </div>
      <ArticlePage articleRequest={articleRequest} />
    </div>
  );
};

export default BlogPage;
