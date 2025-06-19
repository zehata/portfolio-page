"use client";

import Markdown from "react-markdown";
import React from "react";
import { Article, StampIcon } from "@/lib/types";
import getFriendlyDatetime from "@/lib/getFriendlyDatetime";
import {
  BugPlay,
  Check,
  Combine,
  Construction,
  DraftingCompass,
  FastForward,
  Lightbulb,
  Pause,
  PawPrint,
  Rocket,
  Share2,
} from "lucide-react";
import SimpleButton from "../common/Button";

const getIcon = (icon?: StampIcon) => {
  switch (icon) {
    case "BugPlay":
      return BugPlay;
    case "Check":
      return Check;
    case "Construction":
      return Construction;
    case "DraftingCompass":
      return DraftingCompass;
    case "FastForward":
      return FastForward;
    case "Lightbulb":
      return Lightbulb;
    case "Pause":
      return Pause;
    case "Rocket":
      return Rocket;
    case "PawPrint":
      return PawPrint;
    case "Combine":
      return Combine;
  }
  return;
};

export const ArticlePage = ({
  articleRequest,
}: {
  articleRequest: Promise<Article>;
}) => {
  const [article, setArticle] = React.useState<Article | null>(null);
  React.useEffect(() => {
    articleRequest.then(setArticle);
  }, [articleRequest]);

  const shareURL = React.useCallback(() => {
    const urlWithoutId = window.location.href.split("/").slice(0, -1).join("/");
    return `${urlWithoutId}/${article?.id}`;
  }, [article]);

  return (
    <div className="relative w-full h-full overflow-hidden slant">
      <div
        id="main-content"
        className="relative w-full h-full p-10 pt-16 article-content overflow-auto"
      >
        <div className="absolute flex gap-4 right-20">
          {article ? (
            Object.entries(article.stamps).map(([id, stamp]) => {
              const arbitraryAngle = (id.charCodeAt(1) % 4) - 2;
              const stampAngle = (arbitraryAngle ? arbitraryAngle : 2) * 2;

              const Icon = getIcon(stamp.icon);

              return (
                <div
                  key={id}
                  className="relative flex origin-[0%_100%] text-xl font-[Impact] "
                  style={{
                    color: stamp.color,
                    borderColor: stamp.color,
                    rotate: `${stampAngle}deg`,
                  }}
                >
                  <div className="flex flex-col w-fit p-1 gap-1 border-inherit border-4 text-[30px] leading-[24px] uppercase">
                    <div>{stamp.label}</div>
                    <div>{stamp.value}</div>
                  </div>
                  {Icon ? (
                    <div className="flex items-center p-1 border-inherit border-4 border-l-0">
                      <Icon strokeWidth="4px" className="text-inherit" />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
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
          <SimpleButton
            onClick={() =>
              navigator.share({
                title: article.title,
                text: `${article.content.substring(0, 140)}...`,
                url: shareURL(),
              })
            }
          >
            <Share2 />
          </SimpleButton>
        ) : (
          <></>
        )}
        <div className="mt-4">
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
      </div>
    </div>
  );
};

export default ArticlePage;
