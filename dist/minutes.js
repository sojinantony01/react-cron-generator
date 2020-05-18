import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX, MONTH_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX } from './const';
import { replaceElemAtPos, BaseCronComponent } from './helpers';
export const DEFAULT_VALUE = ['*/1', '*', '*', '*', '*'];
export const isMinutes = (value) => {
  return (
    value[MINUTE_POSITION_INDEX].includes('*') &&
    value[HOUR_POSITION_INDEX] === '*' &&
    value[DAY_OF_MONTH_POSITION_INDEX] === '*' &&
    value[MONTH_POSITION_INDEX] === '*' &&
    value[DAY_OF_WEEK_POSITION_INDEX] === '*'
  );
};
export default class extends BaseCronComponent {
  constructor(props) {
    super(props, DEFAULT_VALUE);
    this.state = {
      value: DEFAULT_VALUE,
    };
  }
  onEveryMinuteChange(e) {
    if ((e.target.value > 0 && e.target.value < 60) || e.target.value == '') {
      const value = replaceElemAtPos(DEFAULT_VALUE, MINUTE_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
      this.setState({ value });
      this.notifyOnChange(value);
    }
  }
  render() {
    return React.createElement(
      Form,
      { className: 'mt-sm-1 justify-content-center align-items-center panel-row', inline: true },
      React.createElement(
        FormGroup,
        null,
        React.createElement(Label, { for: 'every' }, 'Every'),
        React.createElement(Input, {
          id: 'every',
          className: 'mx-sm-1',
          placeholder: '*',
          type: 'number',
          min: 1,
          max: 59,
          onChange: (e) => this.onEveryMinuteChange.bind(this)(e),
          value: this.state.value[MINUTE_POSITION_INDEX].split('/')[1],
        }),
        React.createElement(FormText, { color: 'muted' }, 'Must be integer value (1 - 59).'),
      ),
    );
  }
}
//# sourceMappingURL=minutes.js.map
