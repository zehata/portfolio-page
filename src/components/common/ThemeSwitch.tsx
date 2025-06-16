import React from "react";
import classNames from "classnames";
import Mousetrap from "mousetrap";

export type Theme = "auto" | "light" | "dark";

export const ThemeSwitch = ({
  className,
  on = "auto",
  toggle,
  ...props
}: {
  className?: string;
  on?: Theme;
  toggle?: () => void;
} & React.HTMLAttributes<HTMLButtonElement>) => {
  const switchElement = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!switchElement.current) return;

    const targetElement = switchElement.current;

    if (toggle) {
      Mousetrap(targetElement).bind("space", toggle);
      Mousetrap(targetElement).bind("enter", toggle);
    }

    return () => {
      Mousetrap(targetElement).unbind("space");
      Mousetrap(targetElement).unbind("enter");
    };
  }, [switchElement, toggle]);

  return (
    <button
      ref={switchElement}
      className={classNames(
        "aspect-[3] rounded-full duration-500 overflow-hidden inset-shadow-sm inset-shadow-black/50 cursor-pointer",
        className,
      )}
      {...props}
    >
      <div className="absolute top-0 left-0 w-full h-full flex items-center -z-1">
        <div
          className={classNames(
            "absolute h-full aspect-square p-[4%] duration-500",
            {
              ["left-0"]: on == "light" || on === "auto",
              ["left-2/3"]: on == "dark",
            },
          )}
        >
          <div className="relative w-full h-full">
            <div
              className={classNames(
                "absolute -top-7/2 -left-7/2 w-[800%] h-[800%] duration-500",
                {
                  ["bg-blue-500"]: on === "light",
                  ["bg-slate-500"]: on === "auto",
                  ["bg-slate-900"]: on === "dark",
                },
              )}
            ></div>
            <div
              className={classNames(
                "absolute -top-3/2 -left-3/2 w-[400%] h-[400%] rounded-full duration-500",
                {
                  ["bg-blue-400"]: on === "light",
                  ["bg-slate-800"]: on === "dark",
                },
              )}
            ></div>
            <div
              className={classNames(
                "absolute -top-full -left-full w-[300%] h-[300%] rounded-full duration-500",
                {
                  ["bg-blue-300"]: on === "light",
                  ["bg-slate-700"]: on === "dark",
                },
              )}
            ></div>
            <div
              className={classNames(
                "absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rounded-full duration-500",
                {
                  ["bg-blue-200"]: on === "light",
                  ["bg-slate-600"]: on === "dark",
                },
              )}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full bg-amber-400 rounded-full z-2 overflow-hidden">
              <div
                className={classNames(
                  "absolute top-0 w-full h-full bg-neutral-300 rounded-full duration-500",
                  {
                    ["left-full"]: on === "light",
                    ["left-1/2"]: on === "auto",
                    ["left-0"]: on === "dark",
                  },
                )}
              >
                <div className="absolute top-3/7 left-1/5 w-1/3 aspect-square bg-neutral-400 rounded-full"></div>
                <div className="absolute top-4/7 left-3/5 w-1/5 aspect-square bg-neutral-400 rounded-full"></div>
                <div className="absolute top-1/7 left-1/3 w-1/5 aspect-square bg-neutral-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "absolute left-0 w-full h-[200%] ease-in-out duration-500",
            {
              ["top-[-100%]"]: on === "light",
              ["top-[-50%]"]: on === "auto",
              ["top-0"]: on === "dark",
            },
          )}
        >
          <div className="absolute top-1/12 left-1/4 w-1/16 bg-white star rotate-10"></div>
          <div className="absolute top-1/4 left-3/11 w-1/24 bg-white star rotate-40"></div>
          <div className="absolute top-1/6 left-1/8 w-1/24 bg-white star rotate-90"></div>
          <div className="absolute top-2/5 left-3/10 w-1/24 bg-white star rotate-40"></div>
          <div className="absolute top-3/8 left-1/5 w-1/24 bg-white star rotate-80"></div>
          <div className="absolute top-1/3 left-1/8 w-1/24 bg-white star rotate-20"></div>
          <div className="absolute top-1/8 left-5/12 w-1/24 bg-white star rotate-30"></div>
          <div className="absolute top-1/4 left-3/8 w-1/24 bg-white star rotate-60"></div>
          <div className="absolute top-1/3 left-5/12 w-1/24 bg-white star rotate-40"></div>
          <div className="absolute top-1/8 left-7/13 w-1/16 bg-white star rotate-50"></div>
          <div className="absolute top-1/3 left-7/13 w-1/24 bg-white star rotate-10"></div>
          <div className="absolute -bottom-1/10 -right-1/7 w-3/8 aspect-square bg-blue-200 rounded-full"></div>
          <div className="absolute -bottom-1/12 right-1/7 w-1/5 aspect-square bg-blue-200 rounded-full"></div>
          <div className="absolute -bottom-1/8 right-1/4 w-1/4 aspect-square bg-blue-200 rounded-full"></div>
          <div className="absolute -bottom-1/6 right-2/5 w-1/4 aspect-square bg-blue-200 rounded-full"></div>
          <div className="absolute -bottom-1/6 right-7/12 w-1/4 aspect-square bg-blue-200 rounded-full"></div>
          <div className="absolute -bottom-1/6 right-2/5 w-1/4 aspect-square bg-blue-200 rounded-full"></div>
          <div className="absolute -bottom-1/8 -right-1/8 w-1/3 aspect-square bg-white rounded-full"></div>
          <div className="absolute -bottom-1/12 right-1/6 w-1/8 aspect-square bg-white rounded-full"></div>
        </div>
        <div
          className={classNames(
            "absolute w-2/3 left-1/3 pr-[10%] text-center text-white duration-250",
            {
              ["opacity-0"]: on != "auto",
            },
          )}
        >{`AUTO`}</div>
      </div>
    </button>
  );
};

export default ThemeSwitch;
