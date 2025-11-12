import { useEffect, useRef, useState } from 'react';

export const useAsync = <T>(callback: () => Promise<T>, dep: any[] = []) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<T | null>(null);

	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;
		const resolvePromise = async () => {
			setIsLoading(true);
			setError(null);
			setData(null);
			try {
				const response = await callback();
				if (isMounted.current) setData(response);
			} catch (e) {
				const message =
					e instanceof Error
						? e.message
						: '[useAsync] Failed to resolve the Promise';

				if (isMounted.current) setError(message);
				console.error(message, e);
			} finally {
				if (isMounted.current) setIsLoading(false);
			}
		};
		resolvePromise();

		return () => {
			isMounted.current = false;
		};
	}, [callback, ...dep]);

	return { isLoading, error, data };
};
