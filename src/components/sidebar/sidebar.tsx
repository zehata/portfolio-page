"use client";

import React, { useTransition } from "react";
import SidebarItem from "./SidebarItem";
import classNames from "classnames";
import { Link, useTransitionRouter } from "next-view-transitions";

export const Sidebar = ({ blogId }: { blogId?: string }) => {
  const [shiftSidebar, setShiftSidebar] = React.useState<boolean>(false);
  React.useEffect(() => setClickedId(blogId ?? null), [blogId])
  const [clickedId, setClickedId] = React.useState<string | null>(blogId ?? null);
  const startTransition = React.useTransition()[1];
  const router = useTransitionRouter();
  
  return (
    <div
      className={classNames(
        "relative top-2 -left-5 w-full h-fit duration-250 sidebar",
        {
          ["-left-10"]: blogId,
          ["-mt-2"]: (!blogId && shiftSidebar) || (blogId && !shiftSidebar),
          ["-mt-4"]: blogId && shiftSidebar,
        },
      )}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarItem
          key={index}
          index={String(index)}
          clickedId={clickedId}
          selectedId={blogId}
          onClick={() => {
            startTransition(() => {
              setClickedId(String(index))
              if(!blogId) return
              setShiftSidebar(false)
            })
            setTimeout(() => {
              router.push(`/blog/${index}`)
            }, 250)
          }}
          onPointerEnter={() => {
            if (blogId && String(index) === blogId) return;
            setShiftSidebar(true);
          }}
          onPointerLeave={() => {
            setShiftSidebar(false);
          }}
        />
      ))}
    </div>
  );
};

export default Sidebar;
