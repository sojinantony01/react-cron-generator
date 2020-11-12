"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const cron_parser_1 = __importDefault(require("cron-parser"));
const cronstrue_1 = __importDefault(require("cronstrue"));
const moment_1 = __importDefault(require("moment"));
const react_1 = __importStar(require("react"));
const reactstrap_1 = require("reactstrap");
const const_1 = require("./const");
const daily_1 = __importStar(require("./daily"));
const helpers_1 = require("./helpers");
const hourly_1 = __importStar(require("./hourly"));
const minutes_1 = __importStar(require("./minutes"));
const monthly_1 = __importStar(require("./monthly"));
const weekly_1 = __importStar(require("./weekly"));
// import Yearly, { DEFAULT_VALUE as YEARLY_DEFAULT_VALUE } from './yearly';
const TAB_MINUTES = 'Minutes';
const TAB_HOURLY = 'Hourly';
const TAB_DAILY = 'Daily';
const TAB_WEEKLY = 'Weekly';
const TAB_MONTHLY = 'Monthly';
// const TAB_YEARLY = 'Yearly';
const tabs = [TAB_MINUTES, TAB_HOURLY, TAB_DAILY, TAB_WEEKLY, TAB_MONTHLY]; //, TAB_YEARLY
class Cron extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: minutes_1.DEFAULT_VALUE,
            convertedValue: minutes_1.DEFAULT_VALUE,
        };
    }
    componentDidMount() {
        const value = this.props.value && this.props.value.split(' ').length === 5 ? this.props.value.split(' ') : minutes_1.DEFAULT_VALUE;
        let selectedTab;
        if (minutes_1.isMinutes(value)) {
            selectedTab = TAB_MINUTES;
        }
        else if (hourly_1.isHourly(value)) {
            selectedTab = TAB_HOURLY;
        }
        else if (daily_1.isDaily(value)) {
            selectedTab = TAB_DAILY;
        }
        else if (weekly_1.isWeekly(value)) {
            selectedTab = TAB_WEEKLY;
        }
        else if (monthly_1.isMonthly(value)) {
            selectedTab = TAB_MONTHLY;
        }
        this.setState({
            selectedTab,
            value,
            convertedValue: value,
            timezone: this.props.timezone,
        });
    }
    onValueChange(value, timezone) {
        let newValue = value;
        if (!value || !value.length) {
            value = minutes_1.DEFAULT_VALUE;
            newValue = minutes_1.DEFAULT_VALUE;
        }
        else if (timezone) {
            const [hours, minutes] = helpers_1.getDifferenceHourMinutesTzToTz(this.props.serverTimezone || 'Etc/UTC', timezone, value[const_1.HOUR_POSITION_INDEX], value[const_1.MINUTE_POSITION_INDEX]).split(':');
            newValue = helpers_1.replaceElemAtPos(newValue, const_1.HOUR_POSITION_INDEX, hours);
            newValue = helpers_1.replaceElemAtPos(newValue, const_1.MINUTE_POSITION_INDEX, minutes);
        }
        this.setState({ convertedValue: newValue, value });
        this.props.onChange(newValue.join(' '), timezone);
    }
    makeDefaultValueForTab(tab) {
        switch (tab) {
            case TAB_MINUTES:
                return minutes_1.DEFAULT_VALUE;
            case TAB_HOURLY:
                return hourly_1.DEFAULT_VALUE;
            case TAB_DAILY:
                return daily_1.DEFAULT_VALUE;
            case TAB_WEEKLY:
                return weekly_1.DEFAULT_VALUE;
            case TAB_MONTHLY:
                return monthly_1.DEFAULT_VALUE;
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
            timezone: undefined,
            convertedValue: value,
        });
        // this.parentChange(this.defaultValue(tab))
        this.onValueChange(value);
    }
    getHeaders() {
        return tabs.map((tab) => (react_1.default.createElement(reactstrap_1.NavItem, { key: `tab-${tab}` },
            react_1.default.createElement(reactstrap_1.NavLink, { href: "#", active: this.state.selectedTab === tab, onClick: this.onTabSelect.bind(this, tab) }, tab))));
    }
    getTabComponent() {
        switch (this.state.selectedTab) {
            case TAB_MINUTES:
                return react_1.default.createElement(minutes_1.default, { value: this.state.value, onChange: this.onValueChange.bind(this) });
            case TAB_HOURLY:
                return react_1.default.createElement(hourly_1.default, { defaultTimezone: this.state.timezone, value: this.state.value, onChange: this.onValueChange.bind(this) });
            case TAB_DAILY:
                return react_1.default.createElement(daily_1.default, { defaultTimezone: this.state.timezone, value: this.state.value, onChange: this.onValueChange.bind(this) });
            case TAB_WEEKLY:
                return react_1.default.createElement(weekly_1.default, { defaultTimezone: this.state.timezone, value: this.state.value, onChange: this.onValueChange.bind(this) });
            case TAB_MONTHLY:
                return react_1.default.createElement(monthly_1.default, { defaultTimezone: this.state.timezone, value: this.state.value, onChange: this.onValueChange.bind(this) });
            // case TAB_YEARLY:
            //   return <Yearly value={this.state.value} onChange={this.onValueChange.bind(this)} />;
            default:
                throw new Error('Unknown tab selected');
        }
    }
    getFooter() {
        try {
            const humanizedCronExpression = cronstrue_1.default.toString(this.state.value.join(' '));
            const cronInterval = cron_parser_1.default.parseExpression(this.state.value.join(' '));
            const humanizedNextDate = moment_1.default(cronInterval.next().toDate()).fromNow();
            return (react_1.default.createElement("div", { className: "alert alert-info text-center" },
                humanizedCronExpression,
                " (",
                humanizedNextDate,
                ")"));
        }
        catch (error) {
            return react_1.default.createElement("div", { className: "alert alert-danger text-center" },
                "Cron expression is invalid ",
                error.toString());
        }
    }
    render() {
        return (react_1.default.createElement("div", { className: "react-cron-generator" }, this.state.selectedTab ? (react_1.default.createElement("div", null,
            react_1.default.createElement(reactstrap_1.Nav, { fill: true, pills: true }, this.getHeaders()),
            react_1.default.createElement(reactstrap_1.Container, null, this.getTabComponent()),
            this.getFooter())) : (react_1.default.createElement(reactstrap_1.Spinner, { size: "sm" }))));
    }
}
exports.default = Cron;
//# sourceMappingURL=index.js.map