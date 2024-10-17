import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';

import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX, MONTH_POSITION_INDEX } from './const';
import { replaceElemAtPos, BaseCronComponent, BaseTabProps, BaseTabState, isDigit } from './helpers';
import { TzDropdown } from './tzDropdown';

export const DEFAULT_VALUE = ['0', '*/1', '*', '*', '*'];

const isEveryHour = (value: string[]) => {
  return (
    isDigit(value[MINUTE_POSITION_INDEX]) &&
    value[HOUR_POSITION_INDEX].includes('*') &&
    value[DAY_OF_MONTH_POSITION_INDEX] === '*' &&
    value[MONTH_POSITION_INDEX] === '*' &&
    value[DAY_OF_WEEK_POSITION_INDEX] === '*'
  );
};

const isAtHour = (value: string[]) => {
  return (
    isDigit(value[MINUTE_POSITION_INDEX]) &&
    isDigit(value[HOUR_POSITION_INDEX]) &&
    value[DAY_OF_MONTH_POSITION_INDEX] === '*' &&
    value[MONTH_POSITION_INDEX] === '*' &&
    value[DAY_OF_WEEK_POSITION_INDEX] === '*'
  );
};

export const isHourly = (value: string[]) => {
  return isEveryHour(value) || isAtHour(value);
};

export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
  state: Readonly<BaseTabState> = {
    value: DEFAULT_VALUE,
  };

  constructor(props: BaseTabProps) {
    super(props, DEFAULT_VALUE);
  }

  onEveryHourChange(e: any) {
    if ((e.target.value > 0 && e.target.value < 24) || e.target.value === '') {
      const value = replaceElemAtPos(this.state.value, HOUR_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
      this.setState({ value });
      this.notifyOnChange(value, this.state.timezone);
    }
  }

  onEveryMinuteChange(e: any) {
    if ((e.target.value > 0 && e.target.value < 60) || e.target.value === '') {
      const value = replaceElemAtPos(this.state.value, MINUTE_POSITION_INDEX, e.target.value === '' ? '*' : `${e.target.value}`);
      this.setState({ value });
      this.notifyOnChange(value, this.state.timezone);
    }
  }

  onAtHourChange(e: any) {
    const value = replaceElemAtPos(this.state.value, HOUR_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value, this.state.timezone);
  }

  onAtMinuteChange(e: any) {
    const value = replaceElemAtPos(this.state.value, MINUTE_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value, this.state.timezone);
  }
  protected onTimezoneChange(timezone: string) {
    this.setState({ timezone });
    this.notifyOnChange(this.state.value, timezone);
  }

  toggleEvery(every: boolean) {
    const value = every ? DEFAULT_VALUE : replaceElemAtPos(DEFAULT_VALUE, HOUR_POSITION_INDEX, '0');
    this.setState({ value });
    this.notifyOnChange(value, this.state.timezone);
  }

  render() {
    return (
      <Form className="mt-sm-1 justify-content-center align-items-center panel-row" inline>
        <div>
          <Row className="mt-sm-1">
            <Col className="col-6">
              <Form inline>
                <FormGroup>
                  <Label for="every">
                    <CustomInput
                      id="variant-selector-every"
                      type="radio"
                      name="variantSelector"
                      checked={isEveryHour(this.state.value)}
                      onClick={() => this.toggleEvery(true)}
                    />
                    Every
                  </Label>
                  <Input
                    id="every"
                    className="mx-sm-1"
                    type="number"
                    disabled={isAtHour(this.state.value)}
                    min={1}
                    max={23}
                    value={this.state.value[HOUR_POSITION_INDEX].includes('/') ? this.state.value[HOUR_POSITION_INDEX].split('/')[1] : '1'}
                    onChange={(e) => this.onEveryHourChange.bind(this)(e)}
                  />
                  <Label for="minute" className="ml-sm-2">
                    Hour (1 - 23)
                  </Label>
                  <Input
                    id="minute"
                    className="mx-sm-1"
                    type="number"
                    disabled={isAtHour(this.state.value)}
                    min={1}
                    max={59}
                    value={this.state.value[MINUTE_POSITION_INDEX] ? this.state.value[MINUTE_POSITION_INDEX] : '0'}
                    onChange={(e) => this.onEveryMinuteChange.bind(this)(e)}
                  />
                  <Label for="minute" className="ml-sm-2">
                    Minute (1 - 59)
                  </Label>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row className="mt-sm-1">
            <Col className="col-6">
              <Form inline>
                <FormGroup>
                  <Label for="at" className="mr-sm-1">
                    <CustomInput
                      id="variant-selector-at"
                      type="radio"
                      name="variantSelector"
                      checked={isAtHour(this.state.value)}
                      onClick={() => this.toggleEvery(false)}
                    />
                    At
                  </Label>
                  <Input
                    className="mr-sm-1 hours"
                    type="select"
                    disabled={isEveryHour(this.state.value)}
                    onChange={(e) => this.onAtHourChange.bind(this)(e)}
                    value={this.state.value[HOUR_POSITION_INDEX]}
                  >
                    {this.makeHoursOptions()}
                  </Input>
                  <Input
                    type="select"
                    className="mr-sm-1 minutes"
                    disabled={isEveryHour(this.state.value)}
                    onChange={(e) => this.onAtMinuteChange.bind(this)(e)}
                    value={this.state.value[MINUTE_POSITION_INDEX]}
                  >
                    {this.makeMinutesOptions()}
                  </Input>
                  <TzDropdown
                    defaultValue={this.state.timezone}
                    disabled={isEveryHour(this.state.value)}
                    id="hourly-dropdown"
                    onChange={this.onTimezoneChange.bind(this)}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}
