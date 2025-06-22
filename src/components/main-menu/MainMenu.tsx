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

const menuItems = [
  {
    text: "Me",
    path: "about",
    link: "/about/hello",
    image: "https://images.zehata.dev/public/menu-item-backgrounds/about.webp",
  },
  {
    text: "Dev Blog",
    path: "blogs",
    link: "/blogs",
    image: "https://images.zehata.dev/public/menu-item-backgrounds/blogs.webp",
  },
  {
    text: "Projects",
    path: "projects",
    link: "/projects",
    image:
      "https://images.zehata.dev/public/menu-item-backgrounds/projects.webp",
  },
  {
    text: "Contacts",
    path: "contact",
    link: "/contact",
    image:
      "https://images.zehata.dev/public/menu-item-backgrounds/contacts.webp",
  },
  {
    text: "GitHub",
    link: "https://github.com/zehata",
  },
  {
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/zehata/",
  },
] as {
  text: string;
  link: string;
  path?: string;
  image?: string;
}[];

export const MainMenu = () => {
  const globalContext = React.useContext(GlobalContext);
  const viewportDimensions = globalContext?.viewportDimensions;

  const pathname = usePathname();
  const path = React.useMemo(() => pathname.split("/")[1], [pathname]);
  const activeMenuIndex = React.useMemo(
    () => menuItems.map((menuItem) => menuItem.path).indexOf(path),
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
    if (
      menuItems[activeMenuIndex].path === "contact" &&
      hasTransitionAnimationOrigin
    )
      return;
    setSubmenuTransitionAnimationOrigin(activeMenuIndex);
  }, [
    activeMenuIndex,
    calculateMenuPosition,
    viewportDimensions,
    setSubmenuTransitionAnimationOrigin,
    setTransitionAnimationOrigin,
    hasTransitionAnimationOrigin,
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
  const [pointerHovering, setPointerHovering] = React.useState<boolean>(false);
  const [hoveredMenuItem, hoverMenuItem] = React.useState<number | null>();
  const transitionAnimation = React.useRef<HTMLDivElement | null>(null);

  const menuRefs = React.useRef<HTMLDivElement[]>(
    Array.from({ length: menuItems.length }),
  );

  const submenuRefs = React.useRef<HTMLDivElement[]>(
    Array.from({ length: menuItems.length }),
  );

  const handleFocusMenuItem = React.useMemo(
    () =>
      debounce((index: number) => {
        hoverMenuItem(index);
        setLastHoveredMenuItem(index);
      }, 10),
    [],
  );

  const handlePointerLeave = React.useMemo(
    () =>
      debounce(() => {
        hoverMenuItem(null);
      }, 10),
    [],
  );

  const closeMenuOnBackNavigation = React.useCallback(() => {
    window.addEventListener("pageshow", () => {
      setMenuClosing(false);
      closeTransitionAnimation(true);
    });
  }, [closeTransitionAnimation]);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
      event.preventDefault();
      event.currentTarget.blur();
      handlePointerLeave();
      setTransitionAnimationOrigin(index);
      setSubmenuTransitionAnimationOrigin(index);

      if (menuItems[index].path != "contact") {
        setMenuClosing(true);
        closeTransitionAnimation(false);
      }

      if (!menuItems[index].path) closeMenuOnBackNavigation();
      setTimeout(() => {
        router.push(menuItems[index].link);
        if (menuItems[index].path) return;
        setMenuClosing(false);
        closeTransitionAnimation(true);
      }, 500);
    },
    [
      closeTransitionAnimation,
      router,
      setTransitionAnimationOrigin,
      setSubmenuTransitionAnimationOrigin,
      closeMenuOnBackNavigation,
      handlePointerLeave,
    ],
  );

  const handleSubmenuClick = React.useCallback(
    (index: number) => {
      React.startTransition(() => {
        setTransitionAnimationOrigin(index);
        if (menuItems[index].path === "contact") return;
        setSubmenuTransitionAnimationOrigin(index);
        setMenuClosing(true);
        closeTransitionAnimation(false);
      });
      setTimeout(() => {
        router.push(menuItems[index].link);
      }, 500);
    },
    [
      closeTransitionAnimation,
      router,
      setTransitionAnimationOrigin,
      setSubmenuTransitionAnimationOrigin,
    ],
  );

  return (
    <>
      <div
        className={classNames(
          "absolute left-0 w-[calc(10vw+14rem)] h-full backdrop-blur-md -z-2 ease-in-out duration-500",
          { ["left-[calc(-10vw-15rem)]"]: menuClosing || !menuOpen },
        )}
      >
        <div className="w-full h-full bg-background opacity-75"></div>
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
        menuItems={menuItems}
        menuOpen={menuOpen}
        submenuRefs={submenuRefs}
        handleSubmenuClick={handleSubmenuClick}
      />
      <div
        className={classNames(
          "absolute ml-[10vw] h-[100dvh] flex flex-col justify-center -z-1",
          { ["-z-2"]: menuClosing || !menuOpen },
        )}
      >
        <div className="*:w-36 *:h-20 *:text-2xl *:relative *:transition-all *:duration-500">
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              ref={(element) => {
                if (!element) return;
                menuRefs.current[index] = element;
              }}
              onPointerEnter={() => {
                setPointerHovering(true);
                handleFocusMenuItem(index);
              }}
              onPointerLeave={() => {
                setPointerHovering(false);
                handlePointerLeave();
              }}
              className={classNames(
                "relative active:duration-500 active:scale-90 no-view-transition",
                {
                  [`selector-prev`]: hoveredMenuItem === index + 1,
                  [`selector-current text-white`]: hoveredMenuItem === index,
                  [`selector-next`]: hoveredMenuItem === index - 1,
                  [`z-1`]:
                    lastHoveredMenuItem === index - 1 ||
                    lastHoveredMenuItem === index + 1,
                  [`z-2`]: lastHoveredMenuItem === index,
                  ["duration-500 left-0 animate-[500ms_ease-in-out_main-menu-items-slide-in]"]:
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
                href={menuItem.link}
                onClick={(event) => handleClick(event, index)}
                onFocus={() => {
                  if (pointerHovering) return;
                  handleFocusMenuItem(index);
                }}
                onBlur={() => handlePointerLeave()}
                tabIndex={menuOpen ? 0 : -1}
              >
                <div
                  className={classNames(
                    "absolute w-36 h-20 transition-all outer-box -z-1 no-view-transition bg-black outline-2 outline-transparent",
                    {
                      ["outline-white"]: index === hoveredMenuItem,
                    },
                  )}
                ></div>
                <div
                  className={classNames(
                    "absolute w-full h-full overflow-hidden transition-all duration-500 no-view-transition outline-2 outline-transparent",
                    {
                      ["outline-white"]: index === hoveredMenuItem,
                    },
                  )}
                >
                  <div
                    className={classNames(
                      "absolute w-36 h-20 transition-all outline-2 inner-box outline-transparent",
                      {
                        ["outline-white"]: index === hoveredMenuItem,
                      },
                    )}
                  >
                    <div
                      className="w-full h-full brightness-50"
                      style={{
                        backgroundImage: menuItem.image
                          ? `url('${menuItem.image}')`
                          : "",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="relative w-full h-full flex justify-center items-center gap-2 z-2">
                  {menuItem.text}
                  {menuItem.path ? (
                    <></>
                  ) : (
                    <SquareArrowOutUpRight width={20} height={20} />
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
