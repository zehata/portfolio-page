"use client";

import React from "react";
import SidebarItem from "./SidebarItem";
import classNames from "classnames";
import { useTransitionRouter } from "next-view-transitions";
import getAllBlogs from "@/lib/getAllBlogs";

export const Sidebar = ({ blogId }: { blogId?: string }) => {
  const [shiftSidebar, setShiftSidebar] = React.useState<boolean>(false);
  React.useEffect(() => setClickedId(blogId ?? null), [blogId]);
  const [clickedId, setClickedId] = React.useState<string | null>(
    blogId ?? null,
  );
  const router = useTransitionRouter();
  const [blogItems, setBlogItems] = React.useState<
    {
      blogId: string;
      blogTitle: string;
    }[]
  >();
  React.useEffect(() => {
    getAllBlogs().then(setBlogItems);
  }, []);

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
      {blogItems?.map((blogItem, index) => (
        <SidebarItem
          key={index}
          index={blogItem.blogId}
          label={blogItem.blogTitle}
          clickedId={clickedId}
          selectedId={blogId}
          onClick={() => {
            React.startTransition(() => {
              setClickedId(blogItem.blogId);
              if (!blogId) return;
              setShiftSidebar(false);
            });
            setTimeout(() => {
              router.push(`/blog/${blogItem.blogId}`);
            }, 250);
          }}
          onPointerEnter={() => {
            if (blogId && blogItem.blogId === blogId) return;
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
