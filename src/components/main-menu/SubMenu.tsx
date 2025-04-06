import classNames from "classnames";
import React from "react";

export const SubMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  const [subMenuSelectorPosition, setMenuSelectorPosition] = React.useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const hoverSubMenu = React.useCallback((event: React.PointerEvent) => {
    const subMenuPosition = event.currentTarget.getBoundingClientRect();
    setMenuSelectorPosition({
      x: subMenuPosition.x,
      y: subMenuPosition.y,
      width: subMenuPosition.width,
      height: subMenuPosition.height,
    });
  }, []);

  return (
    <div className={classNames("absolute top-[-15rem] -right-5 w-[max(32rem,50vw)] h-[20rem] flex flex-col justify-end bg-blue-500 origin-[300%_100%] subMenu", {
      ["rotate-5"]: menuOpen,
    })}>
      <div className="absolute w-full h-full bg-white origin-bottom-right -rotate-5"></div>
      <div
        className="relative flex ml-4 mb-4"
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
  );
};

export default SubMenu;
