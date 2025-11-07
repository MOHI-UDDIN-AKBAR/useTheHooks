import { useContentContext } from './ContentContext';

const ContentCategories: React.FC = () => {
	const { setCategory } = useContentContext();
	return (
		<div className="content__categories">
			<button
				type="button"
				className="btn"
				onClick={() => setCategory('posts')}
			>
				Posts
			</button>
			<button
				type="button"
				className="btn"
				onClick={() => setCategory('users')}
			>
				Users
			</button>
			<button
				type="button"
				className="btn"
				onClick={() => setCategory('comments')}
			>
				Comments
			</button>
		</div>
	);
};

export default ContentCategories;
