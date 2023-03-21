import 'styles/Header/ThemeSwitch.scss';

interface Props {
  theme: number;
  setTheme: React.Dispatch<React.SetStateAction<number>>;
  onSwitch: () => void;
}

export default function ThemeSwitch(props: Props) {
  const { theme, setTheme, onSwitch } = props;

  return (
    <div className="theme">
      <p className="theme__text">THEME</p>
      <div className="theme__wrapper">
        <div className="theme__nums">
          <span onClick={() => setTheme(1)}>1</span>
          <span onClick={() => setTheme(2)}>2</span>
          <span onClick={() => setTheme(3)}>3</span>
        </div>
        <div className="theme__switch">
          <button
            className="theme__switch-btn"
            onClick={onSwitch}
            aria-label="switch theme"
          />
          <div
            className={`theme__switch-circle theme__switch-circle--${theme}`}
          />
        </div>
      </div>
    </div>
  );
}
