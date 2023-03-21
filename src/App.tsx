import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Calculator from 'components/Calculator';
import 'styles/App.scss';

export default function App() {
  const initialTheme = () => window.localStorage.getItem('theme') || 1;
  
  const [theme, setTheme] = useState(Number(initialTheme()));
  const [themeSwitchDirection, setThemeSwitchDirection] = useState<'left' | 'right'>(
    'right'
  );

  useEffect(() => {
    const body = document.body;
    const prevTheme = body.classList.value + '';
    if (prevTheme) {
      body.classList.remove(prevTheme);
    }
    body.classList.add(`theme--${theme}`);

    window.localStorage.setItem('theme', String(theme));
    setThemeSwitchDirection((state) =>
      theme === 1 ? 'right' : theme === 3 ? 'left' : state
    );
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((state) => {
      return themeSwitchDirection === 'right' ? state + 1 : state - 1;
    });
  };

  return (
    <div className="app">
      <Header theme={theme} setTheme={setTheme} onThemeSwitch={handleThemeSwitch} />
      <main>
        <Calculator />
      </main>
    </div>
  );
}
