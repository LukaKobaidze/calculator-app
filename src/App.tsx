import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Calculator from './components/Calculator/Calculator';
import './styles/App.scss';

const changeTheme = (theme: number) => {
  const body = document.body;
  const prevTheme = body.classList.value + '';
  if (prevTheme) {
    body.classList.remove(prevTheme);
  }
  body.classList.add(`theme--${theme}`);
};

const App = () => {
  const initialTheme = () => window.localStorage.getItem('theme') || 1;
  const [theme, setTheme] = useState(+initialTheme());

  useEffect(() => {
    changeTheme(theme);
    window.localStorage.setItem('theme', String(theme));
  }, [theme]);

  const toggleThemeHandler = () => {
    setTheme(prevTheme => {
      let themeNumber = prevTheme;
      if (themeNumber < 3) {
        themeNumber++;
      } else {
        themeNumber = 1;
      }
      return themeNumber;
    });
  };

  return (
    <div className="app">
      <Header currentTheme={theme} toggleThemeHandler={toggleThemeHandler} />
      <main>
        <Calculator />
      </main>
    </div>
  );
};

export default App;
