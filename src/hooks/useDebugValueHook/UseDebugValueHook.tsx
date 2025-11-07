import { useCallback, useDebugValue, useEffect, useState } from 'react';

type PersonType = { firstName: string; lastName: string };

const LIST_SIZE = 3000000000;
const slowFunction = (value: string) => {
	console.log('slow function is done');
	for (let i = 0; i < LIST_SIZE; i++) {}
	return value;
};

const useLocalStorage = (key: string, defaultValue: PersonType) => {
	const [state, setState] = useState(() => {
		try {
			const personName = localStorage.getItem(key);
			if (personName) return JSON.parse(personName) as PersonType;
		} catch (e) {
			console.error(e);
		}
		return defaultValue;
	});

	useEffect(() => {
		const updateLocalStorage = () => {
			if (!Storage) return;
			try {
				localStorage.setItem(key, JSON.stringify(state));
			} catch (e) {
				console.error(e);
			}
		};
		updateLocalStorage();
	}, [state, key]);

	useDebugValue(state.firstName, (v) => slowFunction(v));
	useDebugValue([state, key]);

	const removeFromLocalStorage = useCallback((key: string) => {
		localStorage.removeItem(key);
	}, []);

	return { state, setState, removeFromLocalStorage };
};

const UseDebugValueHook: React.FC = () => {
	const {
		state: person,
		setState: setPerson,
		removeFromLocalStorage,
	} = useLocalStorage('person', {
		firstName: 'Hosne',
		lastName: 'Mubarak',
	});

	return (
		<section className="info-section">
			<div className="input-group">
				<label htmlFor="first-name">
					First Name :{' '}
					<input
						type="text"
						name="first-name"
						id="first-name"
						value={person.firstName}
						onChange={(e) =>
							setPerson((prev) => ({ ...prev, firstName: e.target.value }))
						}
					/>
				</label>
			</div>
			<div className="input-group">
				<label htmlFor="first-name">
					Last Name :{' '}
					<input
						type="text"
						name="first-name"
						id="first-name"
						value={person.lastName}
						onChange={(e) =>
							setPerson((prev) => ({ ...prev, lastName: e.target.value }))
						}
					/>
				</label>
			</div>
			<button
				type="button"
				className="btn"
				onClick={() => removeFromLocalStorage('person')}
			>
				Remove
			</button>
		</section>
	);
};

export default UseDebugValueHook;
