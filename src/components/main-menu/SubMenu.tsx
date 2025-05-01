import classNames from "classnames";
import { Link, useTransitionRouter } from "next-view-transitions";
import React, { CSSProperties } from "react";
import { Menu, SquareArrowOutUpRight, X } from "lucide-react";

export const SubMenu = ({
  menuOpen,
  linkHrefs,
  activeMenuIndex,
}: {
  menuOpen: boolean;
  linkHrefs: {
    text: string;
    url: string;
    image?: string;
  }[];
  activeMenuIndex: number;
}) => {
  const [shiftSubMenuList, setShiftSubMenuList] =
    React.useState<boolean>(false);
  const [clickedIndex, setClickedIndex] = React.useState<number>(-1);
  React.useEffect(() => setClickedIndex(activeMenuIndex), [activeMenuIndex]);
  const router = useTransitionRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!menuOpen) return;
    setMobileMenuOpen(false);
  }, [menuOpen]);
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
          "--mobile-menu-height": `calc(10rem + 3.5rem * ${linkHrefs.length})`,
        } as CSSProperties
      }
    >
      <div className="absolute left-1 xl:left-0 -top-5 xl:top-0 w-full h-full bg-white origin-bottom-right -rotate-2 -z-1 shadow-center"></div>
      <div className="absolute -left-5 xl:left-0 -top-5 xl:top-0 w-full h-[calc(100%+2rem)] bg-black origin-bottom-right rotate-3 -z-2 shadow-center"></div>
      <div
        className={classNames(
          "w-fit flex flex-col gap-4 xl:gap-0 xl:flex-row items-center duration-250",
          {
            ["xl:ml-6"]: !shiftSubMenuList,
            ["xl:ml-4"]: shiftSubMenuList,
          },
        )}
      >
        {linkHrefs.map((menuItem, index) => (
          <div
            key={index}
            className={classNames(
              "relative w-40 xl:w-30 h-14 xl:h-10 duration-250 mx-4 hover:mx-6 submenu-item hover:my-2 xl:hover:my-0",
              {
                ["mx-6 active-submenu"]: clickedIndex === index,
              },
            )}
          >
            <Link
              href={menuItem.url}
              onClick={(event) => {
                event.preventDefault();
                setShiftSubMenuList(false);
                setClickedIndex(index);
                router.push(menuItem.url);
              }}
              onPointerEnter={() => {
                if (activeMenuIndex === index) return;
                setShiftSubMenuList(true);
              }}
              onPointerLeave={() => {
                setShiftSubMenuList(false);
              }}
            >
              <div className="absolute w-full h-full bg-black duration-250 submenu-outline" />
              {activeMenuIndex === index ? (
                <div className="absolute w-full h-full submenu-indicator z-2">
                  <div
                    className={classNames(
                      "absolute w-full h-full flex justify-center items-center ease-in-out duration-250 text-white",
                      {
                        ["transform-[matrix3d(1.29,-0.045,0,-0.001,0.045,1.29,0,-0.001,0,0,1,0,-5,0,0,1)]"]:
                          clickedIndex === index,
                      },
                    )}
                  >
                    <div
                      className="absolute w-full h-full -z-1 brightness-50"
                      style={{
                        backgroundImage: menuItem.image ? `url('${menuItem.image}')` : "",
                      }}
                    />
                    {menuItem.text}
                  </div>
                </div>) :
                <></>
              }
              <div
                className={classNames(
                  "relative w-full h-full flex justify-center items-center gap-1 border-black bg-white border-2 origin-center duration-250 submenu-button",
                  {
                    ["transform-[matrix3d(1.29,-0.045,0,-0.001,0.045,1.29,0,-0.001,0,0,1,0,-5,0,0,1)]"]:
                      clickedIndex === index,
                  },
                )}
              >
                <div
                  className="absolute w-full h-full -z-1 duration-250 brightness-50 submenu-background" 
                  style={{
                    backgroundImage: menuItem.image ? `url('${menuItem.image}')` : "",
                  }}
                />
                {menuItem.text}
                {menuItem.url[0] != "/" ? <SquareArrowOutUpRight width={16} height={16}/> : <></>}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div
        className={classNames(
          "absolute right-1 w-24 h-24 z-2 flex justify-center items-center duration-500",
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
          className={classNames("absolute duration-500", {
            ["opacity-0"]: mobileMenuOpen,
          })}
        />
        <X
          width={48}
          height={48}
          className={classNames("absolute duration-500", {
            ["opacity-0"]: !mobileMenuOpen,
          })}
        />
      </div>
    </div>
  );
};

export default SubMenu;
