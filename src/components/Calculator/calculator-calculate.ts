import { add, subtract, divide, multiply, bignumber, MathType } from 'mathjs';

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

// parameter: arr = [value, operator, value, operator, value, ...]
const calculate = (arr: string[]): any => {
  if (arr.length === 1) {
    return arr[0];
  }
  const operationIndex = arr.findIndex(value => value === '/' || value === 'x');
  const index = operationIndex !== -1 ? operationIndex : 1;

  const operationResult = operation(
    +arr[index - 1],
    arr[index],
    +arr[index + 1]
  );
  if (!operationResult && operationResult !== 0) return 'Error';
  arr.splice(index - 1, 3, String(operationResult));
  return calculate(arr);
};

export default calculate;
