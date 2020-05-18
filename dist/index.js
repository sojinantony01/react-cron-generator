// @ts-ignore
import cronstrue from 'cronstrue';
import React, { Component } from 'react';
import { Container, Nav, NavItem, NavLink, Spinner } from 'reactstrap';
// import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX } from './const';
import Daily, { DEFAULT_VALUE as DAILY_DEFAULT_VALUE, isDaily } from './daily';
import Hourly, { DEFAULT_VALUE as HOURLY_DEFAULT_VALUE, isHourly } from './hourly';
import Minutes, { DEFAULT_VALUE as MINUTES_DEFAULT_VALUE, isMinutes } from './minutes';
// import Monthly, { DEFAULT_VALUE as MONTHLY_DEFAULT_VALUE, isMonthly } from './monthly';
import Weekly, { DEFAULT_VALUE as WEEKLY_DEFAULT_VALUE, isWeekly } from './weekly';
// import Yearly, { DEFAULT_VALUE as YEARLY_DEFAULT_VALUE } from './yearly';
const TAB_MINUTES = 'Minutes';
const TAB_HOURLY = 'Hourly';
const TAB_DAILY = 'Daily';
const TAB_WEEKLY = 'Weekly';
// const TAB_MONTHLY = 'Monthly';
// const TAB_YEARLY = 'Yearly';
const tabs = [TAB_MINUTES, TAB_HOURLY, TAB_DAILY, TAB_WEEKLY]; // , TAB_MONTHLY, TAB_YEARLY
export default class Cron extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: MINUTES_DEFAULT_VALUE,
    };
  }
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
      // } else if (isMonthly(value)) {
      //   selectedTab = TAB_MONTHLY;
    }
    this.setState({
      selectedTab,
      value,
    });
  }
  onValueChange(value) {
    if (!value || !value.length) {
      value = MINUTES_DEFAULT_VALUE;
    }
    this.setState({ value });
    this.props.onChange(value.join(' '));
  }
  makeDefaultValueForTab(tab) {
    switch (tab) {
      case TAB_MINUTES:
        return MINUTES_DEFAULT_VALUE;
      case TAB_HOURLY:
        return HOURLY_DEFAULT_VALUE;
      case TAB_DAILY:
        return DAILY_DEFAULT_VALUE;
      case TAB_WEEKLY:
        return WEEKLY_DEFAULT_VALUE;
      // case TAB_MONTHLY:
      //   return MONTHLY_DEFAULT_VALUE;
      // case TAB_YEARLY:
      //   return YEARLY_DEFAULT_VALUE;
      default:
        throw new Error('Wrong tab!');
    }
  }
  onTabSelect(selectedTab) {
    const value = this.makeDefaultValueForTab(selectedTab);
    this.setState({
      selectedTab,
      value,
    });
    // this.parentChange(this.defaultValue(tab))
    this.onValueChange(value);
  }
  getHeaders() {
    return tabs.map((tab) =>
      React.createElement(
        NavItem,
        { key: `tab-${tab}` },
        React.createElement(NavLink, { href: '#', active: this.state.selectedTab === tab, onClick: this.onTabSelect.bind(this, tab) }, tab),
      ),
    );
  }
  getTabComponent() {
    switch (this.state.selectedTab) {
      case TAB_MINUTES:
        return React.createElement(Minutes, { value: this.state.value, onChange: this.onValueChange.bind(this) });
      case TAB_HOURLY:
        return React.createElement(Hourly, { value: this.state.value, onChange: this.onValueChange.bind(this) });
      case TAB_DAILY:
        return React.createElement(Daily, { value: this.state.value, onChange: this.onValueChange.bind(this) });
      case TAB_WEEKLY:
        return React.createElement(Weekly, { value: this.state.value, onChange: this.onValueChange.bind(this) });
      // case TAB_MONTHLY:
      //   return <Monthly value={this.state.value} onChange={this.onValueChange.bind(this)} />;
      // case TAB_YEARLY:
      //   return <Yearly value={this.state.value} onChange={this.onValueChange.bind(this)} />;
      default:
        throw new Error('Unknown tab selected');
    }
  }
  getFooter() {
    return React.createElement('div', null, cronstrue.toString(this.state.value.join(' ')));
  }
  render() {
    return React.createElement(
      'div',
      { className: 'react-cron-generator' },
      this.state.selectedTab
        ? React.createElement(
            'div',
            null,
            React.createElement(Nav, { fill: true, pills: true }, this.getHeaders()),
            React.createElement(Container, null, this.getTabComponent()),
            React.createElement('div', { className: 'alert alert-info text-center' }, this.getFooter()),
          )
        : React.createElement(Spinner, { size: 'sm' }),
    );
  }
}
//# sourceMappingURL=index.js.map
