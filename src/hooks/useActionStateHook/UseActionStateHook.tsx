import { type FormEvent, useState } from 'react';

type DataType = { message?: string; error?: string };

async function saveData(value: string): Promise<DataType> {
	await wait(3000);
	console.log(value, value.length);
	if (!value.trim()) {
		return Promise.resolve({ error: 'Value is empty' });
	}
	return Promise.resolve({ message: 'Value is correct' });
}

function wait(duration: number): Promise<unknown> {
	return new Promise((resolve) => setTimeout(resolve, duration));
}

const UseActionStateHook: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<DataType>();

	const handleForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const newData = await saveData(inputValue);
		console.log(newData);
		setData(newData);
		setInputValue('');
		setIsLoading(false);
	};

	return (
		<>
			<form onSubmit={handleForm}>
				<div className="input-group">
					<label htmlFor="firstName">
						FirstName :{' '}
						<input
							type="text"
							name="firstName"
							id="firstName"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</label>
				</div>
				<button type="submit" disabled={isLoading}>
					Submit
				</button>
			</form>
			<div>
				{data?.message && <p style={{ color: 'green' }}>{data?.message}</p>}
				{data?.error && <p style={{ color: 'red' }}>{data?.error}</p>}
			</div>
		</>
	);
};

export default UseActionStateHook;
