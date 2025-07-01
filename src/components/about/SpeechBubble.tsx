import classNames from "classnames";
import React from "react";

const SpeechBubble = ({
  windowWidth,
  dialog = "",
  proceed,
}: {
  windowWidth: number | null;
  dialog?: React.ReactNode;
  proceed: () => void;
}) => {
  const previousDialogText = React.useRef<React.ReactNode>(null);
  const [shouldExpand, setShouldExpand] = React.useState<boolean>(false);
  const [isProceeding, setProceeding] = React.useState<boolean>(false);
  const proceedTimer = React.useRef<NodeJS.Timeout>(null);

  React.useEffect(() => {
    if (dialog === previousDialogText.current) return;
    previousDialogText.current = dialog;
    setShouldExpand(false);
    setProceeding(false);
    setTimeout(() => {
      setShouldExpand(true);
      proceedTimer.current = setTimeout(() => {
        proceedTimer.current = setTimeout(() => {
          proceed();
          setProceeding(true);
        }, 250);
        setProceeding(true);
      }, 2000);
    }, 500);

    return () => {
      if (!proceedTimer.current) return;
      clearTimeout(proceedTimer.current);
    };
  }, [proceed, dialog]);

  const skip = React.useCallback(() => {
    setProceeding(true);
    proceed();
    if (!proceedTimer.current) return;
    clearTimeout(proceedTimer.current);
  }, [proceed]);

  return (
    <>
      <div
        className="absolute left-[calc(12vw+0rem)] bottom-[5rem] w-[200px] h-[200px] origin-[-10%_85%] speech-bubble"
        style={{
          transition: shouldExpand
            ? "500ms cubic-bezier(.21,1.47,.7,.95)"
            : "none",
          transform:
            shouldExpand && windowWidth
              ? `scale3d(${(0.5 * windowWidth + 50) / 200},1.2,1)`
              : "scale3d(0.001,0.001,1)",
        }}
      >
        <div
          className="absolute w-[200px] h-[200px] bg-black -z-1"
          style={{
            transform: shouldExpand
              ? "matrix3d(-0.9,-0.26,0,0.0012,0.238,-0.973,0,-0.0001,0,0,1,0,0,-3,0,1)"
              : "matrix3d(-1,0.1,0,0,0,-1,0,0,0,0,1,0,0,-3,0,1)",
            transition: shouldExpand ? "250ms ease-out" : "none",
          }}
        ></div>
        <div
          className="absolute w-[200px] h-[200px] bg-background -z-1"
          style={{
            transform: shouldExpand
              ? "matrix3d(0.98,0.0349,0,-0.0012,-0.0349,0.98,0,0.0004,0,0,1,0,2,0,0,1)"
              : "matrix3d(1,0,0,-0.001,0,1,0,0,0,0,1,0,0,0,0,1)",
            transition: shouldExpand ? "250ms ease-out 250ms" : "none",
          }}
        ></div>
      </div>
      <div
        className={classNames(
          "absolute left-[calc(21vw-0rem)] bottom-[7rem] w-[calc(50vw-3rem)] h-[11.5rem] flex flex-col justify-between dialog-text text-sm md:text-base",
          {
            ["opacity-0"]: !shouldExpand,
          },
        )}
        style={{
          animation: shouldExpand ? "1000ms ease delayed-fade-in" : "",
        }}
      >
        <div className="relative h-full flex-shrink overflow-y-auto">
          {dialog}
        </div>
        <div className="relative h-10 flex-shrink-0">
        <div
          className={classNames(
            "absolute w-12 h-10 overflow-hidden",
            {
              ["right-0"]: shouldExpand && !isProceeding,
              ["right-5"]: !shouldExpand,
              ["-right-5 opacity-0"]: isProceeding,
            },
          )}
          style={{
            transition: shouldExpand
              ? isProceeding
                ? "250ms ease-out"
                : "250ms ease-out 500ms"
              : "none",
          }}
          onClick={skip}
        >
          <div
            className={classNames(
              "absolute top-[calc(1.25rem-2px)] right-2 h-1 bg-foreground",
              {
                ["w-0"]: shouldExpand,
                ["w-10"]: !shouldExpand,
              },
            )}
            style={{
              transition: shouldExpand ? "1000ms ease-out 1000ms" : "none",
            }}
          ></div>
          <div className="absolute right-3 border-t-4 border-r-4 w-10 h-10 rotate-45"></div>
        </div>

        </div>
      </div>
    </>
  );
};

export default SpeechBubble;
