import Papers from "@/components/article/Papers";
import getArticle from "@/lib/getArticle";
import { ArticleType } from "@/lib/types";
import getAllArticles from "@/lib/getAllArticles";
import React from "react";
import ArticlePage from "@/components/article/ArticlePage";
import { isValidUuid } from "@/lib/isValidUuid";
import getArticleBySlug from "@/lib/getArticleBySlug";

export const generateStaticParams = async () => {
  return (await getAllArticles(ArticleType.Blog)).map((blog) => {
    return { id: blog.id };
  });
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
    <div className="absolute lg:relative lg:pl-8 flex-shrink-0 w-full h-full lg:w-2/3 blogid z-3">
      <div className="absolute w-full h-full -left-1 lg:left-8 top-2 paper">
        <Papers />
      </div>
      <ArticlePage articleRequest={articleRequest} />
    </div>
  );
};

export default BlogPage;
