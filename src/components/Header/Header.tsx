import Heading from './Heading';
import Theme from './Theme';
import '../../styles/Header/Header.scss';

type Props = {
  currentTheme: number;
  toggleThemeHandler: () => void;
};

const Header = ({ currentTheme, toggleThemeHandler }: Props) => {
  return (
    <header className="header">
      <Heading />
      <Theme
        currentTheme={currentTheme}
        toggleThemeHandler={toggleThemeHandler}
      />
    </header>
  );
};

export default Header;
