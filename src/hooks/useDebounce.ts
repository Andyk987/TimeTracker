import _, { debounce } from "lodash"
import { useCallback, useEffect } from "react"


const useDebounce = <T>(cb: (newValue: T) => void, ms: number = 1000, value?: T) => {
    const debouced = useCallback(
        debounce(cb, ms), []
    );

    useEffect(() => debouced(value), [value]);
};

export default useDebounce;