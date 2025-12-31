"use client";

import React from "react";
import classNames from "classnames";
import { throttle } from "lodash";
import { usePathname } from "next/navigation";
import { getHandsRotation } from "@/lib/getHandsRotation";

const getCurrentHandsRotation = () => {
  const currentDate = new Date();
  return getHandsRotation(currentDate);
};

const getAnimateClock = (
  ref: React.RefObject<number | null>,
  setHandsRotation: React.Dispatch<React.SetStateAction<[number, number]>>,
) => {
  const animateClock = throttle(() => {
    setHandsRotation(getCurrentHandsRotation);
    ref.current = requestAnimationFrame(animateClock);
  }, 10000);
  return animateClock;
};

const BaseBackground = () => {
  const pathname = usePathname();

  const [shiftRight, setShiftRight] = React.useState<{
    prev: boolean | null;
    current: boolean | null;
  }>({
    prev: null,
    current: null,
  });

  React.useEffect(() => {
    setShiftRight((shiftRight) => {
      return {
        prev: shiftRight.current,
        current: pathname.split("/")[1] === "contact",
      };
    });
  }, [pathname]);

  const requestRef = React.useRef<number | null>(null);
  const [handsRotation, setHandsRotation] = React.useState<[number, number]>(
    getCurrentHandsRotation,
  );

  React.useEffect(() => {
    const animateClock = getAnimateClock(requestRef, setHandsRotation);
    requestRef.current = requestAnimationFrame(animateClock);
    return () => {
      if (!requestRef.current) return;
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      className={classNames(
        "absolute flex justify-end -z-2 no-view-transition",
        {
          ["right-[min(-200vw/3,-3200dvh/27)]"]: !shiftRight.current,
          ["right-0"]: shiftRight.current,
          ["animate-[1s_ease-in-out_base-background-shift-left]"]:
            !shiftRight.current && shiftRight.prev,
          ["animate-[1s_ease-in-out_base-background-shift-right]"]:
            shiftRight.current && shiftRight.prev === false,
        },
      )}
    >
      <div className="absolute w-[calc(500vw/3)] h-[100dvh] flex justify-end items-center">
        <div className="absolute w-[max(500vw/3,8000dvh/27)] h-[max(56.25vw,100dvh)] bg-cover bg-[url('https://images.zehata.dev/public/library-background.webp')]">
          <div className="absolute w-[max(500vw/3,8000dvh/27)] h-[max(56.25vw,100dvh)] top-0 left-0 lamp-light bg-black opacity-20 z-1"></div>
          <div className="absolute w-[4.8%] aspect-square rounded-full top-[16.9%] left-[78.1%] z-1 clock-transform">
            <div className="absolute w-full h-full rotate-180">
              <div
                className="hour-hand absolute bg-black left-[calc(49%)] top-[calc(39%)] w-[2%] h-[40%] origin-[50%_25%]"
                style={{
                  rotate: `${handsRotation[0]}turn`,
                }}
              ></div>
              <div
                className="minute-hand absolute bg-black left-[calc(49%)] top-[calc(39%)] w-[2%] h-[50%] origin-[50%_20%]"
                style={{
                  rotate: `${handsRotation[1]}turn`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseBackground;
