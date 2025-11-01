import { useEffect, useState } from 'react';

type CategoryType = 'posts' | 'users' | 'comments';

type DataType = Record<string, string | number>;

const URL = 'https://jsonplaceholder.typicode.com';

const useFetch = (category: CategoryType) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [data, setData] = useState<DataType[]>([]);

	useEffect(() => {
		console.log('Coming');
		const controller = new AbortController();
		const { signal } = controller;
		let ignore = false;

		const fetchData = async () => {
			setIsLoading(true);
			setError(undefined);
			setData([]);

			try {
				const response = await fetch(`${URL}/${category}`, {
					signal,
				});
				if (!response.ok) throw new Error(`Failed to fetch ${category} data.`);
				const responseData = (await response.json()) as DataType[];

				if (!ignore && !signal.aborted) setData(responseData.slice(0, 3));
			} catch (e: any) {
				if (e.name === 'AbortError') {
					console.error('Fetch aborted');
					return;
				}

				const message =
					e instanceof Error ? e.message : `Failed to fetch ${category} data.`;

				if (!ignore && !signal.aborted) setError(message);
			} finally {
				if (!ignore && !signal.aborted)
					// For demo purpose
					setTimeout(() => setIsLoading(false), 2000);
			}
		};

		fetchData();

		return () => {
			ignore = true;
			controller.abort();
		};
	}, [category]);

	return { isLoading, data, error };
};

const DisplayData = ({ category }: { category: CategoryType }) => {
	const { data, isLoading, error } = useFetch(category);
	console.log(error);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div> {error}</div>;
	}

	return <div>{data.length > 0 ? JSON.stringify(data, null, 10) : null}</div>;
};
const Hook: React.FC = () => {
	const [category, setCategory] = useState<CategoryType>('posts');

	const handleCategory = (type: CategoryType) => {
		setCategory(type);
	};

	return (
		<section>
			<div className="category-controls">
				<button
					type="button"
					className="btn"
					onClick={() => handleCategory('posts')}
				>
					Posts
				</button>
				<button
					type="button"
					className="btn"
					onClick={() => handleCategory('comments')}
				>
					Comments
				</button>
				<button
					type="button"
					className="btn"
					onClick={() => handleCategory('users')}
				>
					Users
				</button>
			</div>
			<DisplayData category={category} />
		</section>
	);
};

export default Hook;
