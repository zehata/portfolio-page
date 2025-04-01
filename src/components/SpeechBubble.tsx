import React from "react";

export const SpeechBubble = ({
  windowWidth,
  dialog = "",
}: {
  windowWidth: number;
  dialog?: string;
}) => {
  const bubble = React.useRef<HTMLDivElement>(null);
  const text = React.useRef<HTMLDivElement>(null);
  const previousDialogText = React.useRef<string>("");

  const setSpeechBubbleWidth = React.useCallback(() => {
    if (!bubble.current) return;
    bubble.current.style.transform = `scale3d(${(0.7*windowWidth-30)/200},1.2,1)`
  }, [windowWidth])

  React.useEffect(() => {
    if (dialog === previousDialogText.current || !bubble.current || !text.current) return;
    previousDialogText.current = dialog;
    bubble.current.style.transition = "none";
    bubble.current.style.transform = `scale3d(0.01,0.01,1)`
    text.current.style.transition = "none";
    text.current.style.opacity = "0";
    setTimeout(() => {
      bubble.current!.style.transition = "500ms cubic-bezier(.21,1.47,.7,.95)";
      setSpeechBubbleWidth();
      text.current!.style.transition = "250ms ease-out 500ms";
      text.current!.style.opacity = "1";
    })
  }, [setSpeechBubbleWidth, dialog])

  return <>
    <div
      ref={bubble}
      className="absolute left-[calc(10vw+5rem)] bottom-[3rem] w-[200px] h-[200px] origin-[-10%_100%]"
      style={{
        transform: `scale3d(${(0.7*windowWidth-30)/200},1.2,1)`,
      }}
    >
      <div className="absolute w-[200px] h-[200px] bg-black transform-[matrix3d(-0.9925,-0.1219,0,0.0005,0.1219,-0.9925,0,0.0005,0,0,1,0,0,0,0,1)] -z-1"></div>
      <div className="absolute w-[200px] h-[200px] bg-white transform-[matrix3d(-0.9994,-0.0349,0,0.0004,-0.0349,0.9994,0,-0.0004,0,0,1,0,5,0,0,1)] -z-1"></div>
    </div>
    <div ref={text} className="absolute left-[calc(23vw+4rem)] bottom-[4rem] w-[calc(63vw-2rem)] h-[13rem]">{dialog}</div>
  </>
}

export default SpeechBubble;