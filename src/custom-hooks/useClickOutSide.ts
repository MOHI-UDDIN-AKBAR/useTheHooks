import { useState } from 'react';
import { useEventListener } from './useEventListener';

export const useClickOutSide = <T>(ref: React.RefObject<T>) => {
	const [isOpen, setIsOpen] = useState(false);

	useEventListener('click', (event) => {
		if (Object.is(ref.current, event.target)) {
			setIsOpen(false);
		}
	});
	return { isOpen, setIsOpen };
};
