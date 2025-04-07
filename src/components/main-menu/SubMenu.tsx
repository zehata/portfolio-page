import classNames from "classnames";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";

export const SubMenu = ({
  menuOpen,
  linkHrefs,
  activeMenuIndex,
}: {
  menuOpen: boolean;
  linkHrefs: string[];
  activeMenuIndex: number;
}) => {
  const [shiftSubMenuList, setShiftSubMenuList] = React.useState<boolean>(false);
  const [clickedIndex, setClickedIndex] = React.useState<number>(-1);
  React.useEffect(() => setClickedIndex(activeMenuIndex), [activeMenuIndex])
  const router = useTransitionRouter();
  return (
    <div className={classNames("absolute top-[-16rem] -right-5 w-[calc(60vw-5rem)] h-[20rem] flex flex-col justify-end bg-blue-500 origin-[300%_100%] subMenu z-2", {
      ["rotate-5"]: menuOpen,
    })}>
      <div className="absolute w-full h-full bg-white origin-bottom-right -rotate-5 -z-1"></div>
      <div className={classNames("flex duration-250", {
        ["ml-6"]: !shiftSubMenuList,
        ["ml-4"]: shiftSubMenuList,
      })}>
        {linkHrefs.map((_, index) =>
          <div
            key={index}
            className={classNames("relative duration-250 mx-4 hover:mx-6 submenu-item", {
              ["mx-6 active-submenu"]: clickedIndex === index,
            })}
          >
            <div className="absolute w-full h-full bg-black duration-250 submenu-outline"/>
            {activeMenuIndex === index && <div className="absolute w-full h-full submenu-indicator z-2">
              <div className={classNames("absolute w-full h-full flex justify-center items-center bg-blue-500 ease-in-out duration-250", {
                ["transform-[matrix3d(1.29,-0.045,0,-0.001,0.045,1.29,0,-0.001,0,0,1,0,-5,0,0,1)]"]: clickedIndex === index,
              })}>
                {`Item ${index}`}
              </div>
            </div>}
            <div
              className={classNames("relative flex justify-center items-center w-30 h-10 border-black bg-white border-2 origin-center duration-250 hover:transform-[matrix3d(1.29,-0.045,0,-0.001,0.045,1.29,0,-0.001,0,0,1,0,-5,0,0,1)] hover:z-1", {
                ["transform-[matrix3d(1.29,-0.045,0,-0.001,0.045,1.29,0,-0.001,0,0,1,0,-5,0,0,1)]"]: clickedIndex === index,
              })}
              onPointerEnter={() => {
                if (activeMenuIndex === index) return
                setShiftSubMenuList(true);
              }}
              onPointerLeave={() => {
                setShiftSubMenuList(false);
              }}
              onClick={() => {
                setShiftSubMenuList(false);
                setClickedIndex(index);
                setTimeout(() => {
                  router.push(`/${linkHrefs[index]}`)
                }, 250)
              }}
            >
              <div className="absolute w-full h-full bg-blue-500 -z-1 duration-250 submenu-background"/>
              {`Item ${index}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubMenu;
