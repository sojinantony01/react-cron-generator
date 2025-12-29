import React, { FunctionComponent, useEffect, useState } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';
import DaySelect from '../day-select';

interface MonthlyCronProp {
  onChange(e?: string[]): void;
  value: string[];
  translate(e: string): string;
  disabled?: boolean;
  isUnix?: boolean;
}
interface State {
  hour: number;
  minute: number;
  every: string;
}
const MonthlyCron: FunctionComponent<MonthlyCronProp> = (props) => {
  const [state, setState] = useState<State>({ hour: 0, minute: 0, every: '' });

  useEffect(() => {
    let every: string;
    if (props.value[3] === 'L') {
      every = '2';
    } else if (props.value[3] === 'LW') {
      every = '3';
    } else if (props.value[3].startsWith('L')) {
      every = '4';
    } else if (props.value[3].includes('!')) {
      every = '5';
    } else {
      every = '1';
    }
    // Don't override state.every if it's already '5' and we're just updating the day value
    // This prevents the radio button from jumping back to option 1 when selecting days
    setState((prev) => {
      if (prev.every === '5' && every === '1') {
        return prev; // Keep the current state
      }
      return { ...prev, every };
    });
  }, [props.value]);
  const onDayChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    if ((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) || e.target.value === '') {
      let val = [
        '0',
        props.value[1] === '*' ? '0' : props.value[1],
        props.value[2] === '*' ? '0' : props.value[2],
        props.value[3],
        '1/1',
        '?',
        '*',
      ];
      val[3] = `${e.target.value}`;
      props.onChange(val);
    }
  };

  const onMultiDayChange = (value: string[]) => {
    if (props.disabled) {
      return;
    }
    // Maintain the state as option 5 when days are being selected
    setState({ ...state, every: '5' });
    const val = [
      '0',
      props.value[1] === '*' ? '0' : props.value[1],
      props.value[2] === '*' ? '0' : props.value[2],
      props.value[3],
      '1/1',
      '?',
      '*',
    ];
    val[3] = `${value.filter((p) => p).join('!')}`;
    props.onChange(val);
  };

  const onLastDayChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    if (
      (parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31) ||
      e.target.value === ''
    ) {
      let val = [
        '0',
        props.value[1] === '*' ? '0' : props.value[1],
        props.value[2] === '*' ? '0' : props.value[2],
        props.value[3],
        '*',
        '?',
        '*',
      ];
      if (e.target.value === '') {
        val[3] = '';
      } else {
        val[3] = `L-${e.target.value}`;
      }
      props.onChange(val);
    }
  };
  const onAtHourChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    let val = props.value;
    val[2] = `${e.target.value}`;
    props.onChange(val);
  };
  const onAtMinuteChange = (e: { target: { value: string } }) => {
    if (props.disabled) {
      return;
    }
    let val = props.value;
    val[1] = `${e.target.value}`;
    props.onChange(val);
  };
  const onClickMonthlyOnceRadio = (value = '1') => {
    if (props.disabled) {
      return;
    }
    if (state.every === '1') {
      return;
    }
    setState({ ...state, every: value });
    props.onChange([
      '0',
      props.value[1] === '*' ? '0' : props.value[1],
      props.value[2] === '*' ? '0' : props.value[2],
      '1',
      '1/1',
      '?',
      '*',
    ]);
  };
  const onClickLastDayOfEveryMonth = (value = '2') => {
    if (props.disabled) {
      return;
    }
    if (state.every === '2') {
      return;
    }
    setState({ ...state, every: value });
    props.onChange([
      '0',
      props.value[1] === '*' ? '0' : props.value[1],
      props.value[2] === '*' ? '0' : props.value[2],
      'L',
      '*',
      '?',
      '*',
    ]);
  };
  const onClickLastWeekdayOfEveryMonth = (value = '3') => {
    if (props.disabled) {
      return;
    }
    if (state.every === '3') {
      return;
    }
    setState({ ...state, every: value });
    props.onChange([
      '0',
      props.value[1] === '*' ? '0' : props.value[1],
      props.value[2] === '*' ? '0' : props.value[2],
      'LW',
      '*',
      '?',
      '*',
    ]);
  };
  const onClickDaysBeforeEndOfMonth = (value = '4') => {
    if (props.disabled) {
      return;
    }
    if (state.every === '4') {
      return;
    }
    setState({ ...state, every: value });
    props.onChange([
      '0',
      props.value[1] === '*' ? '0' : props.value[1],
      props.value[2] === '*' ? '0' : props.value[2],
      `L-${1}`,
      '*',
      '?',
      '*',
    ]);
  };
  const onClickMonthlyMultipleRadio = (value = '5') => {
    if (props.disabled) {
      return;
    }
    if (state.every === '5') {
      return;
    }
    setState({ ...state, every: value });
    // Set initial value with empty day selection (will be populated by DaySelect)
    props.onChange([
      '0',
      props.value[1] === '*' ? '0' : props.value[1],
      props.value[2] === '*' ? '0' : props.value[2],
      '', // Empty string for days - user will select from dropdown
      '1/1',
      '?',
      '*',
    ]);
  };
  const translateFn = props.translate;
  return (
    <div className="tab-pane">
      <label className="well well-small cursor_pointer">
        <input
          type="radio"
          value="1"
          name="MonthlyOnceRadio"
          checked={state.every === '1' ? true : false}
          onChange={() => onClickMonthlyOnceRadio()}
          disabled={props.disabled}
        />
        <span onClick={() => onClickMonthlyOnceRadio()}>{translateFn('Day')}</span>
        <input
          readOnly={state.every !== '1'}
          type="number"
          value={props.value[3]}
          onChange={onDayChange}
          onClick={() => onClickMonthlyOnceRadio()}
          disabled={props.disabled}
        />
        <span onClick={() => onClickMonthlyOnceRadio()}>{translateFn('of every month(s)')}</span>
      </label>
      <label className="well well-small cursor_pointer">
        <input
          type="radio"
          value="2"
          name="LastDayOfEveryMonth"
          checked={state.every === '2' ? true : false}
          onChange={() => onClickLastDayOfEveryMonth()}
          disabled={props.disabled}
        />
        <span onClick={() => onClickLastDayOfEveryMonth()}>
          {translateFn('Last day of every month')}
        </span>
      </label>
      <label className="well well-small cursor_pointer">
        <input
          type="radio"
          value="3"
          name="LastWeekdayOfEveryMonth"
          checked={state.every === '3' ? true : false}
          onChange={() => onClickLastWeekdayOfEveryMonth()}
          disabled={props.disabled}
        />
        <span onClick={() => onClickLastWeekdayOfEveryMonth()}>
          {translateFn('On the last weekday of every month')}
        </span>
      </label>
      <label className="well well-small cursor_pointer">
        <input
          type="radio"
          value="4"
          name="DaysBeforeEndOfMonth"
          checked={state.every === '4' ? true : false}
          onChange={() => onClickDaysBeforeEndOfMonth()}
          disabled={props.disabled}
        />

        <input
          type="number"
          value={
            props.value[3].split('-').length && props.value[3].split('-')[1]
              ? props.value[3].split('-')[1]
              : ''
          }
          onChange={onLastDayChange}
          onFocus={() => onClickDaysBeforeEndOfMonth()}
          disabled={props.disabled}
        />
        <span onClick={() => onClickDaysBeforeEndOfMonth()}>
          {translateFn('day(s) before the end of the month')}
        </span>
      </label>
      <label className="well well-small cursor_pointer">
        <input
          type="radio"
          value="5"
          name="MonthlyMultipleRadio"
          checked={state.every === '5' ? true : false}
          onChange={() => onClickMonthlyMultipleRadio()}
          disabled={props.disabled}
        />
        <DaySelect
          onChange={(e) => onMultiDayChange(e)}
          disabled={props.disabled}
          value={state.every === '5' ? props.value[3].split('!') : []}
          onFocus={() => onClickMonthlyMultipleRadio()}
          multi
        />
        <span onClick={() => onClickMonthlyMultipleRadio()}>
          {translateFn('Days of every month')}
        </span>
      </label>

      {translateFn('Start time')}
      <Hour onChange={onAtHourChange} value={props.value[2]} disabled={props.disabled} />
      <Minutes onChange={onAtMinuteChange} value={props.value[1]} disabled={props.disabled} />
    </div>
  );
};

export default MonthlyCron;
