import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';

import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX } from './const';
import { replaceElemAtPos, BaseCronComponent, BaseTabProps, BaseTabState, isDigit } from './helpers';

export const DEFAULT_VALUE = ['0', '0', '*/1', '*', '*'];

const isEveryDay = (value: string[]) => {
  return (
    isDigit(value[MINUTE_POSITION_INDEX]) &&
    isDigit(value[HOUR_POSITION_INDEX]) &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('/') &&
    value[DAY_OF_WEEK_POSITION_INDEX] === '*'
  );
};

const isAtDayHour = (value: string[]) => {
  return (
    isDigit(value[MINUTE_POSITION_INDEX]) &&
    isDigit(value[HOUR_POSITION_INDEX]) &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    value[DAY_OF_WEEK_POSITION_INDEX] === 'MON-FRI'
  );
};

export const isDaily = (value: string[]) => {
  return isEveryDay(value) || isAtDayHour(value);
};

export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
  state: Readonly<BaseTabState> = {
    value: DEFAULT_VALUE,
  };

  constructor(props: BaseTabProps) {
    super(props, DEFAULT_VALUE);
  }

  protected onEveryDayChange(e: any) {
    if ((e.target.value > 0 && e.target.value < 24) || e.target.value === '') {
      const value = replaceElemAtPos(this.state.value, DAY_OF_MONTH_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
      this.setState({ value });
      this.notifyOnChange(value);
    }
  }

  protected onAtHourChange(e: any) {
    const value = replaceElemAtPos(this.state.value, HOUR_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }

  protected onAtMinuteChange(e: any) {
    const value = replaceElemAtPos(this.state.value, MINUTE_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }

  protected toggleEvery(every: boolean) {
    const value = every
      ? DEFAULT_VALUE
      : replaceElemAtPos(replaceElemAtPos(DEFAULT_VALUE, DAY_OF_MONTH_POSITION_INDEX, '*'), DAY_OF_WEEK_POSITION_INDEX, 'MON-FRI');
    this.setState({
      value,
    });
    this.notifyOnChange(value);
  }

  render() {
    return (
      <Form className="mt-sm-1 justify-content-center align-items-center panel-row" inline>
        <div>
          <Row className="mt-sm-1">
            <Col>
              <Form inline>
                <FormGroup>
                  <Label for="every">
                    <CustomInput
                      id="variant-selector-every"
                      type="radio"
                      name="variantSelector"
                      checked={isEveryDay(this.state.value)}
                      onClick={(e) => this.toggleEvery.bind(this)(true)}
                    />
                    Every
                  </Label>
                  <Input
                    type="number"
                    className="mx-sm-1"
                    disabled={isAtDayHour(this.state.value)}
                    min={1}
                    max={31}
                    value={
                      this.state.value[DAY_OF_MONTH_POSITION_INDEX].includes('/') ? this.state.value[DAY_OF_MONTH_POSITION_INDEX].split('/')[1] : ''
                    }
                    onChange={(e) => this.onEveryDayChange.bind(this)(e)}
                  />
                  <FormText color="muted">Must be integer value (1 - 31).</FormText>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row className="mt-sm-1">
            <Col>
              <Form inline>
                <FormGroup>
                  <Label for="every-week-day" className="mr-sm-1">
                    <CustomInput
                      id="variant-selector-every-week-day"
                      type="radio"
                      name="variantSelector"
                      checked={isAtDayHour(this.state.value)}
                      onClick={(e) => this.toggleEvery.bind(this)(false)}
                    />
                    Every Mon - Fri at
                  </Label>
                  <Input
                    id="DailyHours"
                    className="mr-sm-1 hours"
                    type="select"
                    disabled={isEveryDay(this.state.value)}
                    onChange={(e) => this.onAtHourChange.bind(this)(e)}
                    value={this.state.value[HOUR_POSITION_INDEX]}
                  >
                    {this.makeHoursOptions()}
                  </Input>
                  <Input
                    id="DailyMinutes"
                    className="mr-sm-1 minutes"
                    type="select"
                    disabled={isEveryDay(this.state.value)}
                    onChange={(e) => this.onAtMinuteChange.bind(this)(e)}
                    value={this.state.value[MINUTE_POSITION_INDEX]}
                  >
                    {this.makeMinutesOptions()}
                  </Input>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}
