import { add, subtract, divide, multiply, bignumber, MathType } from 'mathjs';

export const keypadKeys: {
  numbers: { [key: string]: number };
  operators: { [key: string]: string };
} = {
  numbers: {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  },
  operators: {
    divide: '/',
    multiply: 'x',
    minus: '-',
    plus: '+',
  },
};

export function getType(
  value: string | undefined
): 'number' | 'operator' | 'decimal' | 'other' {
  if (value === undefined) return 'other';

  if (Object.values(keypadKeys.operators).includes(value.trim())) {
    return 'operator';
  } else if (value.trim() === '.') {
    return 'decimal';
  } else if (typeof +value === 'number' && !isNaN(+value)) {
    return 'number';
  } else {
    return 'other';
  }
}

export function transformValue(value: string | number, enteredValue: string) {
  const stringValue = String(value);
  const lastValue = enteredValue[enteredValue.length - 1];
  if (
    getType(stringValue) === 'operator' ||
    ((getType(stringValue) === 'number' || getType(stringValue) === 'decimal') &&
      getType(lastValue) === 'operator')
  ) {
    return ' ' + stringValue;
  }

  return stringValue;
}

const operation = (valueA: number, operator: string, valueB: number) => {
  let result: MathType | undefined;
  const a = bignumber(valueA);
  const b = bignumber(valueB);
  switch (operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '/':
      result = divide(a, b);
      break;
    case 'x':
      result = multiply(a, b);
  }

  return result;
};

export const calculate = (val: string) => {
  let arr = val.split(' ');

  while (arr.length !== 1) {
    const operationIndex = arr.findIndex((value) => value === '/' || value === 'x');
    const index = operationIndex !== -1 ? operationIndex : 1;

    const operationResult = operation(
      Number(arr[index - 1]),
      arr[index],
      Number(arr[index + 1])
    );
    if (!operationResult && operationResult !== 0) return 'Error';
    arr.splice(index - 1, 3, String(operationResult));
  }

  return arr[0];
};
