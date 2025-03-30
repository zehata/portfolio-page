"use client";

import React from "react";
import SidebarItem from "./sidebar-item";
import classNames from "classnames";
import { Link } from 'next-view-transitions'

export const Sidebar = ({ blogId }: { blogId?: string }) => {
  const [shiftSidebar, setShiftSidebar] = React.useState<boolean>(false);
  return (
    <div
      className={classNames("relative top-2 -left-5 w-full h-fit duration-250 sidebar", {
        ["-left-10"]: blogId,
        ["-mt-2"]: (!blogId && shiftSidebar) || (blogId && !shiftSidebar),
        ["-mt-4"]: blogId && shiftSidebar,
      })}
    >
      {Array.from({ length: 5 }).map((_, index) => 
        <Link key={index} href={`/blog/${index}`}>
          <SidebarItem
            index={index}
            selectedId={blogId}
            onPointerEnter={() => {
              if (blogId && String(index) === blogId) return
              setShiftSidebar(true);
            }}
            onPointerLeave={() => {
              setShiftSidebar(false);
            }}
          />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
