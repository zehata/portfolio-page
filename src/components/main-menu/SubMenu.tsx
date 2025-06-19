import classNames from "classnames";
import React, { CSSProperties } from "react";
import { Menu, SquareArrowOutUpRight, X } from "lucide-react";
import Link from "next/link";
import ThemeSwitch, { Theme } from "../common/ThemeSwitch";
import GlobalContext from "../context/GlobalContext";

export const SubMenu = ({
  menuOpen,
  menuItems,
  activeMenuIndex,
  submenuRefs,
  handleSubmenuClick,
}: {
  menuOpen: boolean;
  menuItems: {
    text: string;
    link: string;
    path?: string;
    image?: string;
  }[];
  activeMenuIndex: number;
  submenuRefs: React.RefObject<HTMLDivElement[]>;
  handleSubmenuClick: (index: number) => void;
}) => {
  const [pointerHovering, setPointerHovering] = React.useState<boolean>(false);

  const [clickedIndex, setClickedIndex] = React.useState<number>(-1);
  React.useEffect(() => setClickedIndex(activeMenuIndex), [activeMenuIndex]);

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!menuOpen) return;
    setMobileMenuOpen(false);
  }, [menuOpen]);

  const handleClick = React.useCallback(
    (event: React.MouseEvent, index: number) => {
      event.preventDefault();
      setClickedIndex(index);
      handleSubmenuClick(index);
    },
    [handleSubmenuClick],
  );

  const nextTheme = React.useCallback((theme: Theme) => {
    if (theme === "auto") return "dark";
    if (theme === "dark") return "light";
    return "auto";
  }, []);

  const themeState = React.useContext(GlobalContext)?.themeState;
  if (!themeState) return <></>;
  const { theme, setTheme } = themeState;

  return (
    <div
      className={classNames(
        "absolute top-0 xl:top-[-16rem] right-0 xl:-right-5 w-full xl:w-[calc(80vw-5rem)] h-[var(--mobile-menu-height)] xl:h-[20rem] xl:pt-0 xl:pb-0 flex flex-row xl:flex-col items-center xl:items-start justify-center xl:justify-end xl:origin-[300%_100%] submenu z-2 duration-500",
        {
          ["origin-[calc(100%-3rem)_calc(2rem)] rotate-0 xl:rotate-0"]:
            mobileMenuOpen && !menuOpen,
          ["origin-[calc(100%-3rem)_calc(2rem)] rotate-180 xl:rotate-0"]:
            !mobileMenuOpen && !menuOpen,
          ["origin-[calc(100%-3.5rem)_calc(-2rem)] rotate-210 xl:rotate-5"]:
            menuOpen,
        },
      )}
      style={
        {
          "--mobile-menu-height": `calc(16rem + 3.5rem * ${menuItems.length})`,
        } as CSSProperties
      }
    >
      <div className="absolute left-4 xl:left-0 -top-6 xl:top-0 w-full h-full bg-background origin-bottom-right -rotate-2 -z-1 shadow-center"></div>
      <div className="absolute -left-6 xl:left-0 -top-5 xl:top-0 w-full h-[calc(100%+1rem)] bg-black origin-bottom-right rotate-3 -z-2 shadow-center"></div>
      <div className="absolute xl:w-[calc(80vw-10rem)] xl:h-14 flex justify-center">
        <div
          className={classNames(
            "w-fit h-full flex flex-col gap-4 xl:gap-0 xl:flex-row items-center ease-in-out duration-250",
          )}
        >
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              ref={(element) => {
                if (!element) return;
                submenuRefs.current[index] = element;
              }}
              onPointerEnter={() => setPointerHovering(true)}
              onPointerLeave={() => setPointerHovering(false)}
              className={classNames(
                "relative w-40 xl:w-30 h-14 xl:h-10 ease-in-out duration-250 mx-4 hover:mx-6 submenu-item active:scale-90",
                {
                  ["focus-within:mx-6 keyboard-focus"]: !pointerHovering,
                  ["mx-6 active-submenu"]: clickedIndex === index,
                  ["hover:my-2 xl:hover:my-0"]: activeMenuIndex != index,
                },
              )}
            >
              <Link
                href={menuItem.link}
                onClick={(event) => handleClick(event, index)}
                tabIndex={menuOpen ? -1 : 0}
              >
                <div className="absolute w-full h-full bg-black duration-250 submenu-outline" />
                <div
                  className={classNames(
                    "relative w-full h-full flex justify-center items-center gap-1 border-foreground bg-background border-2 origin-center duration-250 submenu-button",
                    {
                      ["transform-[matrix3d(1.29,-0.045,0,-0.001,0.045,1.29,0,-0.001,0,0,1,0,-5,0,0,1)]"]:
                        clickedIndex === index,
                    },
                  )}
                >
                  <div
                    className="absolute w-full h-full -z-1 duration-250 brightness-50 submenu-background"
                    style={{
                      backgroundImage: menuItem.image
                        ? `url('${menuItem.image}')`
                        : "",
                    }}
                  />
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
      <div
        className={classNames(
          "absolute right-0 w-24 h-24 z-2 flex justify-center items-center duration-250 cursor-pointer",
          {
            ["top-0"]: mobileMenuOpen,
            ["-top-5"]: !mobileMenuOpen,
          },
        )}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu
          width={48}
          height={48}
          className={classNames("absolute duration-250", {
            ["opacity-0"]: mobileMenuOpen,
          })}
        />
        <X
          width={48}
          height={48}
          className={classNames("absolute duration-250", {
            ["opacity-0"]: !mobileMenuOpen,
          })}
        />
      </div>
      <ThemeSwitch
        onClick={() => setTheme(nextTheme(theme))}
        on={theme}
        className="absolute w-24 bottom-10 lg:bottom-4 right-10"
        toggle={() => setTheme(nextTheme(theme))}
        tabIndex={0}
      />
    </div>
  );
};

export default SubMenu;
