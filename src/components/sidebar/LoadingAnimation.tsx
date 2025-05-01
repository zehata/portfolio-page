import classNames from "classnames";

export const LoadingAnimation = ({
  className
}: {
  className?: string;
}) => {
  return <div className={classNames("relative w-20 h-20 bg-red-800 flex justify-center items-center p-1 border-2 border-black rounded-md", className)}>
    <div className="absolute w-1 h-full bg-black opacity-50"></div>
    <div className="relative w-full h-full">
      <div className="absolute w-1/2 h-full bg-white border-black border"></div>
      <div className="absolute w-1/2 left-1/2 h-full bg-white border-black border"></div>
      <div className="absolute w-1/2 h-full bg-white border-black border animate-[2s_linear_flip_infinite]"></div>
    </div>
  </div>
}

export default LoadingAnimation;