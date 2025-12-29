import React, { FunctionComponent, useEffect, useState } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

interface HourlyCronProp {
  onChange(e?: string[]): void;
  value: string[];
  translate(e: string): string;
  disabled?: boolean;
  isUnix?: boolean;
}
interface State {
  every: boolean;
}
const HourlyCron: FunctionComponent<HourlyCronProp> = (props) => {
  const [state, setState] = useState<State>({ every: false });

  useEffect(() => {
    if (props.value[2].split('/')[1] || props.value[2] === '*') {
      setState((prev) => ({ ...prev, every: true }));
    }
  }, [props.value]);

  const onHourChange = (e: { target: { value: string } }) => {
    if (
      !props.disabled &&
      state.every &&
      ((parseInt(e.target.value) > 0 && parseInt(e.target.value) < 24) || e.target.value === '')
    ) {
      let val = ['0', '0', '*', '*', '*', '?', '*'];
      val[1] = props.value[1];
      val[2] = e.target.value ? `0/${e.target.value}` : e.target.value;
      val[3] = '1/1';
      props.onChange(val);
    }
  };
  const onMinuteChange = (e: { target: { value: string } }) => {
    if (
      !props.disabled &&
      state.every &&
      ((parseInt(e.target.value) > 0 && parseInt(e.target.value) < 60) || e.target.value === '')
    ) {
      let val = ['0', '0', '*', '*', '*', '?', '*'];
      val[1] = e.target.value;
      val[2] = props.value[2];
      val[3] = '1/1';
      props.onChange(val);
    }
  };

  const onAtHourChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    let val = ['0', props.value[1], '*', '1/1', '*', '?', '*'];
    val[2] = `${e.target.value}`;
    props.onChange(val);
  };

  const onAtMinuteChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    let val = ['0', '*', props.value[2], '1/1', '*', '?', '*'];
    val[1] = `${e.target.value}`;
    props.onChange(val);
  };

  const onClickEveryHourMinute = () => {
    if (props.disabled || state.every) {
      return;
    }
    setState({ ...state, every: true });
    props.onChange(['0', '0', '0/1', '1/1', '*', '?', '*']);
  };

  const onClickEverySpecificHour = () => {
    if (props.disabled || !state.every) {
      return;
    }
    setState({ every: false });
    props.onChange();
  };

  const translateFn = props.translate;
  return (
    <div className="tab-content">
      <div className="tab-pane active">
        <label className="well well-small cursor_pointer">
          <input
            name="EveryHourMinute"
            type="radio"
            checked={state.every}
            onChange={onClickEveryHourMinute}
            disabled={props.disabled}
          />
          <span onClick={onClickEveryHourMinute}>{translateFn('Every')} </span>
          <input
            readOnly={!state.every}
            disabled={props.disabled}
            type="Number"
            onChange={onHourChange}
            onClick={onClickEveryHourMinute}
            value={props.value[2].split('/')[1] ? props.value[2].split('/')[1] : ''}
          />
          <span onClick={onClickEveryHourMinute}>{translateFn('hour')}</span>
          <input
            readOnly={!state.every}
            disabled={props.disabled}
            type="Number"
            onChange={onMinuteChange}
            onClick={onClickEveryHourMinute}
            value={props.value[1]}
          />
          <span onClick={onClickEveryHourMinute}>{translateFn('minute(s)')}</span>
        </label>
        <label className="well well-small cursor_pointer">
          <input
            name="EverySpecificHour"
            type="radio"
            checked={!state.every}
            onChange={onClickEverySpecificHour}
            disabled={props.disabled}
          />
          <span onClick={onClickEverySpecificHour}>{translateFn('At')}</span>
          <Hour disabled={props.disabled} onChange={onAtHourChange} value={props.value[2]} />
          <Minutes disabled={props.disabled} onChange={onAtMinuteChange} value={props.value[1]} />
        </label>
      </div>
    </div>
  );
};

export default HourlyCron;
