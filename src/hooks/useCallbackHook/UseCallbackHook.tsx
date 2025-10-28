import { useCallback, useEffect, useMemo, useState } from 'react';
import './UseCallbackHook.css';

const ListItem = ({
	getItems,
}: {
	getItems: (incrementBy: number) => number[];
}) => {
	const [items, setItems] = useState<number[]>([]);

	useEffect(() => {
		setItems(getItems(1));
	}, [getItems]);

	return (
		<div className="show-numbers">
			{items?.map((item) => (
				<div className="number" key={item}>
					{item}
				</div>
			))}
		</div>
	);
};

const UseCallbackHook = () => {
	const [num, setNum] = useState('1');
	const [isDark, setIsDark] = useState(false);

	// const getNumbers = useCallback(
	// 	(incrementBy: number) => {
	// 		return Array.from({ length: 3 }, (_, i) => i + Number(num) + incrementBy);
	// 	},
	// 	[num],
	// );

	/**
	 * In React 19, the new React Compiler (when enabled)
	 * can automatically memoize stable functions and objects.
	 * So, in many cases, you no longer need to manually wrap
	 * functions like this in `useCallback`.
	 */
	const getNumbers = (incrementBy: number) =>
		Array.from({ length: 3 }, (_, i) => i + Number(num) + incrementBy);

	const toggleTheme = () => setIsDark((prev) => !prev);

	// const classes = useMemo(() => {
	// 	return isDark ? 'bg-color' : '';
	// }, [isDark]);

	/**
	 * In React 19, simple derived values like this
	 * don’t require `useMemo` — the compiler can memoize
	 * or optimize them automatically where needed.
	 */
	const classes = isDark ? 'bg-color' : '';

	return (
		<section className={`${classes} container`}>
			<div className="input-group">
				<label htmlFor="number" className="input-label">
					<input
						type="number"
						name="number"
						id="number"
						className="input-field"
						value={num}
						onChange={(e) => setNum(e.target.value)}
					/>
				</label>
			</div>
			<button
				type="button"
				className="toggle-theme__button btn"
				onClick={toggleTheme}
			>
				Toggle Theme
			</button>
			<ListItem getItems={getNumbers} />
		</section>
	);
};

export default UseCallbackHook;
