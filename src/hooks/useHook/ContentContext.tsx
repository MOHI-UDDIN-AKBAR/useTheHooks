import { createContext, useContext, useState } from 'react';

type ContextType = {
	category: string;
	setCategory: React.Dispatch<React.SetStateAction<string>>;
};
const contentContext = createContext<ContextType | null>(null);

const ContentContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [category, setCategory] = useState('posts');

	return (
		<contentContext.Provider value={{ category, setCategory }}>
			{children}
		</contentContext.Provider>
	);
};

export const useContentContext = () => {
	const context = useContext(contentContext);
	if (!context) {
		throw new Error(
			'useContentContext must be used within ContentContextProvider',
		);
	}
	return context;
};

export default ContentContextProvider;
