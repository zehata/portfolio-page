"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import React from "react";

export const MovingBackgrounds = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const pathname = usePathname();
  const showMovingBackground = React.useMemo(
    () => pathname.split("/")[1] != "",
    [pathname],
  );

  console.log(showMovingBackground)

  return (
    <div
      className={classNames("absolute w-full h-full -z-1 duration-1000", {
        ["delay-1000 opacity-100"]: showMovingBackground,
        ["delay-0 opacity-0"]: !showMovingBackground,
      })}
    >
      {children}
    </div>
  );
};

export default MovingBackgrounds;
