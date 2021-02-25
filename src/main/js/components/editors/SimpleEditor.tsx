import React from 'react';
import { Input } from 'antd';

export type SimpleEditorProps = {
  value: string;
  name: string;
  onChange: (newValue: string) => void;
  [other :string]: any;
};

export const SimpleEditor: React.FC<SimpleEditorProps> = ({ name, value, onChange, ...otherProps }) => {
  const [active, setActive] = React.useState(false);
  const ref = React.useRef(null);
  const eventAdapter = (fun: (param: string) => any) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => fun(e.target.value);
  };
  const activate = () => {
    setActive(true);
  };
  const deActivate = () => {
    setActive(false);
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.input.contains(event.target)) {
        deActivate();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  if (!active) {
    return (
      <div {...otherProps} style={{ lineHeight: '2em', paddingLeft: '12px', width: '100%', minHeight: '30px' }} onClick={activate}>
        {value}
      </div>
    );
  }
  return <Input ref={ref} placeholder={name} value={value} onChange={eventAdapter(onChange)} />;
};
