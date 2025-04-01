"use client";

import React from "react";
import { debounce } from "lodash";
import SpeechBubble from "@/components/SpeechBubble";
import classNames from "classnames";

export const MePage = () => {
  const [windowWidth, setWindowWidth] = React.useState<number>();
  const [showResponses, setShowResponses] = React.useState<boolean>(false);

  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  });

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
  }, [handleResize]);

  return (
    <div className="w-full h-full">
      <div className={classNames("absolute left-0 bottom-0 w-screen h-20 duration-250", {
        ["left-[calc(-10vw-5rem)]"]: showResponses,
      })}>
        <img src="/portrait.png" className="absolute bottom-0 left-[calc(12vw-7rem)] w-60">

        </img>
        {windowWidth && <SpeechBubble dialog="With the bounce it's a little better?`" windowWidth={windowWidth}/>}
      </div>
      <div className={classNames("absolute flex flex-col items-end -right-3 bottom-0 duration-250 ease-in-out origin-[1000%_0]", {
        ["rotate-0"]: showResponses,
        ["-rotate-20"]: !showResponses,
      })}>
        <div className="relative bg-white -mb-10 w-[calc(22vw+4rem)] h-36 z-1 rotate-2 shadow-center p-4">Response 1</div>
        <div className="relative bg-white -mb-10 w-[calc(24vw+4rem)] h-36 z-1 shadow-center p-4">Response 2</div>
        <div className="relative bg-white -mb-10 w-[calc(26vw+4rem)] h-36 z-1 -rotate-2 shadow-center p-4">Response 3</div>
      </div>
    </div>
  );
};

export default MePage;
