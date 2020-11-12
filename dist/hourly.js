"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHourly = exports.DEFAULT_VALUE = void 0;
const react_1 = __importDefault(require("react"));
const reactstrap_1 = require("reactstrap");
const const_1 = require("./const");
const helpers_1 = require("./helpers");
const tzDropdown_1 = require("./tzDropdown");
exports.DEFAULT_VALUE = ['0', '*/1', '*', '*', '*'];
const isEveryHour = (value) => {
    return (helpers_1.isDigit(value[const_1.MINUTE_POSITION_INDEX]) &&
        value[const_1.HOUR_POSITION_INDEX].includes('*') &&
        value[const_1.DAY_OF_MONTH_POSITION_INDEX] === '*' &&
        value[const_1.MONTH_POSITION_INDEX] === '*' &&
        value[const_1.DAY_OF_WEEK_POSITION_INDEX] === '*');
};
const isAtHour = (value) => {
    return (helpers_1.isDigit(value[const_1.MINUTE_POSITION_INDEX]) &&
        helpers_1.isDigit(value[const_1.HOUR_POSITION_INDEX]) &&
        value[const_1.DAY_OF_MONTH_POSITION_INDEX] === '*' &&
        value[const_1.MONTH_POSITION_INDEX] === '*' &&
        value[const_1.DAY_OF_WEEK_POSITION_INDEX] === '*');
};
exports.isHourly = (value) => {
    return isEveryHour(value) || isAtHour(value);
};
class default_1 extends helpers_1.BaseCronComponent {
    constructor(props) {
        super(props, exports.DEFAULT_VALUE);
        this.state = {
            value: exports.DEFAULT_VALUE,
        };
    }
    onEveryHourChange(e) {
        if ((e.target.value > 0 && e.target.value < 24) || e.target.value === '') {
            const value = helpers_1.replaceElemAtPos(this.state.value, const_1.HOUR_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
            this.setState({ value });
            this.notifyOnChange(value, this.state.timezone);
        }
    }
    onAtHourChange(e) {
        const value = helpers_1.replaceElemAtPos(this.state.value, const_1.HOUR_POSITION_INDEX, e.target.value);
        this.setState({ value });
        this.notifyOnChange(value, this.state.timezone);
    }
    onAtMinuteChange(e) {
        const value = helpers_1.replaceElemAtPos(this.state.value, const_1.MINUTE_POSITION_INDEX, e.target.value);
        this.setState({ value });
        this.notifyOnChange(value, this.state.timezone);
    }
    onTimezoneChange(timezone) {
        this.setState({ timezone });
        this.notifyOnChange(this.state.value, timezone);
    }
    toggleEvery(every) {
        const value = every ? exports.DEFAULT_VALUE : helpers_1.replaceElemAtPos(exports.DEFAULT_VALUE, const_1.HOUR_POSITION_INDEX, '0');
        this.setState({ value });
        this.notifyOnChange(value, this.state.timezone);
    }
    render() {
        return (react_1.default.createElement(reactstrap_1.Form, { className: "mt-sm-1 justify-content-center align-items-center panel-row", inline: true },
            react_1.default.createElement("div", null,
                react_1.default.createElement(reactstrap_1.Row, { className: "mt-sm-1" },
                    react_1.default.createElement(reactstrap_1.Col, { className: "col-6" },
                        react_1.default.createElement(reactstrap_1.Form, { inline: true },
                            react_1.default.createElement(reactstrap_1.FormGroup, null,
                                react_1.default.createElement(reactstrap_1.Label, { for: "every" },
                                    react_1.default.createElement(reactstrap_1.CustomInput, { id: "variant-selector-every", type: "radio", name: "variantSelector", checked: isEveryHour(this.state.value), onClick: () => this.toggleEvery(true) }),
                                    "Every"),
                                react_1.default.createElement(reactstrap_1.Input, { id: "every", className: "mx-sm-1", type: "number", disabled: isAtHour(this.state.value), min: 1, max: 23, value: this.state.value[const_1.HOUR_POSITION_INDEX].includes('/') ? this.state.value[const_1.HOUR_POSITION_INDEX].split('/')[1] : '1', onChange: (e) => this.onEveryHourChange.bind(this)(e) }),
                                react_1.default.createElement(reactstrap_1.FormText, { color: "muted" }, "Must be integer value (1 - 23)."))))),
                react_1.default.createElement(reactstrap_1.Row, { className: "mt-sm-1" },
                    react_1.default.createElement(reactstrap_1.Col, { className: "col-6" },
                        react_1.default.createElement(reactstrap_1.Form, { inline: true },
                            react_1.default.createElement(reactstrap_1.FormGroup, null,
                                react_1.default.createElement(reactstrap_1.Label, { for: "at", className: "mr-sm-1" },
                                    react_1.default.createElement(reactstrap_1.CustomInput, { id: "variant-selector-at", type: "radio", name: "variantSelector", checked: isAtHour(this.state.value), onClick: () => this.toggleEvery(false) }),
                                    "At"),
                                react_1.default.createElement(reactstrap_1.Input, { className: "mr-sm-1 hours", type: "select", disabled: isEveryHour(this.state.value), onChange: (e) => this.onAtHourChange.bind(this)(e), value: this.state.value[const_1.HOUR_POSITION_INDEX] }, this.makeHoursOptions()),
                                react_1.default.createElement(reactstrap_1.Input, { type: "select", className: "mr-sm-1 minutes", disabled: isEveryHour(this.state.value), onChange: (e) => this.onAtMinuteChange.bind(this)(e), value: this.state.value[const_1.MINUTE_POSITION_INDEX] }, this.makeMinutesOptions()),
                                react_1.default.createElement(tzDropdown_1.TzDropdown, { defaultValue: this.state.timezone, disabled: isEveryHour(this.state.value), id: "hourly-dropdown", onChange: this.onTimezoneChange.bind(this) }))))))));
    }
}
exports.default = default_1;
//# sourceMappingURL=hourly.js.map