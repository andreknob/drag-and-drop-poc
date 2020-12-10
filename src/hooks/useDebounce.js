import { useEffect, useMemo, useRef } from "react";

function useDebounce(fn, duration) {
    const timeoutRef = useRef();
    
    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    });

    return useMemo(() => {
        clearTimeout(timeoutRef.current);

        return function debounced(...args) {
            clearTimeout(timeoutRef.current);
    
            timeoutRef.current = setTimeout(() => {
                if (typeof fn === 'function') {
                    fn(...args);
                }
            }, duration);
        };
    }, [fn, duration]);
}

export default useDebounce;