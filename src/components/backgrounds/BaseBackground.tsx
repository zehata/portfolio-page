"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import React from "react";

export const BaseBackground = () => {
  const pathname = usePathname();
  const shiftRight = React.useMemo(
    () => pathname.split("/")[1] === "contact",
    [pathname],
  );

  return (
    <div
      className={classNames(
        "absolute left-0 w-[150vw] h-screen bg-center bg-cover bg-[url('/library-background.png')] -z-2 ease-in-out duration-1000 no-view-transition",
        {
          ["left-[-50vw]"]: shiftRight,
        },
      )}
    ></div>
  );
};

export default BaseBackground;
