"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMonthly = exports.DEFAULT_VALUE = void 0;
const react_1 = __importDefault(require("react"));
const reactstrap_1 = require("reactstrap");
const const_1 = require("./const");
const helpers_1 = require("./helpers");
exports.DEFAULT_VALUE = ['0', '0', '1', '*', '*'];
exports.isMonthly = (value) => {
    return (helpers_1.isDigit(value[const_1.MINUTE_POSITION_INDEX]) &&
        helpers_1.isDigit(value[const_1.HOUR_POSITION_INDEX]) &&
        helpers_1.isDigit(value[const_1.DAY_OF_MONTH_POSITION_INDEX]) &&
        value[const_1.MONTH_POSITION_INDEX] === '*' &&
        value[const_1.DAY_OF_WEEK_POSITION_INDEX] === '*');
};
class default_1 extends helpers_1.BaseCronComponent {
    constructor(props) {
        super(props, exports.DEFAULT_VALUE);
        this.state = {
            value: exports.DEFAULT_VALUE,
        };
    }
    onDayChange(e) {
        console.log(`e.target.value => ${e.target.value}`);
        if ((e.target.value > 0 && e.target.value <= 31) || e.target.value !== '') {
            const value = helpers_1.replaceElemAtPos(this.state.value, const_1.DAY_OF_MONTH_POSITION_INDEX, e.target.value);
            console.log(`value => ${value}`);
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
    render() {
        // this.state.value = this.props.value;
        return (react_1.default.createElement(reactstrap_1.Form, { className: "mt-sm-1 justify-content-center align-items-center panel-row", inline: true },
            react_1.default.createElement("div", null,
                react_1.default.createElement(reactstrap_1.Row, { className: "mt-sm-1" },
                    react_1.default.createElement(reactstrap_1.Col, null,
                        react_1.default.createElement(reactstrap_1.Form, { inline: true },
                            react_1.default.createElement(reactstrap_1.FormGroup, null,
                                "Day of every month",
                                ' ',
                                react_1.default.createElement(reactstrap_1.Input, { className: "mr-sm-1", type: "number", min: 1, max: 31, value: helpers_1.isDigit(this.state.value[const_1.DAY_OF_MONTH_POSITION_INDEX]) ? parseInt(this.state.value[const_1.DAY_OF_MONTH_POSITION_INDEX]) : '', onChange: (e) => this.onDayChange.bind(this)(e) }),
                                react_1.default.createElement(reactstrap_1.FormText, { color: "muted" }, "Must be integer value (1 - 31)."))))),
                react_1.default.createElement(reactstrap_1.Row, { className: "mt-sm-1" },
                    react_1.default.createElement(reactstrap_1.Col, null,
                        react_1.default.createElement(reactstrap_1.Form, { inline: true },
                            react_1.default.createElement(reactstrap_1.FormGroup, null,
                                react_1.default.createElement(reactstrap_1.Label, { className: "mr-sm-1" }, "Start time"),
                                react_1.default.createElement(reactstrap_1.Input, { className: "mr-sm-1 hours", type: "select", min: 0, max: 23, value: this.state.value[const_1.HOUR_POSITION_INDEX], onChange: (e) => this.onAtHourChange.bind(this)(e) }, this.makeHoursOptions()),
                                react_1.default.createElement(reactstrap_1.Input, { className: "minutes", type: "select", min: 0, max: 59, value: this.state.value[const_1.MINUTE_POSITION_INDEX], onChange: (e) => this.onAtMinuteChange.bind(this)(e) }, this.makeMinutesOptions()))))))));
    }
}
exports.default = default_1;
//# sourceMappingURL=monthly.js.map