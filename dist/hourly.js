import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX, MONTH_POSITION_INDEX } from './const';
import { replaceElemAtPos, BaseCronComponent } from './helpers';
export const DEFAULT_VALUE = ['0', '*/1', '*', '*', '*'];
const DIGIT_REGEXP = /^\d+$/i;
const isEveryHour = (value) => {
  return (
    new RegExp(DIGIT_REGEXP).exec(value[MINUTE_POSITION_INDEX]) !== null &&
    value[HOUR_POSITION_INDEX].includes('*') &&
    value[DAY_OF_MONTH_POSITION_INDEX] === '*' &&
    value[MONTH_POSITION_INDEX] === '*' &&
    value[DAY_OF_WEEK_POSITION_INDEX] === '*'
  );
};
const isAtHour = (value) => {
  return (
    new RegExp(DIGIT_REGEXP).exec(value[MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(DIGIT_REGEXP).exec(value[HOUR_POSITION_INDEX]) !== null &&
    value[DAY_OF_MONTH_POSITION_INDEX] === '*' &&
    value[MONTH_POSITION_INDEX] === '*' &&
    value[DAY_OF_WEEK_POSITION_INDEX] === '*'
  );
};
export const isHourly = (value) => {
  return isEveryHour(value) || isAtHour(value);
};
export default class extends BaseCronComponent {
  constructor(props) {
    super(props, DEFAULT_VALUE);
    this.state = {
      value: DEFAULT_VALUE,
    };
  }
  onEveryHourChange(e) {
    if ((e.target.value > 0 && e.target.value < 24) || e.target.value === '') {
      const value = replaceElemAtPos(this.state.value, HOUR_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
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
    const value = every ? DEFAULT_VALUE : replaceElemAtPos(DEFAULT_VALUE, HOUR_POSITION_INDEX, '0');
    this.setState({ value });
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
            { className: 'col-6' },
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
                    checked: isEveryHour(this.state.value),
                    onClick: (e) => this.toggleEvery(true),
                  }),
                  'Every',
                ),
                React.createElement(Input, {
                  id: 'every',
                  className: 'mx-sm-1',
                  type: 'number',
                  disabled: isAtHour(this.state.value),
                  min: 1,
                  max: 23,
                  value: this.state.value[HOUR_POSITION_INDEX].includes('/') ? this.state.value[HOUR_POSITION_INDEX].split('/')[1] : '1',
                  onChange: (e) => this.onEveryHourChange.bind(this)(e),
                }),
                React.createElement(FormText, { color: 'muted' }, 'Must be integer value (1 - 23).'),
              ),
            ),
          ),
        ),
        React.createElement(
          Row,
          { className: 'mt-sm-1' },
          React.createElement(
            Col,
            { className: 'col-6' },
            React.createElement(
              Form,
              { inline: true },
              React.createElement(
                FormGroup,
                null,
                React.createElement(
                  Label,
                  { for: 'at', className: 'mr-sm-1' },
                  React.createElement(CustomInput, {
                    id: 'variant-selector-at',
                    type: 'radio',
                    name: 'variantSelector',
                    checked: isAtHour(this.state.value),
                    onClick: (e) => this.toggleEvery(false),
                  }),
                  'At',
                ),
                React.createElement(
                  Input,
                  {
                    className: 'mr-sm-1 hours',
                    type: 'select',
                    disabled: isEveryHour(this.state.value),
                    onChange: (e) => this.onAtHourChange.bind(this)(e),
                    value: this.state.value[HOUR_POSITION_INDEX],
                  },
                  this.makeHoursOptions(),
                ),
                React.createElement(
                  Input,
                  {
                    type: 'select',
                    className: 'mr-sm-1 minutes',
                    disabled: isEveryHour(this.state.value),
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
//# sourceMappingURL=hourly.js.map
