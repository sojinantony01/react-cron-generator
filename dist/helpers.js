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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCronComponent = exports.isDigit = exports.replaceElemAtPos = exports.DAY_OF_WEEK_REGEXP = exports.DIGIT_REGEXP = void 0;
const react_1 = __importStar(require("react"));
exports.DIGIT_REGEXP = /^\d+$/i;
exports.DAY_OF_WEEK_REGEXP = /^(mon|tue|wed|thu|fri|sat|sun|,)+$/gi;
/**
 * Replace an array element with certain value in selected position.
 * Note! Returns new array with replaced element.
 * @param {*} array Original array to replace items in
 * @param {*} position Position to replace item in
 * @param {*} replacement The replacement
 */
exports.replaceElemAtPos = (array, position, replacement) => {
    return array ? array.map((elem, index) => (index === position ? replacement : elem)) : array;
};
exports.isDigit = (value) => new RegExp(exports.DIGIT_REGEXP).exec(value) !== null;
class BaseCronComponent extends react_1.Component {
    constructor(props, defaultValue) {
        super(props);
        this.defaultValue = defaultValue;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== nextState.value || this.state.value !== nextState.value;
    }
    componentDidUpdate() {
        this.setState({
            value: this.props.value,
        });
    }
    notifyOnChange(value) {
        this.props.onChange(value);
    }
    makeHoursOptions() {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(react_1.default.createElement("option", { value: i < 10 ? `0${i}` : i }, i < 10 ? `0${i}` : i));
        }
        return hours;
    }
    makeMinutesOptions() {
        const minutes = [];
        for (let i = 0; i < 60; i++) {
            minutes.push(react_1.default.createElement("option", { value: i < 10 ? `0${i}` : i }, i < 10 ? `0${i}` : i));
        }
        return minutes;
    }
}
exports.BaseCronComponent = BaseCronComponent;
//# sourceMappingURL=helpers.js.map