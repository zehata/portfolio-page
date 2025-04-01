"use client";

import classNames from "classnames";
import React, { HTMLAttributes } from "react";

export const SidebarItem = ({
  className,
  index,
  selectedId,
  ...props
}: {
  className?: string;
  index: number;
  selectedId?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const [clicked, setClick] = React.useState<boolean>(false);

  return (
    <div
      className={classNames(
        "relative pl-18 p-4 hover:bg-white hover:py-6 hover:text-black duration-250 ease-in-out",
        {
          ["border-white py-6"]: clicked,
          ["hover:left-5"]: selectedId,
          ["bg-white left-5 py-6"]: String(index) === selectedId,
          ["text-white left-0"]: String(index) != selectedId,
          ["sidebar-item"]: String(index) === selectedId,
        },
      )}
      onClick={() => setClick(true)}
      {...props}
    >
      {index}
    </div>
  );
};

export default SidebarItem;
