"use client";

import React from "react";
import SidebarItem from "./SidebarItem";
import classNames from "classnames";
import { useTransitionRouter } from "next-view-transitions";
import { ArticleType, tables } from "@/lib/ArticleTypes";
import LoadingAnimation from "./LoadingAnimation";
import Link from "next/link";

export const Sidebar = ({
  articleType,
  id,
  items,
  serverStarting,
}: {
  articleType: ArticleType;
  id?: string;
  items: { id: string; title: string }[] | null;
  serverStarting: boolean;
}) => {
  const [shiftSidebar, setShiftSidebar] = React.useState<boolean>(false);
  React.useEffect(() => setClickedId(id ?? null), [id]);
  const [clickedId, setClickedId] = React.useState<string | null>(id ?? null);
  const router = useTransitionRouter();

  return (
    <div
      className={classNames(
        "relative top-2 w-full h-full duration-250 sidebar",
        {
          ["-left-5"]: !id,
          ["-left-10"]: id,
          ["-mt-2"]: (!id && shiftSidebar) || (id && !shiftSidebar),
          ["-mt-4"]: id && shiftSidebar,
        },
      )}
    >
      <div className={classNames("absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-4 text-white duration-250", {
        ["opacity-0"]: items,
        ["animate-[250ms_ease_fade-in]"]: !items,
      })}>
        {
          serverStarting ? 
          <>
            <LoadingAnimation/>
            {`Starting Database`}
          </> : 
          <>
            <LoadingAnimation/>
            {`Loading`}
          </>
        }
      </div>
      <div className={classNames("absolute w-full h-full ease-in-out duration-250", {
        ["-left-full"]: !items,
        ["left-0"]: items,
      })}>
        {items?.map((item, index) => (
          <Link
            key={index}
            href={`/${tables[articleType]}/${item.id}`}
            onClick={event => {
              event.preventDefault();
              React.startTransition(() => {
                setClickedId(item.id);
                if (!id) return;
                setShiftSidebar(false);
              });
              setTimeout(() => {
                router.push(`/${tables[articleType]}/${item.id}`);
              }, 250);
            }}
          >
            <SidebarItem
              index={item.id}
              label={item.title}
              clickedId={clickedId}
              selectedId={id}
              onPointerEnter={() => {
                if (id && item.id === id) return;
                setShiftSidebar(true);
              }}
              onPointerLeave={() => {
                setShiftSidebar(false);
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
