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
        "absolute left-0 w-[167vw] h-screen bg-center bg-cover bg-[url('/library-background.png')] ease-in-out -z-2 duration-1000 no-view-transition",
        {
          ["left-[-66vw]"]: shiftRight,
        },
      )}
    >
      {/* <div
        className={classNames("absolute top-[calc(50vh-20rem)] right-[7vw] w-[min(60vw,40rem)] h-[40rem] duration-1000", {
          ["transform-[matrix3d(1,0,0,-0.0005,0,1,0,0,0,0,1,0,0,0,0,1)]"]: !shiftRight
        })}
      >
        <div className="bg-white h-[min(75%,25rem)]">

        </div>
      </div> */}
    </div>
  );
};

export default BaseBackground;
