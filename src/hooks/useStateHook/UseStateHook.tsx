import { useState } from 'react';

const OPERATION_TYPE = {
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT',
	RESET: 'RESET',
} as const;

type OperationType = (typeof OPERATION_TYPE)[keyof typeof OPERATION_TYPE];

const Hook: React.FC = () => {
	const [count, setCount] = useState(0);

	const handleCount = (type: OperationType) => {
		switch (type) {
			case OPERATION_TYPE.DECREMENT: {
				setCount((prev) => prev - 1);
				break;
			}
			case OPERATION_TYPE.INCREMENT: {
				setCount((prev) => prev + 1);
				break;
			}
			case OPERATION_TYPE.RESET: {
				setCount(0);
				break;
			}
		}
	};

	return (
		<section>
			<h1> {count}</h1>
			<button
				type="button"
				className="btn"
				onClick={() => handleCount(OPERATION_TYPE.DECREMENT)}
			>
				Decrement
			</button>
			<button
				type="button"
				className="btn"
				onClick={() => handleCount(OPERATION_TYPE.RESET)}
			>
				Reset
			</button>
			<button
				type="button"
				className="btn"
				onClick={() => handleCount(OPERATION_TYPE.INCREMENT)}
			>
				Increment
			</button>
		</section>
	);
};

export default Hook;
