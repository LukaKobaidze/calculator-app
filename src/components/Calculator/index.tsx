import { useEffect, useState } from 'react';
import { calculate, getType, transformValue } from './helpers';
import Screen from './Screen';
import Keypad from './Keypad';

export default function Calculator() {
  const [value, setValue] = useState('');
  const [keyPressed, setKeyPressed] = useState<string | null>(null);

  const handleValue = (value: string | number) => {
    if (!value && value !== 0) return;
    setValue((state) => {
      const transformedValue = transformValue(value, state);
      const transformedValueType = getType(transformedValue);

      const lastValue = state.split(' ')[state.split(' ').length - 1];

      // Number
      if (transformedValueType === 'number') {
        if (lastValue === '0') {
          const lastValueRemoved = state.split(' ').slice(0, -1);
          return lastValueRemoved.join(' ') + transformedValue;
        }
        return (state += transformedValue);
      }

      // Operator
      if (transformedValueType === 'operator') {
        const lastValueType = getType(lastValue);
        if (
          (state.length === 0 && value !== '-') ||
          (lastValueType === 'operator' && state.trim().length < 2)
        ) {
          return state;
        }

        if (lastValueType === 'operator') {
          const lastValueRemoved = state.split(' ').slice(0, -1).join(' ');
          return lastValueRemoved + transformedValue;
        } else {
          return (state += transformedValue);
        }
      }

      // Decimal
      if (transformedValueType === 'decimal' && lastValue.indexOf('.') === -1) {
        return (state += transformedValue);
      }
      return state;
    });
  };

  const handleDelete = () => {
    setValue((state) =>
      state === 'Error' || state === 'Infinity' ? '' : state.slice(0, -1).trim()
    );
  };

  const handleReset = () => {
    setValue('');
  };

  const handleEquals = () => {
    setValue((state) => {
      if (
        !state ||
        state.split(' ').length < 3 ||
        getType(state[state.length - 1]) === 'operator'
      ) {
        return state;
      }

      return calculate(state);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
          handleValue(e.key);
          setKeyPressed(e.key);
          break;
        case '.':
        case '>':
          handleValue('.');
          setKeyPressed('decimal');
          break;
        case '-':
        case '_':
          handleValue('-');
          setKeyPressed('-');
          break;
        case '+':
        case '=':
          handleValue('+');
          setKeyPressed('+');
          break;
        case '/':
        case '?':
          handleValue('/');
          setKeyPressed('/');
          break;
        case '*':
        case 'x':
          handleValue('x');
          setKeyPressed('x');
          break;
        case 'Backspace':
        case 'Delete':
          handleDelete();
          setKeyPressed('delete');
          break;
        case 'Enter':
          handleEquals();
          setKeyPressed('equals');
          break;
      }
    };

    const handleKeyUp = () => {
      setKeyPressed(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div>
      <Screen value={value} />
      <Keypad
        keyPressed={keyPressed}
        onValue={handleValue}
        onDelete={handleDelete}
        onReset={handleReset}
        onEquals={handleEquals}
      />
    </div>
  );
}
