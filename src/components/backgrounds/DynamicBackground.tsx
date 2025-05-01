import classNames from "classnames";

const backgrounds: Record<string, {
  align: "top left" | "bottom";
  base: string;
  label?: string;
}> = {
  "about": {
    align: "bottom",
    base: "/dynamic-backgrounds/base/about-background.png",
  },
  "blogs": {
    align: "top left",
    base: "/dynamic-backgrounds/base/article-background.png",
    label: "/dynamic-backgrounds/label/devblog.svg"
  },
  "projects": {
    align: "top left",
    base: "/dynamic-backgrounds/base/article-background.png",
    label: "/dynamic-backgrounds/label/projects.svg"
  },
} as const

export type DynamicBackgroundName = keyof typeof backgrounds 

export const DynamicBackground = ({
  name
}: {
  name: DynamicBackgroundName;
}) => {
  return <div className="w-[max(100vw,160vh)] h-[max(100vh,62.5vw)] dynamic-background animate-[2s_ease_delayed-fade-in]">
    <div className={classNames("absolute w-[max(100vw,160vh)] h-[max(100vh,62.5vw)] bg-cover", {
      ["top-0 left-0"]: backgrounds[name].align === "top left",
      ["bottom-0 left-[calc(50vw-max(50vw,80vh))]"]: backgrounds[name].align === "bottom",
    })}
      style={{
        backgroundImage: `url('${backgrounds[name].base}')`,
      }}
    ></div>
    {backgrounds[name].label && <img className="absolute w-[max(10vw,16vh)] top-[max(5vh,3.125vw)] left-[max(4vw,6.4vh)] transform-[matrix3d(1.6945,-0.5087,1.2874,0.001,1.3841,1.038,-0.9336,0.001,0.0255,1.5901,1.3115,0,0,0,0,1)]" src={backgrounds[name].label}/>}
    <div className="absolute top-0 left-0 w-full h-full bg-black background-image-darken"></div>
  </div>
}

export default DynamicBackground;