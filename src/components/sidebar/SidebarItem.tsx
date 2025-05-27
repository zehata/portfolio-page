"use client";

import classNames from "classnames";
import React, { HTMLAttributes } from "react";

export const SidebarItem = ({
  index,
  label,
  clickedId,
  selectedId,
}: {
  index: string;
  label?: string;
  clickedId: string | null;
  selectedId?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      <div
        className={classNames(
          "absolute right-[1rem] bg-blue-500 w-[2rem] h-[100%] duration-250 bookmark",
          {
            ["bottom-[50%]"]: index === clickedId,
            ["bottom-[110%]"]: index != clickedId,
          },
        )}
        style={{
          animation:
            index === clickedId && index != selectedId
              ? "250ms ease sidebar-bookmark-bounce-out"
              : "none",
        }}
      />
      <span className="truncate text-ellipsis">{label}</span>
    </>
  );
};

export default SidebarItem;
