"use client";

import React from "react";
import { debounce } from "lodash";
import SpeechBubble from "@/components/SpeechBubble";
import classNames from "classnames";
import { Link } from "next-view-transitions";
import { Dialog, dialogs } from "../../lib/dialogs";

export const MePage = ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  React.useEffect(() => {
    params.then(params => {
      if (!params.id) {
        setCurrentQuestion(dialogs["0"])
        return
      }
      setCurrentQuestion(dialogs[params.id])
    })
  }, [params])
  const [windowWidth, setWindowWidth] = React.useState<number | null>(null);
  const [showResponses, setShowResponses] = React.useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = React.useState<Dialog | null>(
    null,
  );
  const [changingQuestion, setChangingQuestion] = React.useState<boolean>(false);

  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  });

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
  }, [handleResize]);

  const proceed = () => {
    setShowResponses(true);
  }

  return (
    <div className="w-full h-full">
      <div
        className={classNames(
          "absolute left-0 bottom-0 w-screen h-20 ease-in-out duration-250",
          {
            ["left-[calc(-5vw-6rem)]"]: showResponses,
          },
        )}
      >
        <img
          src={currentQuestion?.portrait}
          className="absolute bottom-0 left-[calc(12vw-7rem)] w-60 dialog-portrait"
          onClick={() => setShowResponses(!showResponses)}
          style={{
            animation: "500ms slide-in-left"
          }}
        />
        {!changingQuestion && <SpeechBubble
          proceed={proceed}
          dialog={currentQuestion?.text}
          windowWidth={windowWidth}
        >
        </SpeechBubble>}
      </div>
      <div
        className={classNames(
          "absolute flex flex-col items-end -right-26 bottom-20 duration-250 ease-in-out origin-[1000%_100%]",
          {
            ["rotate-0"]: showResponses,
            ["-rotate-20"]: !showResponses,
          },
        )}
      >
        {currentQuestion?.responses.map((response, index, responses) => (
          <Link
            href={`/about/${response.link}`}
            onClick={() => setChangingQuestion(true)}
            key={index}
            className={classNames(
              `relative bg-white -mb-36 h-56 z-1 shadow-center p-4 origin-[150%_100%] ease-in-out left-0 hover:-left-6`,
            )}
            style={{
              width: `calc(${23 - (responses.length - index) * 1}vw + 10rem)`,
              marginRight: `${index * 0.25}rem`,
              rotate: showResponses ? `${-4 + (responses.length - index) * 2}deg` : "-4deg",
              transitionDuration: `${250 + (responses.length - index) * 100}ms`,
              paddingRight: `${(responses.length - index) * 2}rem`,
            }}
          >
            {response.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MePage;
