"use client";
import React from "react";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";

export const MainMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const menuOpen = pathname === "/";

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

  const closeMenu = () => {
    setMenuClosing(true);
    if (!transitionAnimation.current) return;
    transitionAnimation.current!.style.transition = "0s";
    transitionAnimation.current.style.transform = `matrix3d(-0.000707,-0.000707,0,0.000001,0.000707,-0.000707,0,0,0,0,1,0,${pageTransitionOrigin.x},${pageTransitionOrigin.y},0,1)`;
    setTimeout(() => {
      transitionAnimation.current!.style.transition = "500ms ease-in-out";
      transitionAnimation.current!.style.removeProperty("transform");
    });
  };

  return (
    <>
      <div
        ref={transitionAnimation}
        className={classNames(
          "fixed left-[calc(0vw-0.5*max(200vw,200vh))] top-[calc(0vh-0.5*max(200vw,200vh))] w-[max(200vw,200vh)] h-[max(200vw,200vh)] bg-black",
          {},
        )}
        style={{
          transform: menuOpen
            ? `matrix3d(-0.000707,-0.000707,0,0.000001,0.000707,-0.000707,0,0,0,0,1,0,${pageTransitionOrigin.x},${pageTransitionOrigin.y},0,1)`
            : "",
        }}
      ></div>
      <div className="fixed ml-[80vw] h-screen flex flex-col justify-center">
        <div className="*:w-36 *:h-36 *:text-2xl *:text-black *:relative *:transition-all *:duration-500">
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
                closeMenu();
                router.push("/blog");
              }}
              className={classNames(
                "border-black border-2 bg-red-200 hover:bg-red-400",
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
              <div className="absolute w-full h-full overflow-hidden">
                <div className="w-36 h-36 bg-green-500 transition-all inner-box"></div>
              </div>
              <div className="absolute w-36 h-36 transition-all outer-box -z-1"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainMenu;
