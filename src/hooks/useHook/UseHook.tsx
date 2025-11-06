import { use } from 'react';

type FetchContentProps = {
	url: string;
};

type PostType = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

type UserType = {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
};

type CommentType = {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
};

type ContentDataType = PostType[] | UserType[] | CommentType[];

const cache = new Map<string, Promise<ContentDataType>>();

function fetchData(url: string) {
	if (!cache.has(url)) {
		cache.set(
			url,
			fetch(url).then(
				(response) => response.json() as Promise<ContentDataType>,
			),
		);
	}
	return cache.get(url)!;
}

const FetchContent: React.FC<FetchContentProps> = ({ url }) => {
	console.log('coming');
	const contentData = use(fetchData(url));
	return <pre>{JSON.stringify(contentData, null, 2)}</pre>;
};

export default FetchContent;
