import React from 'react';

interface CustomCronProp {
  onChange(e: string[]): void;
  value: string[];
  translate(e: string): string;
  disabled?: boolean;
}

const CustomCron: React.FunctionComponent<CustomCronProp> = (props) => {
  const onChange = (e: { target: { value: string } }) => {
    if (props.disabled) return;
    props.onChange(e.target.value.replace(/,/g, '!').split(' '));
  };
  const translateFn = props.translate;

  let val = props.value.toString().replace(/,/g, ' ').replace(/!/g, ',');

  return (
    <div className="well">
      {translateFn('Expression')}{' '}
      <input type="text" onChange={onChange} value={val} disabled={props.disabled} />
    </div>
  );
};
export default CustomCron;
