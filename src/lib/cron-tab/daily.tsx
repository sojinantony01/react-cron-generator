import React, { FunctionComponent, useEffect, useState } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

interface DailyCronProp {
  onChange(e?: string[]): void;
  value: string[];
  translate(e: string): string;
  disabled?: boolean;
  isUnix?: boolean;
}
interface State {
  hour: number;
  minute: number;
  every: boolean;
}
const DailyCron: FunctionComponent<DailyCronProp> = (props) => {
  const [state, setState] = useState<State>({ hour: 0, minute: 0, every: false });

  useEffect(() => {
    setState((prev) => ({ ...prev, every: props.value[3] !== '?' }));
  }, [props.value]);

  const onDayChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    if (!e.target.value || (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 32)) {
      onValueChange(3, e.target.value ? `1/${e.target.value}` : e.target.value);
    }
  };

  const onAtHourChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    onValueChange(2, e.target.value);
  };

  const onAtMinuteChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    onValueChange(1, e.target.value);
  };

  const onValueChange = (cronPosition: number, value: string) => {
    let val = props.value;
    val[cronPosition] = value;
    props.onChange(val);
  };

  const onClickEveryWeekDay = () => {
    if (props.disabled || !state.every) {
      return;
    }
    setState({ ...state, every: false });
    props.onChange(['0', props.value[1], props.value[2], '?', '*', 'MON-FRI', '*']);
  };

  const onClickDailyRadio = () => {
    if (props.disabled || state.every) {
      return;
    }
    setState({ ...state, every: true });
    props.onChange();
  };

  const translateFn = props.translate;
  return (
    <div className="tab-pane">
      <label className="well well-small cursor_pointer">
        <input
          type="radio"
          value="1"
          name="DailyRadio"
          checked={state.every}
          onChange={onClickDailyRadio}
          disabled={props.disabled}
        />
        <span onClick={onClickDailyRadio}>{translateFn('Every')}</span>
        <input
          readOnly={!state.every}
          disabled={props.disabled}
          type="Number"
          maxLength={2}
          onChange={onDayChange}
          onClick={onClickDailyRadio}
          value={props.value[3].split('/')[1] ? props.value[3].split('/')[1] : ''}
        />
        <span onClick={onClickDailyRadio}>{translateFn('day(s)')}</span>
      </label>
      <label className="well well-small cursor_pointer">
        <input
          type="radio"
          value="2"
          name="EveryWeekDay"
          checked={!state.every}
          onChange={onClickEveryWeekDay}
          disabled={props.disabled}
        />
        <span onClick={onClickEveryWeekDay}>{translateFn('Every week day')}</span>
      </label>
      <span>{translateFn('Start time')}</span>
      <Hour onChange={onAtHourChange} value={props.value[2]} disabled={props.disabled} />
      <Minutes onChange={onAtMinuteChange} value={props.value[1]} disabled={props.disabled} />
    </div>
  );
};
export default DailyCron;
