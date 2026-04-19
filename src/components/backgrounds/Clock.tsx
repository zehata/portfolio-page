import React from "react";

import { getHandsRotation } from "@/lib/getHandsRotation";
import { throttle } from "lodash";
import dynamic from "next/dynamic"

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

const Clock = dynamic(
  () => Promise.resolve(() => {
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
    )
  }),
  {
    ssr: false,
  }
)

export default Clock;