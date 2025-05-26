"use client";

import React, { CSSProperties } from "react";
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
  React.useEffect(() => setClickedId(id ?? null), [id]);
  const [clickedId, setClickedId] = React.useState<string | null>(id ?? null);
  const router = useTransitionRouter();

  const showComingSoon = React.useMemo(
    () => items && items.length < 10,
    [items],
  );

  return (
    <div className="relative w-full h-full overflow-auto sidebar">
      <div
        className={classNames(
          "absolute top-0 left-0 pr-5 w-full h-full flex flex-col justify-center items-center gap-4 text-white duration-250",
          {
            ["opacity-0"]: items,
            ["animate-[250ms_ease_fade-in]"]: !items,
          },
        )}
      >
        {serverStarting ? (
          <>
            <LoadingAnimation />
            {`Starting Database`}
          </>
        ) : (
          <>
            <LoadingAnimation />
            {`Loading`}
          </>
        )}
      </div>
      <div
        className={classNames(
          "relative w-full h-[var(--sidebar-height)] flex flex-col justify-center",
          {
            ["-left-5"]: !id,
            ["-left-10"]: id,
          },
        )}
        style={
          {
            "--sidebar-height": items
              ? `calc(2rem + ${showComingSoon ? 15 : 0}rem + 4 * ${items.length}rem)`
              : "100%",
          } as CSSProperties
        }
      >
        <div
          className={classNames("relative w-full ease-in-out duration-250", {
            ["-left-full"]: !items,
            ["left-0"]: items,
          })}
        >
          {items?.map((item, index) => (
            <Link
              key={index}
              href={`/${tables[articleType]}/${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                React.startTransition(() => {
                  setClickedId(item.id);
                });
                setTimeout(() => {
                  router.push(`/${tables[articleType]}/${item.id}`);
                }, 250);
              }}
              className="relative w-full"
            >
              <SidebarItem
                index={item.id}
                label={item.title}
                clickedId={clickedId}
                selectedId={id}
              />
            </Link>
          ))}
          {showComingSoon ? (
            <div className="pl-10 w-full h-60 flex flex-col justify-center items-center gap-4">
              <img
                className="w-20 h-auto"
                src="/articles/typewriter.svg"
                alt=""
              />
              <p className="text-white">
                {items?.length
                  ? `More articles coming soon...`
                  : `Still working on articles...`}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
