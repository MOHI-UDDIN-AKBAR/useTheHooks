import { useState } from 'react';
import { useFormStatus } from 'react-dom';

type Item = {
	id: string;
	value: string;
};

function createItem(value: string): Promise<Item> {
	const newItem = { id: crypto.randomUUID(), value };
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(newItem);
		}, 2000);
	});
}

const Button: React.FC = () => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className="btn"
			disabled={pending}
			style={{
				borderColor: pending ? '#949494' : '#877460',
			}}
		>
			{pending ? 'Creating...' : 'Create'}
		</button>
	);
};
const UseFormStatusHook: React.FC = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = async (formData: FormData) => {
		const { item } = Object.fromEntries(formData.entries()) as { item: string };
		if (!item.trim()) return;

		const newItem = await createItem(item);
		setItems((prev) => [...prev, newItem]);
		setInputValue('');
	};
	return (
		<>
			<form action={handleSubmit}>
				<div className="input-group">
					<label htmlFor="item">
						Title :{' '}
						<input
							type="text"
							name="item"
							id="title"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</label>
				</div>
				<Button />
			</form>
			<div className="items">
				{items.length > 0 ? (
					items.map(({ id, value }) => <div key={id}>{value}</div>)
				) : (
					<p>No Items yet</p>
				)}
			</div>
		</>
	);
};

export default UseFormStatusHook;
