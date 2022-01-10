import { useState } from 'react';
import keypadKeys from './keypad-keys';
import calculate from './calculator-calculate';
import Screen from './Screen';
import Keypad from './Keypad';

const typeofKey = (
  value: string | undefined
): 'number' | 'operator' | 'decimal' | 'other' | undefined => {
  if (!value) return undefined;
  if (Object.values(keypadKeys.operators).indexOf(value.trim()) !== -1) {
    return 'operator';
  } else if (value.trim() === '.') {
    return 'decimal';
  } else if (typeof +value === 'number' && !isNaN(+value)) {
    return 'number';
  } else {
    return 'other';
  }
};

const transformValue = (value: string | number, enteredValue: string) => {
  const stringValue = String(value);
  const lastValue = enteredValue.slice(-1);
  if (
    typeofKey(stringValue) === 'operator' ||
    ((typeofKey(stringValue) === 'number' ||
      typeofKey(stringValue) === 'decimal') &&
      typeofKey(lastValue) === 'operator')
  ) {
    return ' ' + stringValue;
  }

  return stringValue;
};

const Calculator = () => {
  const [enteredValue, setEnteredValue] = useState('');

  const enterValueHandler = (value: string | number | undefined) => {
    if (!value && value !== 0) return;
    setEnteredValue(prevValue => {
      const transformedValue = transformValue(value, prevValue);
      const lastValue = prevValue.split(' ')[prevValue.split(' ').length - 1];
      if (typeofKey(transformedValue) === 'number') {
        if (lastValue === '0') {
          const lastValueRemoved = prevValue.split(' ').slice(0, -1);
          return lastValueRemoved.join(' ') + transformedValue;
        }
        return (prevValue += transformedValue);
      }
      if (typeofKey(transformedValue) === 'operator') {
        if (!prevValue && transformedValue.trim() !== '-') {
          return prevValue;
        }

        if (typeofKey(lastValue) === 'operator') {
          const lastValueRemoved = prevValue.split(' ').slice(0, -1).join(' ');
          return lastValueRemoved + transformedValue;
        } else {
          return (prevValue += transformedValue);
        }
      }
      if (
        typeofKey(transformedValue) === 'decimal' &&
        lastValue.indexOf('.') === -1
      ) {
        return (prevValue += transformedValue);
      }
      return prevValue;
    });
  };

  const deleteHandler = () => {
    setEnteredValue(prevValue => prevValue.slice(0, -1));
  };

  const resetHandler = () => {
    setEnteredValue('');
  };

  const equalHandler = () => {
    setEnteredValue(prevValue => {
      if (!prevValue || prevValue.split(' ').length < 3) {
        return prevValue;
      }

      return calculate(prevValue.split(' '));
    });
  };

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
