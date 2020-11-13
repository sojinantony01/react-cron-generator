// @ts-ignore
import parser from 'cron-parser';
import cronstrue from 'cronstrue';
import moment from 'moment';
import React, { Component } from 'react';
import { Container, Nav, NavItem, NavLink, Spinner } from 'reactstrap';

import { HOUR_POSITION_INDEX, MINUTE_POSITION_INDEX } from './const';
import Daily, { DEFAULT_VALUE as DAILY_DEFAULT_VALUE, isDaily } from './daily';
import { getDifferenceHourMinutesTzToTz, replaceElemAtPos } from './helpers';
import Hourly, { DEFAULT_VALUE as HOURLY_DEFAULT_VALUE, isHourly } from './hourly';
import Minutes, { DEFAULT_VALUE as MINUTES_DEFAULT_VALUE, isMinutes } from './minutes';
import Monthly, { DEFAULT_VALUE as MONTHLY_DEFAULT_VALUE, isMonthly } from './monthly';
import Weekly, { DEFAULT_VALUE as WEEKLY_DEFAULT_VALUE, isWeekly } from './weekly';
// import Yearly, { DEFAULT_VALUE as YEARLY_DEFAULT_VALUE } from './yearly';

const TAB_MINUTES = 'Minutes';
const TAB_HOURLY = 'Hourly';
const TAB_DAILY = 'Daily';
const TAB_WEEKLY = 'Weekly';
const TAB_MONTHLY = 'Monthly';
// const TAB_YEARLY = 'Yearly';

const tabs = [TAB_MINUTES, TAB_HOURLY, TAB_DAILY, TAB_WEEKLY, TAB_MONTHLY]; //, TAB_YEARLY
export interface CronOnChangeEvent {
  serverCronString: string;
  clientCronString?: string;
  timezone?: string;
}

export interface Props {
  value?: string;
  timezone?: string;
  onChange: (event: CronOnChangeEvent) => void;
  serverTimezone?: string;
}

export interface State {
  clientCron: string[];
  serverCron: string[];
  timezone?: string;
  selectedTab?: string;
}

