import classNames from "classnames";
import { HTMLAttributes } from "react";

export const SimpleButton = ({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="flex w-[2.5em] aspect-square justify-center items-center">
      <button
        className={classNames(
          "relative flex justify-center items-center w-[2em] aspect-square p-1 border-2 bg-background cursor-pointer duration-100 hover:w-[2.2em] hover:rotate-5 active:rotate-0 active:w-[2em]",
          className,
        )}
        {...props}
      ></button>
    </div>
  );
};

export default SimpleButton;
