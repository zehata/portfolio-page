"use client";
import React from "react";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

export const MainMenu = () => {
  const pathname = usePathname();
  const router = useTransitionRouter();
  const menuOpen = pathname === "/";
  const shouldShowTransitionAnimation =
    menuOpen || pathname.split("/")[1] === "contact";

  const [menuClosing, setMenuClosing] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!menuOpen) return;
    setMenuClosing(false);
  }, [menuOpen]);

  const [lastHoveredMenuItem, setLastHoveredMenuItem] = React.useState<
    number | null
  >();
  const [hoveredMenuItem, hoverMenuItem] = React.useState<number | null>();
  const transitionAnimation = React.useRef<HTMLDivElement | null>(null);

  const [pageTransitionOrigin, setPageTransitionOrigin] = React.useState<{
    x: number;
    y: number;
  }>({ x: -20, y: -20 });

  const closeMenu = (index: number) => {
    setMenuClosing(true);
    if (!transitionAnimation.current) return;
    transitionAnimation.current.style.transition = "0s";
    transitionAnimation.current.style.transform = `matrix3d(-0.000707,-0.000707,0,0.000001,0.000707,-0.000707,0,0,0,0,1,0,${pageTransitionOrigin.x},${pageTransitionOrigin.y},0,1)`;
    if (index === 3) return;
    setTimeout(() => {
      transitionAnimation.current!.style.transition = "500ms ease-in-out";
      transitionAnimation.current!.style.removeProperty("transform");
    });
  };

  const [subMenuSelectorPosition, setMenuSelectorPosition] = React.useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const linkHrefs = ["/about", "/blog", "/", "/contact", "/"];

  const hoverSubMenu = React.useCallback((event: React.PointerEvent) => {
    const subMenuPosition = event.currentTarget.getBoundingClientRect();
    const parentPosition =
      event.currentTarget.parentElement?.getBoundingClientRect();
    if (!parentPosition) return;
    setMenuSelectorPosition({
      x: subMenuPosition.x - parentPosition.x,
      y: subMenuPosition.y - parentPosition.y,
      width: subMenuPosition.width,
      height: subMenuPosition.height,
    });
  }, []);

  return (
    <>
      <div
        ref={transitionAnimation}
        className={classNames(
          "fixed left-[calc(0vw-0.5*max(200vw,200vh))] top-[calc(0vh-0.5*max(200vw,200vh))] w-[max(200vw,200vh)] h-[max(200vw,200vh)] bg-black -z-2 no-view-transition",
          {},
        )}
        style={{
          transform: shouldShowTransitionAnimation
            ? `matrix3d(-0.000707,-0.000707,0,0.000001,0.000707,-0.000707,0,0,0,0,1,0,${pageTransitionOrigin.x},${pageTransitionOrigin.y},0,1)`
            : "",
        }}
      ></div>
      <div
        className={classNames(
          "flex flex-col justify-end absolute lg:left-[40vw] w-[100vw] h-[40vh] p-4 bg-white transform-gpu ease-in-out duration-250 subMenu",
          {
            ["-rotate-5 top-[-30vh]"]: !menuOpen,
            ["top-[-40vh]"]: menuOpen,
          },
        )}
      >
        <div
          className="rotate-5 transform-gpu flex"
          onPointerLeave={() => {
            if (!subMenuSelectorPosition) return;
            setMenuSelectorPosition({
              x: subMenuSelectorPosition.x + subMenuSelectorPosition.width / 2,
              y: subMenuSelectorPosition.y + subMenuSelectorPosition.height / 2,
              width: 0,
              height: 0,
            });
          }}
        >
          <div
            className={classNames(
              "fixed backdrop-invert-100 z-1  ease-in-out hover:transform-[matrix3d(1.1,-0.06,-0.342,-0.001,-0.06,1.2,-0.342,0,0.342,0.342,0.94,0,-5,0,0,1)]",
              {
                ["duration-100"]: subMenuSelectorPosition != null,
              },
            )}
            style={{
              left: subMenuSelectorPosition?.x,
              top: subMenuSelectorPosition?.y,
              width: subMenuSelectorPosition?.width,
              height: subMenuSelectorPosition?.height,
            }}
          ></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="px-4 py-2"
              onPointerEnter={(event) => hoverSubMenu(event)}
            >
              {`Menu Item ${index}`}
            </div>
          ))}
        </div>
      </div>
      <div className="fixed ml-[10vw] h-screen flex flex-col justify-center -z-1">
        <div className="*:w-36 *:h-20 *:text-2xl *:text-black *:relative *:transition-all *:duration-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              onMouseEnter={() => {
                hoverMenuItem(index);
                setLastHoveredMenuItem(index);
              }}
              onMouseLeave={() => hoverMenuItem(null)}
              onClick={(event) => {
                const currentTarget =
                  event.currentTarget.getBoundingClientRect();
                setPageTransitionOrigin({
                  x: currentTarget.x + 0.5 * currentTarget.width,
                  y: currentTarget.y + 0.5 * currentTarget.height,
                });
                closeMenu(index);
                router.push(linkHrefs[index]);
              }}
              className={classNames(
                "border-black border-2 bg-red-200 hover:bg-red-400 no-view-transition",
                {
                  [`selector-prev`]: hoveredMenuItem === index + 1,
                  [`selector-current`]: hoveredMenuItem === index,
                  [`selector-next`]: hoveredMenuItem === index - 1,
                  [`z-1`]:
                    lastHoveredMenuItem === index - 1 ||
                    lastHoveredMenuItem === index + 1,
                  [`z-2`]: lastHoveredMenuItem === index,
                  [`menu-closed`]: !menuOpen || menuClosing,
                },
              )}
              style={{
                transitionDelay: menuClosing
                  ? `${Math.abs((lastHoveredMenuItem ?? 0) - index) * 50}ms`
                  : "0s",
              }}
            >
              <div className="absolute w-full h-full overflow-hidden no-view-transition">
                <div className="w-36 h-20 bg-green-500 transition-all inner-box"></div>
              </div>
              <div className="absolute w-36 h-20 transition-all outer-box -z-1 no-view-transition bg-black"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainMenu;
