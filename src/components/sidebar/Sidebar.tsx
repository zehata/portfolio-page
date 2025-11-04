"use client";

import React, { CSSProperties } from "react";
import SidebarItem from "./SidebarItem";
import classNames from "classnames";
import { useTransitionRouter } from "next-view-transitions";
import { ArticleType, tables } from "@/lib/types";
import LoadingAnimation from "./LoadingAnimation";
import Link from "next/link";
import Mousetrap from "mousetrap";

export const Sidebar = ({
  articleType,
  id,
  items,
}: {
  articleType: ArticleType;
  id?: string;
  items: readonly { id: string; title: string }[] | null;
}) => {
  const [clickedId, setClickedId] = React.useState<string | null>(id ?? null);
  React.useEffect(() => setClickedId(id ?? null), [id]);
  const router = useTransitionRouter();

  const showComingSoon = React.useMemo(
    () => items && items.length < 10,
    [items],
  );

  const listRef = React.useRef<HTMLDivElement>(null);

  const [pointerHovering, setPointerHovering] = React.useState<boolean>(false);

  const focusedListItemIndex = React.useRef<number>(0);
  const listItemsRef = React.useRef<HTMLAnchorElement[]>([]);

  const focusListItemIndex = React.useCallback((focusIndex: number) => {
    listItemsRef.current.map((listItem, index) => {
      listItem.tabIndex = index === focusIndex ? 0 : -1;
    });
    listItemsRef.current[focusIndex].focus();
  }, []);

  const focusPreviousListIndex = React.useCallback(() => {
    if (!items?.length) return;
    const index =
      (items?.length + focusedListItemIndex.current - 1) % items?.length;
    focusedListItemIndex.current = index;
    focusListItemIndex(index);
  }, [items, focusListItemIndex]);

  const focusNextListIndex = React.useCallback(() => {
    if (!items?.length) return;
    const index = (focusedListItemIndex.current + 1) % items?.length;
    focusedListItemIndex.current = index;
    focusListItemIndex(index);
  }, [items, focusListItemIndex]);

  React.useEffect(() => {
    if (!listRef.current) return;

    const sidebarList = listRef.current;
    Mousetrap(sidebarList).bind("up", focusPreviousListIndex);
    Mousetrap(sidebarList).bind("down", focusNextListIndex);
    Mousetrap(sidebarList).bind("left", focusPreviousListIndex);
    Mousetrap(sidebarList).bind("right", focusNextListIndex);

    return () => {
      Mousetrap(sidebarList).unbind("up");
      Mousetrap(sidebarList).unbind("down");
      Mousetrap(sidebarList).unbind("left");
      Mousetrap(sidebarList).unbind("right");
    };
  }, [focusPreviousListIndex, focusNextListIndex]);

  return (
    <div className="relative w-full h-full overflow-auto sidebar">
      <div
        className={classNames(
          "absolute top-0 left-0 pl-5 pr-5 w-full h-full flex flex-col justify-center items-center gap-4 text-white duration-250",
          {
            ["opacity-0"]: items,
            ["animate-[250ms_ease_fade-in]"]: !items,
          },
        )}
      >
        <LoadingAnimation />
        {`Loading`}
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
              ? `calc(4rem + ${showComingSoon ? 15 : 0}rem + 4 * ${items.length}rem)`
              : "100%",
          } as CSSProperties
        }
      >
        <div
          className={classNames("relative w-full ease-in-out duration-250", {
            ["-left-full"]: !items,
            ["left-0"]: items,
          })}
          ref={listRef}
        >
          {items?.map((item, index) => (
            <Link
              key={index}
              ref={(element) => {
                if (!element) return;
                listItemsRef.current[index] = element;
              }}
              href={`/${tables[articleType]}/${item.id}`}
              onPointerEnter={() => setPointerHovering(true)}
              onPointerLeave={() => setPointerHovering(false)}
              onClick={(event) => {
                event.preventDefault();
                focusedListItemIndex.current = index;
                React.startTransition(() => {
                  setClickedId(item.id);
                });
                setTimeout(() => {
                  router.push(`/${tables[articleType]}/${item.id}`);
                }, 250);
              }}
              className={classNames(
                "relative w-[calc(100%+1rem)] h-16 pl-20 pr-5 py-4 hover:h-20 hover:py-6 flex items-center bg-background hover:bg-(--focus-background) hover:z-2 duration-250 ease-in-out sidebar-item shadow-center overflow-hidden",
                {
                  ["focus:h-20 focus:py-6 focus:bg-(--focus-background)"]:
                    !pointerHovering,
                  ["focus:-left-4"]: !pointerHovering && item.id != clickedId,
                  ["-left-5 hover:-left-4 active:left-1"]: item.id != clickedId,
                  ["left-0 h-20 py-6 clicked bg-(--focus-background) z-2"]:
                    item.id === clickedId,
                },
              )}
              tabIndex={index ? -1 : 0}
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
            <li>
              <div className="pl-10 w-full h-60 flex flex-col justify-center items-center gap-4">
                <img
                  className="w-20 h-auto"
                  src="https://images.zehata.dev/public/articles/typewriter.svg"
                  alt=""
                />
                <p className="text-white">
                  {items?.length
                    ? `More articles coming soon...`
                    : `Still working on articles...`}
                </p>
              </div>
            </li>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
