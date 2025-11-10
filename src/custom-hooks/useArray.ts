import { useState } from 'react';

const useArray = (defaultValue: number[]) => {
	const [array, setArray] = useState(defaultValue);

	const push = (newValue: number) => setArray((prev) => [...prev, newValue]);

	const update = (position: number, replaceValue: number) =>
		setArray((prev) =>
			prev.map((value, index) => {
				if (index === position) {
					return replaceValue;
				}
				return value;
			}),
		);

	const remove = (position: number) =>
		setArray((prev) => prev.filter((_, index) => index !== position));

	const filter = (callback: (value: number) => boolean) =>
		setArray((prev) => prev.filter(callback));

	const set = (newElements: number[]) => {
		setArray(newElements);
	};

	const clearElements = () => setArray([]);

	return {
		array,
		push,
		update,
		remove,
		filter,
		set,
		clearElements,
	};
};

export default useArray;
