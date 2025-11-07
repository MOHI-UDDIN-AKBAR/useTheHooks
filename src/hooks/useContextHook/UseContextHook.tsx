import { createContext, type ReactNode, useContext, useState } from 'react';
import './UseContextHook.css';

type ThemeContextValue = {
	isDark: boolean;
	toggleTheme: () => void;
};

const themeContext = createContext<ThemeContextValue | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [isDark, setIsDark] = useState(false);

	const toggleTheme = () => setIsDark((prev) => !prev);

	return (
		<themeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</themeContext.Provider>
	);
};

export default ThemeProvider;

export const useTheme = () => {
	const context = useContext(themeContext);

	if (context === undefined) {
		throw new Error('useTheme must be  used within a ThemeProvider');
	}
	return context;
};
