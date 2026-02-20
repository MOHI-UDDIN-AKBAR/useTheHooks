import { useState } from 'react';
import useTimeout from '../custom-hooks/useTimeout';

const TimeoutComponent: React.FC = () => {
	const [count, setCount] = useState(10);
	const { reset, clear } = useTimeout({
		callback: () => {
			setCount(0);
		},
	});
	return (
		<div>
			<h1> {count}</h1>
			<div className="timeout-controls">
				<button
					type="button"
					className="btn"
					onClick={() => setCount((prev) => prev + 1)}
				>
					Increment
				</button>
				<button type="button" className="btn" onClick={clear}>
					Clear Timeout
				</button>
				<button type="button" className="btn" onClick={() => reset()}>
					Reset Timeout
				</button>
			</div>
		</div>
	);
};

export default TimeoutComponent;
