import { keypadKeys } from './helpers';
import Key from './Key';
import 'styles/Calculator/Keypad.scss';

interface Props {
  keyPressed: string | null;
  onValue: (value: string | number) => void;
  onDelete: () => void;
  onReset: () => void;
  onEquals: () => void;
}

export default function Keypad(props: Props) {
  const { keyPressed, onValue, onDelete, onReset, onEquals } = props;

  return (
    <div className="keypad">
      {Object.keys(keypadKeys.numbers).map((key) => (
        <Key
          key={keypadKeys.numbers[key]}
          type={1}
          style={{ gridArea: key }}
          onClick={() => onValue(keypadKeys.numbers[key])}
          active={keyPressed === String(keypadKeys.numbers[key])}
        >
          {keypadKeys.numbers[key]}
        </Key>
      ))}

      <Key
        type={1}
        style={{ gridArea: 'decimal' }}
        onClick={() => onValue('.')}
        active={keyPressed === 'decimal'}
      >
        .
      </Key>

      {Object.keys(keypadKeys.operators).map((key) => (
        <Key
          key={key}
          type={1}
          style={{ gridArea: key }}
          onClick={() => onValue(keypadKeys.operators[key])}
          active={keyPressed === keypadKeys.operators[key]}
        >
          {keypadKeys.operators[key]}
        </Key>
      ))}

      <Key
        type={2}
        style={{ gridArea: 'delete' }}
        onClick={onDelete}
        active={keyPressed === 'delete'}
      >
        DEL
      </Key>
      <Key
        type={2}
        style={{ gridArea: 'reset' }}
        onClick={onReset}
        active={keyPressed === 'reset'}
      >
        RESET
      </Key>
      <Key
        type={3}
        style={{ gridArea: 'equals' }}
        onClick={onEquals}
        active={keyPressed === 'equals'}
      >
        =
      </Key>
    </div>
  );
}
