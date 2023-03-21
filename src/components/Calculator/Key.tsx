import 'styles/Calculator/Key.scss';

interface Props {
  type: 1 | 2 | 3;
  style: object;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  active?: boolean;
}

export default function Key(props: Props) {
  const { type, style, onClick, children, active } = props;

  return (
    <button
      className={`button button--${type} ${active ? 'button--active' : ''}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
