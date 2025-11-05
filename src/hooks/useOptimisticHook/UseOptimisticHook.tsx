import { useOptimistic, useState } from 'react';
import { useFormStatus } from 'react-dom';

type Item = {
	id: string;
	item: string;
};

type OptimisticItemsTypes = Item & { pending?: boolean };

function createItem(item: string): Promise<Item> {
	const newItem = { id: crypto.randomUUID(), item };
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
const UseOptimisticHook: React.FC = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [optimisticItems, setOptimisticItems] =
		useOptimistic<OptimisticItemsTypes[]>(items);

	const handleSubmit = async (formData: FormData) => {
		const { item } = Object.fromEntries(formData.entries()) as { item: string };
		if (!item.trim()) return;
		const newOptimisticItem: OptimisticItemsTypes = {
			id: crypto.randomUUID(),
			item,
			pending: true,
		};
		setOptimisticItems((prev) => [...prev, newOptimisticItem]);
		setInputValue('');

		const newItem = await createItem(item);
		setItems((prev) => [...prev, newItem]);
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
				{optimisticItems.length > 0 ? (
					optimisticItems.map(({ id, item, pending }) => (
						<div key={id} style={{ opacity: pending ? '.5' : undefined }}>
							{item}
						</div>
					))
				) : (
					<p>No Items yet</p>
				)}
			</div>
		</>
	);
};

export default UseOptimisticHook;
