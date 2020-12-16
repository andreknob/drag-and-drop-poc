import { useEffect, useMemo, useRef } from "react";

function callFn(fn, args) {
    if (typeof fn === 'function') {
        fn(...args);
    }
}

function useDebounce(fn, duration) {
    const timeoutRef = useRef();
    
    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    });

    return useMemo(() => {
        clearTimeout(timeoutRef.current);

        return function debounced(...args) {
            if (!duration) {
                return callFn(fn, args);           
            }

            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                callFn(fn, args);           
            }, duration);
        };
    }, [fn, duration]);
}

export default useDebounce;