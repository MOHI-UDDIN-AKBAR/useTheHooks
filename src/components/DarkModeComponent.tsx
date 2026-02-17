import { useDarkMode } from "../custom-hooks/useDarkMode";

const DarkModeComponent: React.FC = () => {
  const { setIsDark, isDark } = useDarkMode();

  return (
    <div>
      <button type="button" className="btn" onClick={() => setIsDark(!isDark)}>
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default DarkModeComponent;
