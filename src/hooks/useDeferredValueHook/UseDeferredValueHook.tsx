import {
	type ChangeEvent,
	useDeferredValue,
	useEffect,
	useMemo,
	useState,
} from 'react';

const LIST_SIZE = 20000;

const List = ({ input }: { input: string }) => {
	const deferredValue = useDeferredValue(input);

	const list = useMemo(() => {
		return Array.from({ length: LIST_SIZE }, (_, i) => (
			<div key={i}>{deferredValue}</div>
		));
	}, [deferredValue]);

	useEffect(() => {
		console.log(`Input : ${input}\nDeferred : ${deferredValue}`);
	}, [deferredValue, input]);

	return <div>{list.length ? list.map((item) => item) : null}</div>;
};

const UseDeferredValueHook: React.FC = () => {
	const [input, setInput] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};
	return (
		<section className="container">
			<div className="input-group">
				<label htmlFor="text">
					<input
						type="text"
						name="text"
						id="text"
						value={input}
						onChange={handleChange}
					/>
				</label>
			</div>
			<List input={input} />
		</section>
	);
};

export default UseDeferredValueHook;
