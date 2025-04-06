"use client";

import { debounce } from "lodash";
import React, { createContext } from "react";

interface GlobalState {
  viewportDimensions: {
    width: number;
    height: number;
  } | null;
}

export const GlobalContext = createContext<{
  state: GlobalState;
} | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [viewportDimensions, setViewportDimensions] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleResize = React.useMemo(
    () =>
      debounce(() => {
        setViewportDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }),
    [],
  );

  React.useEffect(() => {
    window.addEventListener("resize", () => handleResize());
    setViewportDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [handleResize]);

  return (
    <GlobalContext.Provider
      value={{
        state: {
          viewportDimensions,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
