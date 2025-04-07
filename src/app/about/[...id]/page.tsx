"use client";

import React from "react";
import SpeechBubble from "@/components/SpeechBubble";
import classNames from "classnames";
import { Link } from "next-view-transitions";
import { Dialog, dialogs } from "../../../lib/dialogs";
import GlobalContext from "@/components/context/GlobalContext";

export const MePage = ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  React.useEffect(() => {
    params.then((params) => {
      if (!params.id) {
        setCurrentQuestion(dialogs["0"]);
        return;
      }
      setCurrentQuestion(dialogs[params.id]);
    });
  }, [params]);

  const globalContext = React.useContext(GlobalContext);
  const windowWidth = globalContext?.state.viewportDimensions?.width ?? null;

  const [showResponses, setShowResponses] = React.useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = React.useState<Dialog | null>(
    null,
  );
  const [changingQuestion, setChangingQuestion] =
    React.useState<boolean>(false);

  const proceed = () => {
    setShowResponses(true);
  };

  return (
    <div className="absolute w-full h-full">
      <div
        className={classNames(
          "absolute left-0 bottom-0 w-screen h-20 ease-in-out duration-500",
          {
            ["left-[calc(-5vw-6rem)]"]: showResponses,
          },
        )}
      >
        <img
          alt=""
          src={currentQuestion?.portrait}
          className="absolute bottom-0 left-[calc(12vw-7rem)] w-60 dialog-portrait"
          style={{
            animation: "500ms slide-in-left",
          }}
        />
        {!changingQuestion && (
          <SpeechBubble
            proceed={proceed}
            dialog={currentQuestion?.text}
            windowWidth={windowWidth}
          ></SpeechBubble>
        )}
      </div>
      <div
        className={classNames(
          "absolute flex flex-col items-end -right-26 bottom-20 duration-500 ease-in-out origin-[1000%_100%] z-1 responses",
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
              `relative bg-white -mb-36 h-56 z-1 shadow-center p-4 origin-[150%_100%] ease-in-out duration-500 left-0 hover:-left-6`,
            )}
            style={
              {
                width: `calc(${23 - (responses.length - index) * 1}vw + 10rem)`,
                marginRight: `${index * 0.25}rem`,
                "--rotate-angle": `${-4 + (responses.length - index) * 2}deg`,
                animation: showResponses
                  ? `${500 + (responses.length - index) * 50}ms ease-out rotate-responses`
                  : "",
                rotate: showResponses
                  ? `${-4 + (responses.length - index) * 2}deg`
                  : "-4deg",
                paddingRight: `${(responses.length - index) * 2}rem`,
              } as React.CSSProperties
            }
          >
            {response.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MePage;
