"use client";

import { debounce, isNull } from "lodash";
import React, { createContext } from "react";
import { Theme } from "../common/ThemeSwitch";
import classNames from "classnames";

interface GlobalState {
  themeState: {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  };
  viewportDimensions: {
    width: number;
    height: number;
  } | null;
}

export const GlobalContext = createContext<GlobalState | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = React.useState<Theme>("auto");

  React.useEffect(() => {
    const localStorageDarkMode = localStorage.getItem("theme");
    if (isNull(localStorageDarkMode)) {
      setTheme("auto");
      return;
    }
    setTheme(JSON.parse(localStorageDarkMode));
  }, [setTheme]);

  React.useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(theme));
  }, [theme]);

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
        themeState: {
          theme,
          setTheme,
        },
        viewportDimensions,
      }}
    >
      <div className={classNames("theme", theme)}>{children}</div>
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
