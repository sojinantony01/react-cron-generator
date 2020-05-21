"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDaily = exports.DEFAULT_VALUE = void 0;
const react_1 = __importDefault(require("react"));
const reactstrap_1 = require("reactstrap");
const const_1 = require("./const");
const helpers_1 = require("./helpers");
exports.DEFAULT_VALUE = ['0', '0', '*/1', '*', '*'];
const isEveryDay = (value) => {
    return (helpers_1.isDigit(value[const_1.MINUTE_POSITION_INDEX]) &&
        helpers_1.isDigit(value[const_1.HOUR_POSITION_INDEX]) &&
        value[const_1.DAY_OF_MONTH_POSITION_INDEX].includes('/') &&
        value[const_1.DAY_OF_WEEK_POSITION_INDEX] === '*');
};
const isAtDayHour = (value) => {
    return (helpers_1.isDigit(value[const_1.MINUTE_POSITION_INDEX]) &&
        helpers_1.isDigit(value[const_1.HOUR_POSITION_INDEX]) &&
        value[const_1.DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
        value[const_1.DAY_OF_WEEK_POSITION_INDEX] === 'MON-FRI');
};
exports.isDaily = (value) => {
    return isEveryDay(value) || isAtDayHour(value);
};
class default_1 extends helpers_1.BaseCronComponent {
    constructor(props) {
        super(props, exports.DEFAULT_VALUE);
        this.state = {
            value: exports.DEFAULT_VALUE,
        };
    }
    onEveryDayChange(e) {
        if ((e.target.value > 0 && e.target.value < 24) || e.target.value === '') {
            const value = helpers_1.replaceElemAtPos(this.state.value, const_1.DAY_OF_MONTH_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
            this.setState({ value });
            this.notifyOnChange(value);
        }
    }
    onAtHourChange(e) {
        const value = helpers_1.replaceElemAtPos(this.state.value, const_1.HOUR_POSITION_INDEX, e.target.value);
        this.setState({ value });
        this.notifyOnChange(value);
    }
    onAtMinuteChange(e) {
        const value = helpers_1.replaceElemAtPos(this.state.value, const_1.MINUTE_POSITION_INDEX, e.target.value);
        this.setState({ value });
        this.notifyOnChange(value);
    }
    toggleEvery(every) {
        const value = every
            ? exports.DEFAULT_VALUE
            : helpers_1.replaceElemAtPos(helpers_1.replaceElemAtPos(exports.DEFAULT_VALUE, const_1.DAY_OF_MONTH_POSITION_INDEX, '*'), const_1.DAY_OF_WEEK_POSITION_INDEX, 'MON-FRI');
        this.setState({
            value,
        });
        this.notifyOnChange(value);
    }
    render() {
        return (react_1.default.createElement(reactstrap_1.Form, { className: "mt-sm-1 justify-content-center align-items-center panel-row", inline: true },
            react_1.default.createElement("div", null,
                react_1.default.createElement(reactstrap_1.Row, { className: "mt-sm-1" },
                    react_1.default.createElement(reactstrap_1.Col, null,
                        react_1.default.createElement(reactstrap_1.Form, { inline: true },
                            react_1.default.createElement(reactstrap_1.FormGroup, null,
                                react_1.default.createElement(reactstrap_1.Label, { for: "every" },
                                    react_1.default.createElement(reactstrap_1.CustomInput, { id: "variant-selector-every", type: "radio", name: "variantSelector", checked: isEveryDay(this.state.value), onClick: (e) => this.toggleEvery.bind(this)(true) }),
                                    "Every"),
                                react_1.default.createElement(reactstrap_1.Input, { type: "number", className: "mx-sm-1", disabled: isAtDayHour(this.state.value), min: 1, max: 31, value: this.state.value[const_1.DAY_OF_MONTH_POSITION_INDEX].includes('/') ? this.state.value[const_1.DAY_OF_MONTH_POSITION_INDEX].split('/')[1] : '', onChange: (e) => this.onEveryDayChange.bind(this)(e) }),
                                react_1.default.createElement(reactstrap_1.FormText, { color: "muted" }, "Must be integer value (1 - 31)."))))),
                react_1.default.createElement(reactstrap_1.Row, { className: "mt-sm-1" },
                    react_1.default.createElement(reactstrap_1.Col, null,
                        react_1.default.createElement(reactstrap_1.Form, { inline: true },
                            react_1.default.createElement(reactstrap_1.FormGroup, null,
                                react_1.default.createElement(reactstrap_1.Label, { for: "every-week-day", className: "mr-sm-1" },
                                    react_1.default.createElement(reactstrap_1.CustomInput, { id: "variant-selector-every-week-day", type: "radio", name: "variantSelector", checked: isAtDayHour(this.state.value), onClick: (e) => this.toggleEvery.bind(this)(false) }),
                                    "Every Mon - Fri at"),
                                react_1.default.createElement(reactstrap_1.Input, { id: "DailyHours", className: "mr-sm-1 hours", type: "select", disabled: isEveryDay(this.state.value), onChange: (e) => this.onAtHourChange.bind(this)(e), value: this.state.value[const_1.HOUR_POSITION_INDEX] }, this.makeHoursOptions()),
                                react_1.default.createElement(reactstrap_1.Input, { id: "DailyMinutes", className: "mr-sm-1 minutes", type: "select", disabled: isEveryDay(this.state.value), onChange: (e) => this.onAtMinuteChange.bind(this)(e), value: this.state.value[const_1.MINUTE_POSITION_INDEX] }, this.makeMinutesOptions()))))))));
    }
}
exports.default = default_1;
//# sourceMappingURL=daily.js.map