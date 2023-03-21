import { useEffect, useRef } from 'react';
import 'styles/Calculator/Screen.scss';

interface Props {
  value: string;
}

export default function Screen(props: Props) {
  const { value } = props;
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollableRef.current;
    if (element) {
      element.scrollLeft = element.scrollWidth;
    }
  }, [value]);

  return (
    <div className="screen">
      <div ref={scrollableRef} className="screen__scrollable">
        <span className="screen__text">{value.split(' ').join('')}</span>
      </div>
    </div>
  );
}
