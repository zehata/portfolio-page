"use client";

import Markdown from "react-markdown";
import React from "react";
import { Article } from "@/lib/types";
import getFriendlyDatetime from "@/lib/getFriendlyDatetime";

export const ArticlePage = ({
  articleRequest,
}: {
  articleRequest: Promise<Article>;
}) => {
  const [article, setArticle] = React.useState<Article | null>(null);
  React.useEffect(() => {
    articleRequest.then(setArticle);
  }, [articleRequest]);

  return (
    <div className="relative w-full h-full mt-10 p-10 pt-5 article-content overflow-auto">
      {article ? (
        <h1 className="mb-2 text-xl">{article.title}</h1>
      ) : (
        <>
          <div className="mb-2 w-3/4 h-8 rounded-full skeleton" />
        </>
      )}
      {article ? (
        <div className="mb-4">
          {`${new Date(article?.modified).toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })} ${getFriendlyDatetime(Number(article.modified))}`}
        </div>
      ) : (
        <div className="mb-4 w-1/4 h-4 rounded-full skeleton" />
      )}
      {article ? (
        <Markdown>{article.content}</Markdown>
      ) : (
        <>
          <div className="mb-4 w-3/4 h-60 rounded-lg skeleton" />
          <div className="space-y-4 *:w-3/4 *:h-6 *:rounded-full *:skeleton">
            <div />
            <div />
            <div />
          </div>
        </>
      )}
    </div>
  );
};

export default ArticlePage;
