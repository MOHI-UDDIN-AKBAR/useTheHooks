import { type ChangeEvent, useState, useTransition } from 'react';

const LIST_SIZE = 20000;

const UseTransitionHook: React.FC = () => {
	const [isPending, startTransition] = useTransition();
	const [input, setInput] = useState('');
	const [list, setList] = useState<string[]>([]);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setInput(value);

		startTransition(() => {
			const generatedList = Array.from({ length: LIST_SIZE }, () => value);
			setList(generatedList);
		});
	};

	return (
		<section className="container">
			<div className="input-group">
				<label htmlFor="random-text">
					<input
						type="text"
						name="random-text"
						id="random-text"
						value={input}
						onChange={handleInput}
					/>
				</label>
			</div>

			<div className="list-items">
				{isPending && <p className="loading">Loading...</p>}
				{!isPending &&
					list.map((item, i) => <div key={`${item} ${i}`}> {item}</div>)}
			</div>
		</section>
	);
};

export default UseTransitionHook;
