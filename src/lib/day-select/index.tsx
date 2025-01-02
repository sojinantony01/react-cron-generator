import React, { useState, useRef, useEffect, useCallback } from 'react';
type DaySelectProp =
  | {
      disabled?: boolean;
      onChange(value: null | string): void;
      value: string;
      multi?: false;
    }
  | {
      multi: true;
      disabled?: boolean;
      onChange(value: string[]): void;
      value: string[];
    };

const DaySelect: React.FunctionComponent<DaySelectProp> = ({
  disabled,
  multi = false,
  onChange,
  value,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<any>(null);

  const handleClickOutside = useCallback(
    (event: { target: any }) => {
      if (show && ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    },
    [ref, show],
  );

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const onSelect = (i: string) => {
    if (multi && Array.isArray(value)) {
      onChange(
        (value.includes(i)
          ? [
              ...value.slice(0, value.indexOf(i)),
              ...value.splice(value.indexOf(i) + 1, value.length - 1),
            ]
          : [...value, i]) as string & string[],
      );
    } else {
      onChange((value === i ? null : i) as string & string[]);
    }
  };
  const buildOptions = () => {
    let options: React.JSX.Element[] = [];
    for (let i = 1; i <= 31; i++) {
      options.push(
        <label
          className={`dropdown-item ${(Array.isArray(value) ? value.includes(i.toString()) : value === i.toString()) ? 'dropdown-item-selected' : ''}`}
          onClick={() => !disabled && onSelect(i.toString())}
        >
          {i}
        </label>,
      );
    }
    return options;
  };

  return (
    <div className="dropdown mx-2" ref={ref}>
      <input
        disabled={disabled}
        className="dropbtn mx-0"
        onClick={() => setShow((s) => !s)}
        value={
          (Array.isArray(value) ? value.length : value)
            ? Array.isArray(value)
              ? value.join(',')
              : value
            : ''
        }
      ></input>
      {show && <div className="dropdown-content">{buildOptions()}</div>}
    </div>
  );
};

export default DaySelect;
