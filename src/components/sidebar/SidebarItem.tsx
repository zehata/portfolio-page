"use client";

import classNames from "classnames";
import React, { HTMLAttributes } from "react";

export const SidebarItem = ({
  index,
  clickedId,
  ...props
}: {
  index: string;
  clickedId: string | null;
} & HTMLAttributes<HTMLDivElement>) => {
  const selected = React.useRef<boolean>(false);
  return (
    <div
      className={classNames(
        "relative pl-18 p-4 hover:py-6 hover:left-5 hover:text-black duration-250 ease-in-out sidebar-item",
        {
          ["left-0 text-white"]: index != clickedId,
          ["left-5 py-6 clicked"]: index === clickedId,
        },
      )}
      {...props}
    >
      {index}
    </div>
  );
};

export default SidebarItem;
