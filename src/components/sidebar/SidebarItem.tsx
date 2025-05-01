"use client";

import classNames from "classnames";
import React, { HTMLAttributes } from "react";

export const SidebarItem = ({
  index,
  label,
  clickedId,
  selectedId,
  ...props
}: {
  index: string;
  label?: string;
  clickedId: string | null;
  selectedId?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={classNames(
        "relative w-[calc(100%+1.25rem)] pl-20 p-4 hover:py-6 bg-gray-100 hover:bg-white duration-250 ease-in-out sidebar-item shadow-center overflow-hidden",
        {
          ["-left-5"]: index != clickedId,
          ["left-0 py-6 clicked bg-white z-2"]: index === clickedId,
        },
      )}
      style={{
        animation:
          index === clickedId && index != selectedId
            ? "250ms ease-in-out sidebar-item-bounce-out"
            : "none",
      }}
      {...props}
    >
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
      {label}
    </div>
  );
};

export default SidebarItem;
