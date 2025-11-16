import { useRef } from 'react';
import { useClickOutSide } from '../custom-hooks/useClickOutSide';

const ClickOutSideComponent: React.FC = () => {
	const elementRef = useRef<HTMLDivElement>(null);
	const { isOpen, setIsOpen } = useClickOutSide(elementRef);
	return (
		<div>
			<button type="button" className="btn" onClick={() => setIsOpen(true)}>
				Open
			</button>
			{isOpen ? (
				<div
					ref={elementRef}
					style={{
						width: '200px',
						height: '200px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'yellowgreen',
					}}
				>
					<p>Modal</p>
				</div>
			) : null}
		</div>
	);
};

export default ClickOutSideComponent;
