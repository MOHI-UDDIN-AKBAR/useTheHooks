import { useState } from 'react';
import { useEventListener } from '../custom-hooks/useEventListener';

const EventListenerComponent: React.FC = () => {
	const [key, setKey] = useState('You have not typed yet.');
	useEventListener('keypress', (e) => {
		setKey(e.key);
	});

	return (
		<div>
			<h1>Last Key: {key}</h1>
		</div>
	);
};

export default EventListenerComponent;
