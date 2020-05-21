"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMinutes = exports.DEFAULT_VALUE = void 0;
const react_1 = __importDefault(require("react"));
const reactstrap_1 = require("reactstrap");
const const_1 = require("./const");
const helpers_1 = require("./helpers");
exports.DEFAULT_VALUE = ['*/1', '*', '*', '*', '*'];
exports.isMinutes = (value) => {
    return (value[const_1.MINUTE_POSITION_INDEX].includes('*') &&
        value[const_1.HOUR_POSITION_INDEX] === '*' &&
        value[const_1.DAY_OF_MONTH_POSITION_INDEX] === '*' &&
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
    onEveryMinuteChange(e) {
        if ((e.target.value > 0 && e.target.value < 60) || e.target.value == '') {
            const value = helpers_1.replaceElemAtPos(exports.DEFAULT_VALUE, const_1.MINUTE_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
            this.setState({ value });
            this.notifyOnChange(value);
        }
    }
    render() {
        return (react_1.default.createElement(reactstrap_1.Form, { className: "mt-sm-1 justify-content-center align-items-center panel-row", inline: true },
            react_1.default.createElement(reactstrap_1.FormGroup, null,
                react_1.default.createElement(reactstrap_1.Label, { for: "every" }, "Every"),
                react_1.default.createElement(reactstrap_1.Input, { id: "every", className: "mx-sm-1", placeholder: "*", type: "number", min: 1, max: 59, onChange: (e) => this.onEveryMinuteChange.bind(this)(e), value: this.state.value[const_1.MINUTE_POSITION_INDEX].split('/')[1] }),
                react_1.default.createElement(reactstrap_1.FormText, { color: "muted" }, "Must be integer value (1 - 59)."))));
    }
}
exports.default = default_1;
//# sourceMappingURL=minutes.js.map