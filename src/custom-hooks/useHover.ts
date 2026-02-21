import { type RefObject, useState } from 'react';
import { useEventListener } from './useEventListener';

export const useHover = <T extends HTMLElement | null>(ref: RefObject<T>) => {
	const [isHoverOn, setIsHoverOn] = useState(false);

	useEventListener(
		'mouseover',
		() => {
			setIsHoverOn(true);
		},
		ref.current,
	);

	useEventListener(
		'mouseout',
		() => {
			setIsHoverOn(false);
		},
		ref.current,
	);

	return isHoverOn;
};
