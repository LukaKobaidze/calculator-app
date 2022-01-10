import '../../styles/Calculator/Button.scss';

type Props = {
  type: 1 | 2 | 3;
  style: object;
  children?: string | number;
  onEnterValue?: (value: string | number | undefined) => void;
  onDelete?: () => void;
  onReset?: () => void;
  onEqual?: () => void;
};

const Button = (props: Props) => {
  const { type, style, children, onEnterValue, onDelete, onReset, onEqual } =
    props;
  const clickHandler =
    onEnterValue?.bind(null, children) || onDelete || onReset || onEqual;

  return (
    <button
      className={`button button--${type}`}
      style={style}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
