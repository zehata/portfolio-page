import Papers from "@/components/article/Papers";
import getArticle from "@/lib/getArticle";
import { ArticleType } from "@/lib/ArticleTypes";
import getAllArticles from "@/lib/getAllArticles";
import ArticlePage from "@/components/article/ArticlePage";

export const generateStaticParams = async () => {
  return (await getAllArticles(ArticleType.Project)).map((project) => {
    return { id: project.id };
  });
};

const ProjectPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const articleRequest = getArticle(ArticleType.Project, (await params).id);

  return (
    <div className="absolute lg:relative lg:pl-8 flex-shrink-0 w-full h-full lg:w-2/3 blogid z-3">
      <div className="absolute w-full h-full -left-1 lg:left-8 top-0 paper">
        <Papers />
      </div>
      <ArticlePage articleRequest={articleRequest} />
    </div>
  );
};

export default ProjectPage;
