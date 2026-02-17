import { useLayoutEffect } from "react";
import { useMediaQuery } from "./useMediaQuery";
import { useLocalStorage } from "./useStorage";

export const useDarkMode = () => {
  const { isMatch } = useMediaQuery("prefers-color-scheme: dark");
  const { storedValue: isDark, setValue: setIsDark } = useLocalStorage(
    "isDark",
    isMatch,
  );

  useLayoutEffect(() => {
    document.body.style.backgroundColor = isDark ? "grey" : "#989791";
  }, [isDark]);

  return { isDark, setIsDark };
};
