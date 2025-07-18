import classNames from "classnames";

export const portraitMoods = ["neutral"] as const;
export type PortraitMood = (typeof portraitMoods)[number];

interface Position {
  width: number;
  x: number;
  y: number;
}

export const portraits: Record<
  (typeof portraitMoods)[number],
  {
    image: string;
    mouthPos: Position;
    eyesPos: Position;
  }
> = {
  neutral: {
    image: "/portraits/neutral",
    mouthPos: {
      width: 72,
      x: 263,
      y: 95,
    },
    eyesPos: {
      width: 208,
      x: 232,
      y: 212,
    },
  },
};

export const DialogPortrait = ({
  className,
  mood,
  speaking,
}: {
  className?: string;
  mood: PortraitMood;
  speaking?: boolean;
}) => {
  return (
    <div
      className={className}
      // style={{
      //   animation: "500ms slide-in-left",
      // }}
    >
      <img
        alt=""
        src={`https://images.zehata.dev/public${portraits[mood].image}/face.webp`}
        className="absolute w-full bottom-0"
      />
      <div
        className="absolute"
        style={{
          width: portraits[mood].mouthPos.width,
          left: portraits[mood].mouthPos.x,
          bottom: portraits[mood].mouthPos.y,
        }}
      >
        <img
          alt=""
          className="absolute w-full left-0 bottom-0"
          src={`https://images.zehata.dev/public${portraits[mood].image}/mouth-closed.webp`}
        />
        <img
          alt=""
          className={classNames("absolute w-full left-0 bottom-0", {
            ["portrait-mouth-1"]: speaking,
            ["opacity-0"]: !speaking,
          })}
          src={`https://images.zehata.dev/public${portraits[mood].image}/mouth-1.webp`}
        />
        <img
          alt=""
          className={classNames("absolute w-full left-0 bottom-0", {
            ["portrait-mouth-2"]: speaking,
            ["opacity-0"]: !speaking,
          })}
          src={`https://images.zehata.dev/public${portraits[mood].image}/mouth-2.webp`}
        />
      </div>
      <div
        className="absolute"
        style={{
          width: portraits[mood].eyesPos.width,
          left: portraits[mood].eyesPos.x,
          bottom: portraits[mood].eyesPos.y,
        }}
      >
        <img
          alt=""
          className="absolute w-full left-0 bottom-0 opacity-25"
          src={`https://images.zehata.dev/public${portraits[mood].image}/eyes.webp`}
        />
        <img
          alt=""
          className="absolute w-full left-0 bottom-0 eyes-closed"
          src={`https://images.zehata.dev/public${portraits[mood].image}/eyes-closed.webp`}
        />
      </div>
    </div>
  );
};

export default DialogPortrait;
