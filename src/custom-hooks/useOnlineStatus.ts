import { useState } from 'react';
import { useEventListener } from './useEventListener';

export const useOnlineStatus = () => {
	const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

	useEventListener(
		'online',
		() => {
			setOnlineStatus(navigator.onLine);
		},
		window,
	);
	useEventListener(
		'offline',
		() => {
			setOnlineStatus(navigator.onLine);
		},
		window,
	);

	return { onlineStatus };
};
