import { useAsync } from '../custom-hooks/useAsync';

const AsyncComponent: React.FC = () => {
	const { isLoading, error, data } = useAsync(
		() =>
			new Promise((resolve) =>
				setTimeout(() => {
					resolve({ name: 'Rifat' });
				}, 2000),
			),
	);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <p>Error : {error}</p>;
	return <div> {data ? JSON.stringify(data) : null}</div>;
};

export default AsyncComponent;
