"use client";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import SubMenu from "./SubMenu";
import GlobalContext from "../context/GlobalContext";

const linkHrefs = ["about", "blog", "projects", "contact", "github"];

export const MainMenu = () => {
  const globalContext = React.useContext(GlobalContext);
  const viewportDimensions = globalContext?.state.viewportDimensions;
  React.useEffect(() => {
    if (!viewportDimensions || activeMenuIndex < 0) return
    const menuPosition = calculateMenuPosition(activeMenuIndex);
    document.body.style.setProperty("--transition-animation-origin-x", `${menuPosition.x}`);
    document.body.style.setProperty("--transition-animation-origin-y", `${menuPosition.y}`);
  }, [viewportDimensions])

  const pathname = usePathname();
  const path = React.useMemo(() => pathname.split("/")[1], [pathname])
  const activeMenuIndex = React.useMemo(() => linkHrefs.indexOf(path), [path]);
  const menuOpen = React.useMemo(() => path === "", [path]);
  const shouldCloseTransitionAnimation = React.useMemo(() => menuOpen || path === "contact", [menuOpen, path]);
  const [transitionAnimationOriginSet, setTransitionAnimationOrigin] = React.useState<boolean>(false);

  const router = useTransitionRouter();
    
  const startTransition = React.useTransition()[1];

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

  const closeMenu = (index: number) => {
    const menuPosition = calculateMenuPosition(index);
    document.body.style.setProperty("--transition-animation-origin-x", `${menuPosition.x}`);
    document.body.style.setProperty("--transition-animation-origin-y", `${menuPosition.y}`);
    setTransitionAnimationOrigin(true);
    setMenuClosing(true);
  };

  const calculateMenuPosition = React.useCallback((index: number) => {
    const boundingClientRect = menuRefs.current[index].getBoundingClientRect()
    return {
      x: boundingClientRect.x + 0.5 * boundingClientRect.width,
      y: boundingClientRect.y + 0.5 * boundingClientRect.height,
    }
  }, [])

  const menuRefs = React.useRef<HTMLDivElement[]>(Array.from({ length: linkHrefs.length }));

  return (
    <>
      <div
        ref={transitionAnimation}
        className={classNames(
          "fixed left-[calc(0vw-0.5*max(200vw,200vh))] top-[calc(0vh-0.5*max(200vw,200vh))] w-[max(200vw,200vh)] h-[max(200vw,200vh)] bg-black -z-2 no-view-transition",
          {},
        )}
        style={{
          animation: transitionAnimationOriginSet ? (shouldCloseTransitionAnimation ? "500ms transition-animation-out" : "500ms transition-animation") : "",
          transform: shouldCloseTransitionAnimation
            ? `matrix3d(-0.000707,-0.000707,0,0.000001,0.000707,-0.000707,0,0,0,0,1,0,var(--transition-animation-origin-x),var(--transition-animation-origin-y),0,1)`
            : "",
        }}
      ></div>
      <SubMenu activeMenuIndex={activeMenuIndex} linkHrefs={linkHrefs} menuOpen={menuOpen} />
      <div className="fixed ml-[10vw] h-screen flex flex-col justify-center -z-1">
        <div className="*:w-36 *:h-20 *:text-2xl *:text-black *:relative *:transition-all *:duration-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              ref={(element) => {
                if(!element) return
                menuRefs.current[index] = element
              }}
              key={index}
              onMouseEnter={() => {
                hoverMenuItem(index);
                setLastHoveredMenuItem(index);
              }}
              onMouseLeave={() => hoverMenuItem(null)}
              onClick={() => {
                startTransition(() =>
                  closeMenu(index),
                );
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
                <div className="w-36 h-20 transition-all inner-box"></div>
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
