import React, { ChangeEvent } from 'react';
interface HourSelectProp {
  disabled?: boolean;
  onChange(event: ChangeEvent<HTMLSelectElement>): void;
  value: string;
}
const HourSelect: React.FunctionComponent<HourSelectProp> = (props) => {
  const buildOptions = () => {
    let options = [];
    for (let i = 0; i < 24; i++) {
      options.push(
        <option key={i} id={i.toString()}>
          {(i < 10 ? '0' : '') + i}
        </option>,
      );
    }
    return options;
  };

  return (
    <select
      disabled={props.disabled}
      className="hours"
      onChange={props.onChange}
      value={props.value}
    >
      {buildOptions()}
    </select>
  );
};

export default HourSelect;
