import { useTheme } from '../../hooks/useContextHook/UseContextHook';
import './ToggleTheme.css';

const ToggleTheme = () => {
	const themeContext = useTheme();

	const { isDark, toggleTheme } = themeContext;

	return (
		<section className="toggle-theme">
			<header className={`${isDark && 'bg-color'} toggle-theme__header`}>
				<h1 className="toggle-theme__title">Hello World</h1>
			</header>
			<button
				type="button"
				className="toggle-theme__button btn"
				onClick={toggleTheme}
			>
				Switch to {isDark ? 'Light' : 'Dark'} Mode
			</button>
		</section>
	);
};

export default ToggleTheme;
