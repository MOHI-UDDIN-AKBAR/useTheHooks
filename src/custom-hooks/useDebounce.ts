import { useEffect } from "react";
import useTimeout from "./useTimeout";

type UseDebounceOptions = {
  callback: () => void;
  delay?: number;
  dependency: [number];
};

export const useDebounce = ({
  callback,
  delay = 2000,
  dependency,
}: UseDebounceOptions) => {
  const { reset, clear } = useTimeout({ callback, resetDuration: delay });
  useEffect(() => reset(), [...dependency, reset]);
  useEffect(() => clear(), [clear]);
};
