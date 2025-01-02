import React, { FunctionComponent, useEffect, useState } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

interface DailyCronProp {
  onChange(e?: string[]): void;
  value: string[];
  translate(e: string): string;
  disabled?: boolean;
}
interface State {
  hour: number;
  minute: number;
  every: boolean;
}
const DailyCron: FunctionComponent<DailyCronProp> = (props) => {
  const [state, setState] = useState<State>({ hour: 0, minute: 0, every: false });

  useEffect(() => {
    setState({ ...state, every: props.value[3] !== '?' });
  }, []);

  const onDayChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    if (!e.target.value || (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 32)) {
      // props.value = ['0', getValueByIndex(1), getValueByIndex(1),'*','*','?','*'];
      onValueChange(3, e.target.value ? `1/${e.target.value}` : e.target.value);
    }
  };

  /**
   * If value is * return 0 else return value
   * @param {position in array} index
   */
  const getValueByIndex = (index: number) => {
    return props.value[index] === '*' ? '0' : props.value[index];
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
      <div className="well well-small cursor_pointer" onClick={onClickDailyRadio}>
        <input
          type="radio"
          value="1"
          name="DailyRadio"
          checked={state.every}
          disabled={props.disabled}
        />
        <span>{translateFn('Every')}</span>
        <input
          readOnly={!state.every}
          disabled={props.disabled}
          type="Number"
          maxLength={2}
          onChange={onDayChange}
          value={props.value[3].split('/')[1] ? props.value[3].split('/')[1] : ''}
        />
        <span>{translateFn('day(s)')}</span>
      </div>
      <div className="well well-small cursor_pointer" onClick={onClickEveryWeekDay}>
        <input
          type="radio"
          value="2"
          name="EveryWeekDay"
          checked={!state.every}
          disabled={props.disabled}
        />
        <span>{translateFn('Every week day')}</span>
      </div>
      <span>{translateFn('Start time')}</span>
      <Hour onChange={onAtHourChange} value={props.value[2]} disabled={props.disabled} />
      <Minutes onChange={onAtMinuteChange} value={props.value[1]} disabled={props.disabled} />
    </div>
  );
};
export default DailyCron;