export default class Cron extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  public readonly state: Readonly<State> = {
    clientCron: MINUTES_DEFAULT_VALUE,
    serverCron: MINUTES_DEFAULT_VALUE,
  };

  componentDidMount() {
    const value = this.props.value && this.props.value.split(' ').length === 5 ? this.props.value.split(' ') : MINUTES_DEFAULT_VALUE;

    let selectedTab;

    if (isMinutes(value)) {
      selectedTab = TAB_MINUTES;
    } else if (isHourly(value)) {
      selectedTab = TAB_HOURLY;
    } else if (isDaily(value)) {
      selectedTab = TAB_DAILY;
    } else if (isWeekly(value)) {
      selectedTab = TAB_WEEKLY;
    } else if (isMonthly(value)) {
      selectedTab = TAB_MONTHLY;
    }
    let newValue = value;
    if (this.props.timezone) {
      const [hours, minutes] = getDifferenceHourMinutesTzToTz(
        this.props.timezone,
        this.props.serverTimezone || 'Etc/UTC',
        value[HOUR_POSITION_INDEX],
        value[MINUTE_POSITION_INDEX],
      ).split(':');
      newValue = replaceElemAtPos(newValue, HOUR_POSITION_INDEX, hours);
      newValue = replaceElemAtPos(newValue, MINUTE_POSITION_INDEX, minutes);
    }
    this.setState({
      selectedTab,
      clientCron: newValue,
      serverCron: value,
      timezone: this.props.timezone,
    });
  }

  onValueChange(value: string[], timezone?: string) {
    let newValue = value;
    if (!value || !value.length) {
      value = MINUTES_DEFAULT_VALUE;
      newValue = MINUTES_DEFAULT_VALUE;
    } else if (timezone) {
      const [hours, minutes] = getDifferenceHourMinutesTzToTz(
        this.props.serverTimezone || 'Etc/UTC',
        timezone,
        value[HOUR_POSITION_INDEX],
        value[MINUTE_POSITION_INDEX],
      ).split(':');
      newValue = replaceElemAtPos(newValue, HOUR_POSITION_INDEX, hours);
      newValue = replaceElemAtPos(newValue, MINUTE_POSITION_INDEX, minutes);
    }

    this.setState({ serverCron: newValue, clientCron: value, timezone });
    this.props.onChange({
      serverCronString: newValue.join(' '),
      timezone,
      clientCronString: value.join(' '),
    });
  }

  makeDefaultValueForTab(tab: string): string[] {
    switch (tab) {
      case TAB_MINUTES:
        return MINUTES_DEFAULT_VALUE;
      case TAB_HOURLY:
        return HOURLY_DEFAULT_VALUE;
      case TAB_DAILY:
        return DAILY_DEFAULT_VALUE;
      case TAB_WEEKLY:
        return WEEKLY_DEFAULT_VALUE;
      case TAB_MONTHLY:
        return MONTHLY_DEFAULT_VALUE;
      // case TAB_YEARLY:
      //   return YEARLY_DEFAULT_VALUE;
      default:
        throw new Error('Wrong tab!');
    }
  }

  onTabSelect(selectedTab: string) {
    const value = this.makeDefaultValueForTab(selectedTab);
    this.setState({
      selectedTab,
      clientCron: value,
      timezone: undefined,
      serverCron: value,
    });
    // this.parentChange(this.defaultValue(tab))
    this.onValueChange(value);
  }

  getHeaders() {
    return tabs.map((tab) => (
      <NavItem key={`tab-${tab}`}>
        <NavLink href="#" active={this.state.selectedTab === tab} onClick={this.onTabSelect.bind(this, tab)}>
          {tab}
        </NavLink>
      </NavItem>
    ));
  }

  getTabComponent() {
    switch (this.state.selectedTab) {
      case TAB_MINUTES:
        return <Minutes value={this.state.clientCron} onChange={this.onValueChange.bind(this)} />;
      case TAB_HOURLY:
        return <Hourly defaultTimezone={this.state.timezone} value={this.state.clientCron} onChange={this.onValueChange.bind(this)} />;
      case TAB_DAILY:
        return <Daily defaultTimezone={this.state.timezone} value={this.state.clientCron} onChange={this.onValueChange.bind(this)} />;
      case TAB_WEEKLY:
        return <Weekly defaultTimezone={this.state.timezone} value={this.state.clientCron} onChange={this.onValueChange.bind(this)} />;
      case TAB_MONTHLY:
        return <Monthly defaultTimezone={this.state.timezone} value={this.state.clientCron} onChange={this.onValueChange.bind(this)} />;
      // case TAB_YEARLY:
      //   return <Yearly value={this.state.value} onChange={this.onValueChange.bind(this)} />;
      default:
        throw new Error('Unknown tab selected');
    }
  }

  getFooter() {
    try {
      const humanizedCronExpression = cronstrue.toString(this.state.clientCron.join(' '));
      const cronInterval = parser.parseExpression(this.state.clientCron.join(' '));
      const cronDate = cronInterval.next().toDate();
      let humanizedNextDate = moment(cronDate).fromNow();
      if (this.state.timezone) {
        humanizedNextDate = moment(cronDate).tz(this.state.timezone, true).fromNow();
      }

      return (
        <div className="alert alert-info text-center">
          {humanizedCronExpression} ({humanizedNextDate})
        </div>
      );
    } catch (error) {
      return <div className="alert alert-danger text-center">Cron expression is invalid {error.toString()}</div>;
    }
  }

  render() {
    return (
      <div className="react-cron-generator">
        {this.state.selectedTab ? (
          <div>
            <Nav fill pills>
              {this.getHeaders()}
            </Nav>
            <Container>{this.getTabComponent()}</Container>
            {this.getFooter()}
          </div>
        ) : (
          <Spinner size="sm" />
        )}
      </div>
    );
  }
}
