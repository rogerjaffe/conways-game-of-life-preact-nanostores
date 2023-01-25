import { useRef } from "preact/compat";
import { useEffect } from "preact/hooks";

export const useInterval = (callback: any, delay: number) => {
  const intervalRef = useRef<number | undefined>(undefined);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;
};
