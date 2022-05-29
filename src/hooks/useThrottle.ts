import _, { throttle } from "lodash";
import { useCallback, useEffect } from "react";


const useThrottle = <T>(cb: (newValue: T) => void, ms: number, value: T) => {
  const throttled = useCallback(
    throttle((newValue) => cb(newValue), ms),
    []
  );

  useEffect(() => throttled(value), [value]);
}

export default useThrottle;