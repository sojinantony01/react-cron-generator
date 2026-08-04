import React, { FunctionComponent } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

interface YearlyCronProp {
  onChange(e?: string[]): void;
  value: string[];
  translate(e: string): string;
  disabled?: boolean;
  isUnix?: boolean;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Max days per month (ignoring leap years for simplicity) */
const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const YearlyCron: FunctionComponent<YearlyCronProp> = (props) => {
  // val[4] = month (1-12), val[3] = day (1-31)
  const currentMonth = parseInt(props.value[4]) || 1;
  const currentDay = parseInt(props.value[3]) || 1;
  const maxDay = DAYS_IN_MONTH[currentMonth - 1] || 31;

  const onMonthChange = (e: { target: { value: string } }) => {
    if (props.disabled) return;
    const month = parseInt(e.target.value);
    const maxDays = DAYS_IN_MONTH[month - 1] || 31;
    // Clamp day to valid range for new month
    const day = Math.min(currentDay, maxDays);
    const val = [...props.value];
    val[0] = '0';
    val[3] = String(day);
    val[4] = String(month);
    val[5] = '?';
    props.onChange(val);
  };

  const onDayChange = (e: { target: { value: string } }) => {
    if (props.disabled) return;
    const day = parseInt(e.target.value);
    if (day >= 1 && day <= maxDay) {
      const val = [...props.value];
      val[0] = '0';
      val[3] = String(day);
      val[5] = '?';
      props.onChange(val);
    }
  };

  const onAtHourChange = (e: { target: { value: string } }) => {
    if (props.disabled) return;
    const val = [...props.value];
    val[2] = e.target.value;
    props.onChange(val);
  };

  const onAtMinuteChange = (e: { target: { value: string } }) => {
    if (props.disabled) return;
    const val = [...props.value];
    val[1] = e.target.value;
    props.onChange(val);
  };

  const translateFn = props.translate;

  return (
    <div className="tab-pane">
      <label className="well well-small">
        <span>{translateFn('Every year in')}</span>
        <select value={currentMonth} onChange={onMonthChange} disabled={props.disabled}>
          {MONTHS.map((month, idx) => (
            <option key={idx + 1} value={idx + 1}>
              {translateFn(month)}
            </option>
          ))}
        </select>
        <span>{translateFn('on day')}</span>
        <select value={currentDay} onChange={onDayChange} disabled={props.disabled}>
          {Array.from({ length: maxDay }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </label>
      {translateFn('Start time')}
      <Hour onChange={onAtHourChange} value={props.value[2]} disabled={props.disabled} />
      <Minutes onChange={onAtMinuteChange} value={props.value[1]} disabled={props.disabled} />
    </div>
  );
};

export default YearlyCron;
