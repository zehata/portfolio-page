"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import React from "react";

const BaseBackground = () => {
  const pathname = usePathname();
  const shiftRight = React.useMemo(
    () => pathname.split("/")[1] === "contact",
    [pathname],
  );

  return (
    <div
      className={classNames(
        "absolute flex justify-end ease-in-out -z-2 duration-1000 no-view-transition",
        {
          ["right-[min(-200vw/3,-3200dvh/27)]"]: !shiftRight,
          ["right-0"]: shiftRight,
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
