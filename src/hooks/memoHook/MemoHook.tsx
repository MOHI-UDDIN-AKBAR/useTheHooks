import { memo, useEffect, useMemo, useState } from 'react';

const DisplayName = memo(({ person }: { person: { name: string } }) => {
	useEffect(() => {
		console.log('DisplayName re-rendered:', person.name);
	}, [person]);

	return <div className="display-name">{person.name}</div>;
});

const MemoHook = () => {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('Rifat');

	//  useMemo ensures the `person` object reference remains stable
	//  unless the `name` changes — preventing unnecessary child re-renders.
	const person = useMemo(() => ({ name }), [name]);

	const incrementCount = () => setCount((prev) => prev + 1);
	const changeName = () =>
		setName((prev) => (prev === 'Rifat' ? 'John' : 'Rifat'));

	return (
		<section className="memo-hook">
			<header className="memo-hook__header">
				<h1 className="memo-hook__count">Count: {count}</h1>
			</header>

			<div className="memo-hook__controls">
				<button type="button" className="btn" onClick={incrementCount}>
					Increment
				</button>

				<button type="button" className="btn" onClick={changeName}>
					Toggle Name
				</button>
			</div>

			{/* DisplayName only re-renders when `name` changes */}
			<DisplayName person={person} />
		</section>
	);
};

export default MemoHook;
