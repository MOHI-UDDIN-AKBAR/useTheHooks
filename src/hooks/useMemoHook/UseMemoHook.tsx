import { useEffect, useMemo, useState } from 'react';
import './UseMemoHook.css';

const slowFunction = (number: number) => {
	console.log('calling slow function');
	let sum = number;
	for (let i = 0; i <= 1000000000; i++) {
		sum += i;
	}
	return number * 5;
};

const UseMemoHook = () => {
	const [num, setNum] = useState('1');
	const [isDark, setIsDark] = useState(false);

	const classes = useMemo(() => (isDark ? 'bg-color' : ''), [isDark]);

	const doubleNumber = useMemo(() => {
		return slowFunction(Number(num));
	}, [num]);

	const toggleTheme = () => {
		setIsDark((prev) => !prev);
	};

	useEffect(() => {
		console.log('classes', classes);
	}, [classes]);

	useEffect(() => {
		console.log('Double Number', doubleNumber);
	}, [doubleNumber]);

	return (
		<section className="container">
			<div className="input-group">
				<label htmlFor="number" className="input-label">
					<input
						type="number"
						name="number"
						id="number"
						value={num}
						className="input-field"
						onChange={(e) => setNum(e.target.value)}
					/>
				</label>
			</div>
			<button
				type="button"
				className="input-toggle__button btn"
				onClick={toggleTheme}
			>
				Toggle Theme
			</button>
			<div className={`${classes} number-container`}>
				{num} {doubleNumber}
			</div>
		</section>
	);
};

export default UseMemoHook;
