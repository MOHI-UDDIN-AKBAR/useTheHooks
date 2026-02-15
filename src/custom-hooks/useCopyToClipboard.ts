import { useCallback, useEffect, useState } from 'react';

export const useCopyToClipboard = <T extends HTMLElement | null>() => {
	const [value, setValue] = useState('');
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = useCallback((ref: React.RefObject<T> | string) => {
		const text = typeof ref === 'string' ? ref : ref.current?.textContent;
		if (!text || !text.trim()) return;
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setValue(text);
				setIsCopied(true);
			})
			.catch((e) => {
				setIsCopied(false);
				console.error(e);
			});
	}, []);

	useEffect(() => {
		if (!isCopied) return;
		const timeoutId = setTimeout(() => setIsCopied(false), 1000);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [isCopied]);

	return { value, copyToClipboard, isCopied };
};
