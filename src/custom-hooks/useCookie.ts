import { useCallback, useEffect, useState } from "react";

type CookieOptions = {
  maxAge?: number;
  sameSite?: "Lax" | "Strict" | "None";
  expires?: string | Date;
  path?: string;
  domain?: string;
};

const formatCookieOptions = (options?: CookieOptions) => {
  if (!options) return "";

  return Object.entries(options)
    .map(([key, value]) => `${key}=${value};`)
    .join(" ");
};
const parseCookie = (): Record<string, string> | undefined => {
  const cookies = document.cookie;
  if (!cookies) return;

  return Object.fromEntries(
    cookies.split("; ").map((cookie) => cookie.split("=")),
  );
};

const setCookie = (
  key: string,
  defaultValue: string,
  cookieOptions?: ReturnType<typeof formatCookieOptions>,
) => {
  document.cookie = `${key}=${defaultValue}; secure; ${cookieOptions}`;
};

const removeCookieValue = (key: string, options?: CookieOptions) => {
  setCookie(key, "", formatCookieOptions({ ...options, expires: new Date(0) }));
};

export const useCookie = (
  key: string,
  defaultValue: string = "",
  options?: CookieOptions,
) => {
  const [value, setValue] = useState<string>(() => {
    const cookies = parseCookie();
    if (cookies?.[key]) return cookies[key];

    setCookie(key, defaultValue, formatCookieOptions(options));
    return defaultValue;
  });

  useEffect(() => {
    setCookie(key, value, formatCookieOptions(options));
  }, [key, value, options]);

  const deleteCookie = useCallback(() => {
    removeCookieValue(key, options);
    setValue("");
  }, [options, key]);

  const updateCookie = useCallback(
    (newValue: string) => {
      setCookie(key, newValue, formatCookieOptions(options));
      setValue(newValue);
    },
    [key, options],
  );

  return { value, setValue: updateCookie, deleteCookie };
};
