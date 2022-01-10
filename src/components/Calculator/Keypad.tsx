import keypadKeys from './keypad-keys';
import Button from './Button';
import '../../styles/Calculator/Keypad.scss';

type Props = {
  enterValueHandler: (value: string | number | undefined) => void;
  deleteHandler: () => void;
  resetHandler: () => void;
  equalHandler: () => void;
};

const Keypad = (props: Props) => {
  const { enterValueHandler, deleteHandler, resetHandler, equalHandler } =
    props;

  const renderNumbers = () => {
    const keypadNumbers: any = keypadKeys.numbers;
    return Object.keys(keypadNumbers).map(wordNumber => (
      <Button
        type={1}
        style={{ gridArea: wordNumber.toLowerCase() }}
        key={keypadNumbers[wordNumber]}
        onEnterValue={enterValueHandler}
      >
        {keypadNumbers[wordNumber]}
      </Button>
    ));
  };

  const renderOperations = () => {
    const keypadOperations: any = keypadKeys.operators;
    return Object.keys(keypadOperations).map(operation => (
      <Button
        type={1}
        style={{ gridArea: operation }}
        onEnterValue={enterValueHandler}
        key={operation}
      >
        {keypadOperations[operation]}
      </Button>
    ));
  };
  return (
    <div className="keypad">
      {renderNumbers()}
      {renderOperations()}
      <Button
        type={1}
        style={{ gridArea: 'decimal' }}
        onEnterValue={enterValueHandler}
      >
        .
      </Button>
      <Button type={2} style={{ gridArea: 'delete' }} onDelete={deleteHandler}>
        DEL
      </Button>
      <Button type={2} style={{ gridArea: 'reset' }} onReset={resetHandler}>
        RESET
      </Button>
      <Button type={3} style={{ gridArea: 'equal' }} onEqual={equalHandler}>
        =
      </Button>
    </div>
  );
};

export default Keypad;
