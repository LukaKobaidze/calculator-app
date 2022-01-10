import '../../styles/Header/Theme.scss';

type Props = {
  currentTheme: number;
  toggleThemeHandler: () => void;
};

const Theme = ({ currentTheme, toggleThemeHandler }: Props) => {
  return (
    <div className="theme">
      <p className="theme--text">THEME</p>
      <div className="theme__main">
        <div className="theme__main--nums">
          <p>1</p>
          <p>2</p>
          <p>3</p>
        </div>
        <button className="theme__main--toggle" onClick={toggleThemeHandler}>
          <span
            className={`theme__main--toggle--circle theme__main--toggle--circle--${currentTheme}`}
          />
        </button>
      </div>
    </div>
  );
};

export default Theme;
