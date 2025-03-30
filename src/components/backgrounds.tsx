"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import React from "react";

export const Backgrounds = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const pathname = usePathname();
  const onHomepage = React.useMemo(() => pathname.split("/")[1] === "", [pathname]);

  return <div className={classNames("absolute w-full h-full -z-1 duration-500", {
    ["delay-500 opacity-100"]: !onHomepage,
    ["delay-0 opacity-0"]: onHomepage
  })}>
    {children}
  </div>
}

export default Backgrounds;