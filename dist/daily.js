import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX } from './const';
import { replaceElemAtPos, BaseCronComponent, DIGIT_REGEXP } from './helpers';
export const DEFAULT_VALUE = ['0', '0', '*/1', '*', '*'];
const isEveryDay = (value) => {
  return (
    new RegExp(DIGIT_REGEXP).exec(value[MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(DIGIT_REGEXP).exec(value[HOUR_POSITION_INDEX]) !== null &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('/') &&
    value[DAY_OF_WEEK_POSITION_INDEX] === '*'
  );
};
const isAtDayHour = (value) => {
  return (
    new RegExp(DIGIT_REGEXP).exec(value[MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(DIGIT_REGEXP).exec(value[HOUR_POSITION_INDEX]) !== null &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    value[DAY_OF_WEEK_POSITION_INDEX] === 'MON-FRI'
  );
};
export const isDaily = (value) => {
  return isEveryDay(value) || isAtDayHour(value);
};
export default class extends BaseCronComponent {
  constructor(props) {
    super(props, DEFAULT_VALUE);
    this.state = {
      value: DEFAULT_VALUE,
    };
  }
  onEveryDayChange(e) {
    if ((e.target.value > 0 && e.target.value < 24) || e.target.value === '') {
      const value = replaceElemAtPos(this.state.value, DAY_OF_MONTH_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
      this.setState({ value });
      this.notifyOnChange(value);
    }
  }
  onAtHourChange(e) {
    const value = replaceElemAtPos(this.state.value, HOUR_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }
  onAtMinuteChange(e) {
    const value = replaceElemAtPos(this.state.value, MINUTE_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }
  toggleEvery(every) {
    const value = every
      ? DEFAULT_VALUE
      : replaceElemAtPos(replaceElemAtPos(DEFAULT_VALUE, DAY_OF_MONTH_POSITION_INDEX, '*'), DAY_OF_WEEK_POSITION_INDEX, 'MON-FRI');
    this.setState({
      value,
    });
    this.notifyOnChange(value);
  }
  render() {
    return React.createElement(
      Form,
      { className: 'mt-sm-1 justify-content-center align-items-center panel-row', inline: true },
      React.createElement(
        'div',
        null,
        React.createElement(
          Row,
          { className: 'mt-sm-1' },
          React.createElement(
            Col,
            null,
            React.createElement(
              Form,
              { inline: true },
              React.createElement(
                FormGroup,
                null,
                React.createElement(
                  Label,
                  { for: 'every' },
                  React.createElement(CustomInput, {
                    id: 'variant-selector-every',
                    type: 'radio',
                    name: 'variantSelector',
                    checked: isEveryDay(this.state.value),
                    onClick: (e) => this.toggleEvery.bind(this)(true),
                  }),
                  'Every',
                ),
                React.createElement(Input, {
                  type: 'number',
                  className: 'mx-sm-1',
                  disabled: isAtDayHour(this.state.value),
                  min: 1,
                  max: 31,
                  value: this.state.value[DAY_OF_MONTH_POSITION_INDEX].includes('/')
                    ? this.state.value[DAY_OF_MONTH_POSITION_INDEX].split('/')[1]
                    : '',
                  onChange: (e) => this.onEveryDayChange.bind(this)(e),
                }),
                React.createElement(FormText, { color: 'muted' }, 'Must be integer value (1 - 31).'),
              ),
            ),
          ),
        ),
        React.createElement(
          Row,
          { className: 'mt-sm-1' },
          React.createElement(
            Col,
            null,
            React.createElement(
              Form,
              { inline: true },
              React.createElement(
                FormGroup,
                null,
                React.createElement(
                  Label,
                  { for: 'every-week-day', className: 'mr-sm-1' },
                  React.createElement(CustomInput, {
                    id: 'variant-selector-every-week-day',
                    type: 'radio',
                    name: 'variantSelector',
                    checked: isAtDayHour(this.state.value),
                    onClick: (e) => this.toggleEvery.bind(this)(false),
                  }),
                  'Every Mon - Fri at',
                ),
                React.createElement(
                  Input,
                  {
                    id: 'DailyHours',
                    className: 'mr-sm-1 hours',
                    type: 'select',
                    disabled: isEveryDay(this.state.value),
                    onChange: (e) => this.onAtHourChange.bind(this)(e),
                    value: this.state.value[HOUR_POSITION_INDEX],
                  },
                  this.makeHoursOptions(),
                ),
                React.createElement(
                  Input,
                  {
                    id: 'DailyMinutes',
                    className: 'mr-sm-1 minutes',
                    type: 'select',
                    disabled: isEveryDay(this.state.value),
                    onChange: (e) => this.onAtMinuteChange.bind(this)(e),
                    value: this.state.value[MINUTE_POSITION_INDEX],
                  },
                  this.makeMinutesOptions(),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
//# sourceMappingURL=daily.js.map
