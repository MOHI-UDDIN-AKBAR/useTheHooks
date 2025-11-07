'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ContentCategories from './ContentCategories';
import { useContentContext } from './ContentContext';
import FetchContent from './UseHook';

const Content: React.FC = () => {
	const { category } = useContentContext();
	const url = `https://jsonplaceholder.typicode.com/${category}`;
	return (
		<section className="content">
			<ContentCategories />
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<Suspense fallback={<div>Loading....</div>}>
					<FetchContent url={url} />
				</Suspense>
			</ErrorBoundary>
		</section>
	);
};

export default Content;
