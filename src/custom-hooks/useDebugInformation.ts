import { isEqual } from "lodash";
import { useRef } from "react";
import { useRenderCount } from "./useRenderCount";

type ValueChange<T> = {
  previous: T;
  current: T;
};

type ValueChangesType<T> = Partial<Record<keyof T, ValueChange<T>>>;

type DebugInfo<T> = {
  renderedQuantity: number;
  timeSinceLastRender: number;
  lastRenderTimestamp: number;
} & { changesProps: ValueChangesType<T> };

export const useDebugInformation = <T extends Record<string, any>>(
  value: T,
): DebugInfo<T> => {
  const { renderedQuantity } = useRenderCount();
  const lastRenderTimestamp = useRef(Date.now());
  const previousValue = useRef(value);
  const changesRef = useRef<ValueChangesType<T>>({});

  const now = Date.now();
  const timeSinceLastRender = now - lastRenderTimestamp.current;

  if (!isEqual(value, previousValue.current)) {
    const changedProps: ValueChangesType<T> = {};

    const allKeys = Object.keys({
      ...previousValue.current,
      ...value,
    }) as (keyof T)[];

    console.log(allKeys);

    for (const key of allKeys) {
      if (value[key] !== previousValue.current[key]) {
        changedProps[key] = {
          previous: previousValue.current[key],
          current: value[key],
        };
      }
    }

    if (Object.keys(changedProps).length > 0) {
      changesRef.current = changedProps;
    }

    previousValue.current = value;
  }

  lastRenderTimestamp.current = now;

  return {
    renderedQuantity,
    timeSinceLastRender,
    lastRenderTimestamp: now,
    changesProps: changesRef.current,
  };
};
