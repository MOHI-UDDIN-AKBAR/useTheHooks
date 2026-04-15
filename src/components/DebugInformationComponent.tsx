import { useState } from 'react';
import { useDebugInformation } from '../custom-hooks/useDebugInformation';

const DebugInformationComponent: React.FC = () => {
	const [isToggled, setToggle] = useState(false);
	const [count, setCount] = useState(0);

	const debugInfo = useDebugInformation({ isToggled, count });
	return (
		<div>
			<p> Boolean Value : {isToggled.toString()}</p>
			<p>Count : {count}</p>
			<p>Changes : {JSON.stringify(debugInfo, null, 20)}</p>
			<button
				type="button"
				className="btn"
				onClick={() => setToggle((prev) => !prev)}
			>
				Toggle
			</button>
			<button
				type="button"
				className="btn"
				onClick={() => setCount((prev) => prev + 1)}
			>
				Increment
			</button>
		</div>
	);
};

export default DebugInformationComponent;
