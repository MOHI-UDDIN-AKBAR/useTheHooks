import useArray from '../custom-hooks/useArray';

const ArrayComponent = () => {
	const { array, push, update, remove, filter, set, clearElements } = useArray([
		1, 2, 3, 4, 5,
	]);
	return (
		<div>
			<h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
				{array?.join(', ').toString()}
			</h1>
			<div className="array-controls">
				<button type="button" className="btn" onClick={() => push(7)}>
					Add 7
				</button>
				<button type="button" className="btn" onClick={() => update(1, 9)}>
					Change Second Element to 9
				</button>
				<button type="button" className="btn" onClick={() => remove(1)}>
					remove Second Element
				</button>
				<button
					type="button"
					className="btn"
					onClick={() => filter((v) => v < 4)}
				>
					Keep Numbers Less Than 4
				</button>
				<button type="button" className="btn" onClick={() => set([1, 2])}>
					Set to 1, 2
				</button>
				<button type="button" className="btn" onClick={clearElements}>
					Clear
				</button>
			</div>
		</div>
	);
};

export default ArrayComponent;
