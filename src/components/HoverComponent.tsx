import { useRef } from 'react';
import { useHover } from '../custom-hooks/useHover';

const HoverComponent: React.FC = () => {
	const elementRef = useRef<HTMLDivElement>(null);

	const isHoverOn = useHover(elementRef);

	return (
		<div
			ref={elementRef}
			style={{
				width: 200,
				height: 200,
				backgroundColor: isHoverOn ? 'green' : 'yellowgreen',
			}}
		>
			HoverComponent
		</div>
	);
};

export default HoverComponent;
