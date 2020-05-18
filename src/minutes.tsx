import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX, MONTH_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX } from './const';
import { replaceElemAtPos, BaseTabProps, BaseTabState, BaseCronComponent } from './helpers';

export const DEFAULT_VALUE = ['*/1', '*', '*', '*', '*'];

export const isMinutes = (value: string[]) => {
  return (
    value[MINUTE_POSITION_INDEX].includes('*') &&
    value[HOUR_POSITION_INDEX] === '*' &&
    value[DAY_OF_MONTH_POSITION_INDEX] === '*' &&
    value[MONTH_POSITION_INDEX] === '*' &&
    value[DAY_OF_WEEK_POSITION_INDEX] === '*'
  );
};

export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
  state: Readonly<BaseTabState> = {
    value: DEFAULT_VALUE,
  };

  constructor(props: BaseTabProps) {
    super(props, DEFAULT_VALUE);
  }

  onEveryMinuteChange(e: any) {
    if ((e.target.value > 0 && e.target.value < 60) || e.target.value == '') {
      const value = replaceElemAtPos(DEFAULT_VALUE, MINUTE_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
      this.setState({ value });
      this.notifyOnChange(value);
    }
  }

  render() {
    return (
      <Form className="mt-sm-1 justify-content-center align-items-center panel-row" inline>
        <FormGroup>
          <Label for="every">Every</Label>
          <Input
            id="every"
            className="mx-sm-1"
            placeholder="*"
            type="number"
            min={1}
            max={59}
            onChange={(e) => this.onEveryMinuteChange.bind(this)(e)}
            value={this.state.value[MINUTE_POSITION_INDEX].split('/')[1]}
          />
          <FormText color="muted">Must be integer value (1 - 59).</FormText>
        </FormGroup>
      </Form>
    );
  }
}
