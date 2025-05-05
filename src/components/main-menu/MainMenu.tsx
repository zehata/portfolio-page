"use client";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import SubMenu from "./SubMenu";
import GlobalContext from "../context/GlobalContext";
import { SquareArrowOutUpRight } from "lucide-react";
import { debounce } from "lodash";
import Link from "next/link";

const linkHrefs = [
  {
    text: "Me",
    url: "/about",
    image: "/menu-item-backgrounds/about.webp",
  },
  {
    text: "Dev Blog",
    url: "/blogs",
    image: "/menu-item-backgrounds/blogs.webp",
  },
  {
    text: "Projects",
    url: "/projects",
    image: "/menu-item-backgrounds/projects.webp",
  },
  {
    text: "Contacts",
    url: "/contact",
    image: "/menu-item-backgrounds/contacts.webp",
  },
  {
    text: "GitHub",
    url: "https://github.com/zehata",
  },
  {
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/zehata/",
  },
];

export const MainMenu = () => {
  const globalContext = React.useContext(GlobalContext);
  const viewportDimensions = globalContext?.state.viewportDimensions;

  const pathname = usePathname();
  const path = React.useMemo(() => pathname.split("/")[1], [pathname]);
  const activeMenuIndex = React.useMemo(
    () => linkHrefs.map((link) => link.url).indexOf(`/${path}`),
    [path],
  );
  const menuOpen = React.useMemo(() => path === "", [path]);
  const [hasTransitionAnimationOrigin, setHasTransitionAnimationOrigin] =
    React.useState<boolean>(false);

  const router = useTransitionRouter();

  const calculateMenuPosition = React.useCallback(
    (menuItem: HTMLDivElement) => {
      const boundingClientRect = menuItem.getBoundingClientRect();
      return {
        x: boundingClientRect.x + 0.5 * boundingClientRect.width,
        y: boundingClientRect.y + 0.5 * boundingClientRect.height,
      };
    },
    [],
  );

  const setTransitionAnimationOrigin = React.useCallback(
    (index: number) => {
      const menuPosition = calculateMenuPosition(menuRefs.current[index]);
      document.body.style.setProperty(
        "--transition-animation-origin-x",
        `${menuPosition.x}`,
      );
      document.body.style.setProperty(
        "--transition-animation-origin-y",
        `${menuPosition.y}`,
      );
      setHasTransitionAnimationOrigin(true);
    },
    [calculateMenuPosition],
  );

  const setSubmenuTransitionAnimationOrigin = React.useCallback(
    (index: number) => {
      const menuPosition = calculateMenuPosition(submenuRefs.current[index]);
      document.body.style.setProperty(
        "--transition-animation-origin-x-submenu",
        `${menuPosition.x}`,
      );
      document.body.style.setProperty(
        "--transition-animation-origin-y-submenu",
        `${menuPosition.y}`,
      );
      setHasTransitionAnimationOrigin(true);
    },
    [calculateMenuPosition],
  );

  React.useEffect(() => {
    if (!viewportDimensions || activeMenuIndex < 0) return;
    setTransitionAnimationOrigin(activeMenuIndex);
    if (linkHrefs[activeMenuIndex].url === "/contact") return;
    setSubmenuTransitionAnimationOrigin(activeMenuIndex);
  }, [
    activeMenuIndex,
    calculateMenuPosition,
    viewportDimensions,
    setSubmenuTransitionAnimationOrigin,
    setTransitionAnimationOrigin,
  ]);

  const [transitionAnimationClosed, setTransitionAnimationClosed] =
    React.useState<{
      prev: boolean;
      current: boolean;
    }>({
      prev: menuOpen || path === "contact",
      current: menuOpen || path === "contact",
    });

  const closeTransitionAnimation = React.useCallback(
    (close: boolean) => {
      setTransitionAnimationClosed({
        prev: transitionAnimationClosed.current,
        current: close,
      });
    },
    [transitionAnimationClosed],
  );

  React.useEffect(() => {
    setTransitionAnimationClosed((transitionAnimationClosed) => {
      return {
        prev: transitionAnimationClosed.current,
        current: menuOpen || path === "contact",
      };
    });
  }, [menuOpen, path, setTransitionAnimationClosed]);
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

  const menuRefs = React.useRef<HTMLDivElement[]>(
    Array.from({ length: linkHrefs.length }),
  );

  const submenuRefs = React.useRef<HTMLDivElement[]>(
    Array.from({ length: linkHrefs.length }),
  );

  const handlePointerEnter = React.useMemo(
    () =>
      debounce((index: number) => {
        hoverMenuItem(index);
        setLastHoveredMenuItem(index);
      }),
    [],
  );

  const handlePointerLeave = React.useMemo(
    () =>
      debounce(() => {
        hoverMenuItem(null);
      }),
    [],
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent, index: number) => {
      event.preventDefault();
      React.startTransition(() => {
        setTransitionAnimationOrigin(index);
        if (linkHrefs[index].url === "/contact") return;
        setMenuClosing(true);
        closeTransitionAnimation(false);
      });
      setTimeout(() => {
        router.push(linkHrefs[index].url);
      }, 500);
    },
    [closeTransitionAnimation, router, setTransitionAnimationOrigin],
  );

  const handleSubmenuClick = React.useCallback(
    (index: number) => {
      React.startTransition(() => {
        if (linkHrefs[index].url === "/contact") return;
        setSubmenuTransitionAnimationOrigin(index);
        setMenuClosing(true);
        closeTransitionAnimation(false);
      });
      setTimeout(() => {
        router.push(linkHrefs[index].url);
      }, 500);
    },
    [closeTransitionAnimation, router, setSubmenuTransitionAnimationOrigin],
  );

  return (
    <>
      <div
        className={classNames(
          "absolute left-0 w-[calc(10vw+14rem)] h-full backdrop-blur-md -z-2 ease-in-out duration-500",
          { ["left-[calc(-10vw-15rem)]"]: menuClosing || !menuOpen },
        )}
      >
        <div className="w-full h-full bg-white opacity-75"></div>
      </div>
      <div
        ref={transitionAnimation}
        className="fixed left-[calc(0vw-0.5*200vmax)] top-[calc(0vh-0.5*200vmax)] w-[200vmax] h-[200vmax] bg-black -z-1 transition-animation"
        style={{
          animation:
            hasTransitionAnimationOrigin &&
            transitionAnimationClosed.prev != transitionAnimationClosed.current
              ? transitionAnimationClosed.current
                ? menuOpen
                  ? "500ms transition-animation-out"
                  : "500ms transition-animation-out-submenu"
                : menuOpen
                  ? "500ms transition-animation"
                  : "500ms transition-animation-submenu"
              : "",
          transform:
            hasTransitionAnimationOrigin && transitionAnimationClosed.current
              ? menuOpen
                ? "matrix3d(-0.000707,-0.000707,0,0.000001,0.000707,-0.000707,0,0,0,0,1,0,var(--transition-animation-origin-x),var(--transition-animation-origin-y),0,1)"
                : "matrix3d(-0.000707,-0.000707,0,0.000001,0.000707,-0.000707,0,0,0,0,1,0,var(--transition-animation-origin-x-submenu),var(--transition-animation-origin-y-submenu),0,1)"
              : "",
          opacity: transitionAnimationClosed.current ? "0" : "1",
        }}
      ></div>
      <SubMenu
        activeMenuIndex={activeMenuIndex}
        linkHrefs={linkHrefs}
        menuOpen={menuOpen}
        submenuRefs={submenuRefs}
        handleSubmenuClick={handleSubmenuClick}
      />
      <div className="fixed ml-[10vw] h-screen flex flex-col justify-center -z-1">
        <div className="*:w-36 *:h-20 *:text-2xl *:text-black *:hover:text-white *:relative *:transition-all *:duration-500">
          {linkHrefs.map((menuItem, index) => (
            <div
              key={index}
              ref={(element) => {
                if (!element) return;
                menuRefs.current[index] = element;
              }}
              onPointerEnter={() => handlePointerEnter(index)}
              onPointerLeave={() => handlePointerLeave()}
              className={classNames(
                "relative border-2 border-transparent hover:border-black no-view-transition",
                {
                  [`selector-prev`]: hoveredMenuItem === index + 1,
                  [`selector-current`]: hoveredMenuItem === index,
                  [`selector-next`]: hoveredMenuItem === index - 1,
                  [`z-1`]:
                    lastHoveredMenuItem === index - 1 ||
                    lastHoveredMenuItem === index + 1,
                  [`z-2`]: lastHoveredMenuItem === index,
                  ["duration-250 left-0 animate-[500ms_ease-in-out_main-menu-items-slide-in]"]:
                    menuOpen,
                  ["opacity-0"]: menuClosing || !menuOpen,
                  ["animate-[500ms_ease-in-out_main-menu-items-slide-out]"]:
                    !menuOpen && menuClosing && lastHoveredMenuItem != index,
                },
              )}
              style={{
                transitionDelay: menuClosing
                  ? `${Math.abs((lastHoveredMenuItem ?? 0) - index) * 50}ms`
                  : "0s",
              }}
            >
              <Link
                href={menuItem.url}
                onClick={(event) => handleClick(event, index)}
              >
                <div className="absolute w-36 h-20 transition-all outer-box -z-1 no-view-transition bg-black"></div>
                <div className="absolute w-full h-full overflow-hidden no-view-transition">
                  <div
                    className="w-36 h-20 transition-all inner-box"
                    style={{
                      backgroundImage: menuItem.image
                        ? `url('${menuItem.image}')`
                        : "",
                    }}
                  />
                </div>
                <div className="relative w-full h-full flex justify-center items-center gap-2 z-2">
                  {menuItem.text}
                  {menuItem.url[0] != "/" ? (
                    <SquareArrowOutUpRight width={20} height={20} />
                  ) : (
                    <></>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainMenu;
