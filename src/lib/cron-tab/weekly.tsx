import React, { FunctionComponent } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

interface WeeklyCronProp {
  onChange(e?: string[]): void;
  value: string[];
  translate(e: string): string;
  disabled?: boolean;
}

const WeeklyCron: FunctionComponent<WeeklyCronProp> = (props) => {
  const onAtHourChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    let val = props.value;
    val[0] = '0';
    val[2] = `${e.target.value}`;
    props.onChange(val);
  };

  const onAtMinuteChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    let val = props.value;
    val[0] = '0';
    val[1] = `${e.target.value}`;
    props.onChange(val);
  };

  const onCheck = (e: { target: { checked: boolean; value: string } }) => {
    if (props.disabled) {
      return;
    }
    let val = props.value;
    val[0] = '0';
    if (e.target.checked) {
      onDayChecked(val, e);
    } else {
      onDayUnChecked(val, e);
    }
    props.onChange(val);
  };

  const onDayChecked = (val: string[], e: { target: { checked: boolean; value: string } }) => {
    val[2] = `${val[2]}`.split('/').length > 1 ? '0' : val[2].toString();
    val[3] = '?';
    val[4] = '*';
    if (val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
      val[5] = e.target.value;
    } else {
      val[5] = val[5] + '!' + e.target.value;
    }
  };

  const onDayUnChecked = (val: string[], e: { target: { checked: boolean; value: string } }) => {
    let valFive: string | string[] = val[5].split('!');
    if (valFive.length > 1) {
      valFive.splice(valFive.indexOf(e.target.value), 1);
      valFive = valFive.toString().replace(/,/g, '!');
    } else {
      valFive = '*';
    }
    val[5] = valFive;
  };

  const translateFn = props.translate;
  return (
    <div className="container-fluid">
      <div className="well well-small row">
        <div className="span6 col-sm-6">
          <div className="text_align_left">
            <input
              id="mon-checkbox"
              className="min_height_auto cursor_pointer"
              type="checkbox"
              value="MON"
              onChange={onCheck}
              checked={props.value[5].search('MON') !== -1 ? true : false}
              disabled={props.disabled}
            />
            <label className="cursor_pointer" htmlFor="mon-checkbox">
              {translateFn('Monday')}
            </label>
            <br />
            <input
              id="wed-checkbox"
              className="min_height_auto cursor_pointer"
              type="checkbox"
              value="WED"
              onChange={onCheck}
              checked={props.value[5].search('WED') !== -1 ? true : false}
              disabled={props.disabled}
            />
            <label className="cursor_pointer" htmlFor="wed-checkbox">
              {translateFn('Wednesday')}
            </label>
            <br />
            <input
              id="fri-checkbox"
              className="min_height_auto cursor_pointer"
              type="checkbox"
              value="FRI"
              onChange={onCheck}
              checked={props.value[5].search('FRI') !== -1 ? true : false}
              disabled={props.disabled}
            />
            <label className="cursor_pointer" htmlFor="fri-checkbox">
              {translateFn('Friday')}
            </label>
            <br />
            <input
              id="sun-checkbox"
              className="min_height_auto cursor_pointer"
              type="checkbox"
              value="SUN"
              onChange={onCheck}
              checked={props.value[5].search('SUN') !== -1 ? true : false}
              disabled={props.disabled}
            />
            <label className="cursor_pointer" htmlFor="sun-checkbox">
              {translateFn('Sunday')}
            </label>
          </div>
        </div>
        <div className="span6 col-sm-6">
          <div className="text_align_left">
            <input
              id="tue-checkbox"
              className="min_height_auto cursor_pointer"
              type="checkbox"
              value="TUE"
              onChange={onCheck}
              checked={props.value[5].search('TUE') !== -1 ? true : false}
              disabled={props.disabled}
            />
            <label className="cursor_pointer" htmlFor="tue-checkbox">
              {translateFn('Tuesday')}
            </label>
            <br />
            <input
              id="thu-checkbox"
              className="min_height_auto cursor_pointer"
              type="checkbox"
              value="THU"
              onChange={onCheck}
              checked={props.value[5].search('THU') !== -1 ? true : false}
              disabled={props.disabled}
            />
            <label className="cursor_pointer" htmlFor="thu-checkbox">
              {translateFn('Thursday')}
            </label>
            <br />
            <input
              id="sat-checkbox"
              className="min_height_auto cursor_pointer"
              type="checkbox"
              value="SAT"
              onChange={onCheck}
              checked={props.value[5].search('SAT') !== -1 ? true : false}
              disabled={props.disabled}
            />
            <label className="cursor_pointer" htmlFor="sat-checkbox">
              {translateFn('Saturday')}
            </label>
          </div>
          <br />
          <br />
        </div>
      </div>
      {translateFn('Start time')}
      <Hour onChange={onAtHourChange} value={props.value[2]} disabled={props.disabled} />
      <Minutes onChange={onAtMinuteChange} value={props.value[1]} disabled={props.disabled} />
    </div>
  );
};

export default WeeklyCron;
