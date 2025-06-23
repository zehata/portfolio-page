"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import React from "react";

const BaseBackground = () => {
  const pathname = usePathname();

  const [shiftRight, setShiftRight] = React.useState<{
    prev: boolean | null;
    current: boolean | null;
  }>({
    prev: null,
    current: null,
  });

  React.useEffect(() => {
    setShiftRight((shiftRight) => {
      return {
        prev: shiftRight.current,
        current: pathname.split("/")[1] === "contact",
      };
    });
  }, [pathname]);

  return (
    <div
      className={classNames(
        "absolute flex justify-end -z-2 no-view-transition",
        {
          ["right-[min(-200vw/3,-3200dvh/27)]"]: !shiftRight.current,
          ["right-0"]: shiftRight.current,
          ["animate-[1s_ease-in-out_base-background-shift-left]"]:
            !shiftRight.current && shiftRight.prev,
          ["animate-[1s_ease-in-out_base-background-shift-right]"]:
            shiftRight.current && shiftRight.prev === false,
        },
      )}
    >
      <div className="absolute w-[calc(500vw/3)] h-[100dvh] flex justify-end items-center">
        <div className="absolute w-[max(500vw/3,8000dvh/27)] h-[max(56.25vw,100dvh)] bg-cover bg-[url('https://images.zehata.dev/public/library-background.webp')]">
          <div className="absolute w-[max(500vw/3,8000dvh/27)] h-[max(56.25vw,100dvh)] top-0 left-0 lamp-light bg-black opacity-20 z-1"></div>
        </div>
      </div>
    </div>
  );
};

export default BaseBackground;
