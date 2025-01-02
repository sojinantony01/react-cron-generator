import React, { ChangeEvent, FunctionComponent, ReactElement } from 'react';
interface MinutesSelectProp {
  disabled?: boolean;
  onChange(event: ChangeEvent<HTMLSelectElement>): void;
  value: string;
}
const MinutesSelect: FunctionComponent<MinutesSelectProp> = (props) => {
  const buildOptions = (): ReactElement[] => {
    let options = [];
    for (let i = 0; i < 60; i++) {
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
      className="minutes"
      onChange={props.onChange}
      value={props.value}
    >
      {buildOptions()}
    </select>
  );
};
export default MinutesSelect;
