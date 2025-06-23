"use client";

import React from "react";
import SpeechBubble from "@/components/about/SpeechBubble";
import classNames from "classnames";
import { Link } from "next-view-transitions";
import { Dialog, dialogs } from "@/lib/dialogs";
import GlobalContext from "@/components/context/GlobalContext";
import DialogPortrait from "./Portrait";

export const DialogComponent = ({ id }: { id: string }) => {
  React.useEffect(() => {
    if (!id) {
      setCurrentQuestion(dialogs["0"]);
      return;
    }
    setCurrentQuestion(dialogs[id]);
  }, [id]);

  const globalContext = React.useContext(GlobalContext);
  const windowWidth = globalContext?.viewportDimensions?.width ?? null;

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
    <div className="absolute left-0 bottom-0 w-full h-full">
      <div
        className={classNames(
          "absolute left-0 bottom-0 w-screen h-20 ease-in-out duration-250",
          {
            ["left-[calc(-5vw+2rem)]"]: showResponses,
          },
        )}
      >
        <DialogPortrait
          className="absolute bottom-0 left-[calc(16vw-22rem)] w-120 h-full dialog-portrait"
          mood={"neutral"}
          speaking={!showResponses}
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
          "absolute flex flex-col items-end -right-26 bottom-20 duration-250 ease-in-out origin-[1000%_100%] z-1 responses",
          {
            ["rotate-0"]: showResponses,
            ["-rotate-20"]: !showResponses,
          },
        )}
      >
        {currentQuestion?.responses.map((response, index, responses) => (
          <Link
            href={response.link}
            onClick={() => setChangingQuestion(true)}
            key={index}
            className={classNames(
              `relative bg-background -mb-36 h-56 z-1 shadow-center p-4 origin-[150%_100%] ease-in-out duration-250 left-0 hover:-left-6 focus-within:-left-6 text-sm md:text-base`,
            )}
            style={
              {
                width: `calc(${16 - (responses.length - index) * 1}vw + 10rem)`,
                marginRight: `calc(${index * 0.25}rem + 2rem)`,
                "--rotate-angle": `${-4 + (responses.length - index) * 2}deg`,
                animation: showResponses
                  ? `250ms ease-out rotate-responses`
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

export default DialogComponent;
