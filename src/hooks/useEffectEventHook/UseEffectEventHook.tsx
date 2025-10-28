import { useEffect, useEffectEvent, useState } from 'react';

const UseEffectEventHook: React.FC = () => {
	const [name, setName] = useState('');
	const [count, setCount] = useState(0);

	const logName = useEffectEvent(() => {
		console.log('Current Name : ', name);
	});

	useEffect(() => {
		console.log('Count changed to : ', count);
		logName();
	}, [count]);

	return (
		<section>
			<div className="input-group">
				<label htmlFor="name">Name : </label>
				<input
					type="text"
					name="name"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<h1 className="counter"> {count}</h1>
			<button
				type="button"
				className="btn"
				onClick={() => setCount((prev) => prev + 1)}
			>
				increment
			</button>
		</section>
	);
};

export default UseEffectEventHook;
