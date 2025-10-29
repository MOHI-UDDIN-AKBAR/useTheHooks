import { type FormEvent, useState } from 'react';

type Item = {
	id: string;
	value: string;
};

const UseFormStatusHook: React.FC = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputValue.trim()) return;
		setIsPending(true);
		const newItem = (await createItem(inputValue)) as Item;
		setItems((prev) => [...prev, newItem]);
		setIsPending(false);
		setInputValue('');
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="title">
						Title :{' '}
						<input
							type="text"
							name="title"
							id="title"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</label>
				</div>
				<button
					type="submit"
					className="btn"
					disabled={isPending}
					style={{
						borderColor: isPending ? '#949494' : '#877460',
					}}
				>
					Create
				</button>
			</form>
			<div className="items">
				{items.length
					? items.map(({ id, value }) => <div key={id}> {value}</div>)
					: null}
			</div>
		</>
	);
};

export default UseFormStatusHook;

function createItem(value: string) {
	return wait({ id: crypto.randomUUID(), value }, 2000);
}

function wait(newTodo: { id: string; value: string }, duration: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(newTodo);
		}, duration);
	});
}
