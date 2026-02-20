import { useState } from 'react';
import { useDebounce } from '../custom-hooks/useDebounce';

const DebounceComponent: React.FC = () => {
	const [count, setCount] = useState(10);
	useDebounce({
		callback: () => alert(count),
		delay: 2000,
		dependency: [count],
	});
	return (
		<div>
			<p>Count : {count}</p>
			<button
				type="button"
				className="btn"
				onClick={() => {
					setCount((prev) => prev + 1);
				}}
			>
				Increment
			</button>
		</div>
	);
};

export default DebounceComponent;
