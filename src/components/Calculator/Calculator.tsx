import { useEffect, useState } from 'react';
import { calculate, getType, transformValue } from './helpers';
import Screen from './Screen';
import Keypad from './Keypad';

const Calculator = () => {
  const [enteredValue, setEnteredValue] = useState('');

  const enterValueHandler = (value: string | number | undefined) => {
    if (!value && value !== 0) return;
    setEnteredValue((prevValue) => {
      const transformedValue = transformValue(value, prevValue);
      const lastValue = prevValue.split(' ')[prevValue.split(' ').length - 1];
      if (getType(transformedValue) === 'number') {
        if (lastValue === '0') {
          const lastValueRemoved = prevValue.split(' ').slice(0, -1);
          return lastValueRemoved.join(' ') + transformedValue;
        }
        return (prevValue += transformedValue);
      }
      if (getType(transformedValue) === 'operator') {
        if (!prevValue && transformedValue.trim() !== '-') {
          return prevValue;
        }

        if (getType(lastValue) === 'operator') {
          const lastValueRemoved = prevValue.split(' ').slice(0, -1).join(' ');
          return lastValueRemoved + transformedValue;
        } else {
          return (prevValue += transformedValue);
        }
      }
      if (getType(transformedValue) === 'decimal' && lastValue.indexOf('.') === -1) {
        return (prevValue += transformedValue);
      }
      return prevValue;
    });
  };

  const deleteHandler = () => {
    setEnteredValue((prevValue) => prevValue.slice(0, -1).trim());
  };

  const resetHandler = () => {
    setEnteredValue('');
  };

  const equalHandler = () => {
    setEnteredValue((prevValue) => {
      if (!prevValue || prevValue.split(' ').length < 3) {
        return prevValue;
      }

      return calculate(prevValue.split(' '));
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
          enterValueHandler(e.key);
          break;
        case '.':
        case '>':
          enterValueHandler('.');
          break;
        case '-':
        case '_':
          enterValueHandler('-');
          break;
        case '+':
        case '=':
          enterValueHandler('+');
          break;
        case '/':
        case '?':
          enterValueHandler('/');
          break;
        case '*':
        case 'x':
          enterValueHandler('x');
          break;
        case 'Backspace':
        case 'Delete':
          deleteHandler();
          break;
        case 'Enter':
          equalHandler();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Screen enteredValue={enteredValue} />
      <Keypad
        enterValueHandler={enterValueHandler}
        deleteHandler={deleteHandler}
        resetHandler={resetHandler}
        equalHandler={equalHandler}
      />
    </>
  );
};

export default Calculator;
