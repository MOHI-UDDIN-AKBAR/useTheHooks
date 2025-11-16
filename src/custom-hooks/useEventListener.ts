import { useEffect, useRef } from 'react';

type ExtendedWindowEventMap = WindowEventMap & {
	online: Event;
	offline: Event;
};

export const useEventListener = <
	K extends T extends Window
		? keyof ExtendedWindowEventMap
		: T extends Document
			? keyof DocumentEventMap
			: T extends HTMLElement
				? keyof HTMLElementEventMap
				: T extends MediaQueryList
					? 'change'
					: never,
	T extends Document | Window | HTMLElement | MediaQueryList = Document,
>(
	eventType: K,
	handler: (
		event: T extends MediaQueryList
			? MediaQueryListEvent
			: T extends Window
				? ExtendedWindowEventMap[K & keyof ExtendedWindowEventMap]
				: T extends Document
					? DocumentEventMap[K & keyof DocumentEventMap]
					: T extends HTMLElement
						? HTMLElementEventMap[K & keyof HTMLElementEventMap]
						: Event,
	) => void,
	element: T | null = document as T,
) => {
	const callbackRef = useRef(handler);

	useEffect(() => {
		callbackRef.current = handler;
	}, [handler]);

	useEffect(() => {
		const targetElement = element ?? document;

		if (!targetElement.addEventListener) return;

		const listener = (event: Event) => callbackRef.current(event as any);

		targetElement.addEventListener(eventType, listener as EventListener);

		return () => {
			targetElement.removeEventListener(eventType, listener as EventListener);
		};
	}, [element, eventType]);
};
