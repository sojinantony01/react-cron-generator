import React, { FunctionComponent } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';
import { compressWeekdays, expandWeekdays } from '../utils/range-compressor';

interface WeeklyCronProp {
  onChange(e?: string[]): void;
  value: string[];
  translate(e: string): string;
  disabled?: boolean;
  isUnix?: boolean;
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

    const current = expandWeekdays(val[5]);
    if (!current.includes(e.target.value)) {
      current.push(e.target.value);
    }
    val[5] = compressWeekdays(current);
  };

  const onDayUnChecked = (val: string[], e: { target: { checked: boolean; value: string } }) => {
    const current = expandWeekdays(val[5]).filter((d) => d !== e.target.value);
    val[5] = current.length > 0 ? compressWeekdays(current) : '*';
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
              checked={expandWeekdays(props.value[5]).includes('MON')}
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
              checked={expandWeekdays(props.value[5]).includes('WED')}
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
              checked={expandWeekdays(props.value[5]).includes('FRI')}
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
              checked={expandWeekdays(props.value[5]).includes('SUN')}
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
              checked={expandWeekdays(props.value[5]).includes('TUE')}
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
              checked={expandWeekdays(props.value[5]).includes('THU')}
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
              checked={expandWeekdays(props.value[5]).includes('SAT')}
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
