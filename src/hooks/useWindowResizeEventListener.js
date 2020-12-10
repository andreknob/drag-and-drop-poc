import { useCallback, useLayoutEffect } from 'react';
import useDebounce from './useDebounce';

function useWindowResizeEventListener(fn) {
    const onResize = useCallback(function () {
        if (typeof fn === 'function') {
            fn(window.innerWidth, window.innerHeight);
        }
    }, [fn]);

    const debounced = useDebounce(onResize, 50);

    useLayoutEffect(() => {
        onResize();
        window.addEventListener('resize', debounced);

        return () => window.removeEventListener('resize', debounced);
    }, [onResize, debounced]);

    return null;
}

export default useWindowResizeEventListener;