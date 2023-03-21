import ThemeSwitch from './ThemeSwitch';
import 'styles/Header/Header.scss';

interface Props {
  theme: number;
  setTheme: React.Dispatch<React.SetStateAction<number>>;
  onThemeSwitch: () => void;
}

export default function Header(props: Props) {
  const { theme, setTheme, onThemeSwitch } = props;

  return (
    <header className="header">
      <h1 className="heading">calc</h1>
      <ThemeSwitch theme={theme} onSwitch={onThemeSwitch} setTheme={setTheme} />
    </header>
  );
}
