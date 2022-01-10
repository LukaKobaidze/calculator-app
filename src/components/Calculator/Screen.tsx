import '../../styles/Calculator/Screen.scss';

type Props = {
  enteredValue: string;
};

const Screen = ({ enteredValue }: Props) => {
  return (
    <div className="screen">
      <span>{enteredValue.split(' ').join('')}</span>
    </div>
  );
};

export default Screen;
