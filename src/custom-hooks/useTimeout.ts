import { useCallback, useEffect, useRef } from 'react';

type UseTimeoutOptions = {
	callback: () => void;
	resetDuration?: number;
};

const useTimeout = ({ callback, resetDuration = 2000 }: UseTimeoutOptions) => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = useCallback(() => {
		timeoutRef.current = setTimeout(() => {
			callbackRef.current();
			timeoutRef.current = null;
		}, resetDuration);
	}, [resetDuration]);

	const clear = useCallback(() => {
		if (!timeoutRef.current) return;
		clearTimeout(timeoutRef.current);
		timeoutRef.current = null;
	}, []);

	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	useEffect(() => {
		set();
		return clear;
	}, [set, clear]);

	return { reset, clear };
};

export default useTimeout;
