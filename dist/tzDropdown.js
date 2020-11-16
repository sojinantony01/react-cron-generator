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
exports.TzDropdown = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const react_1 = __importStar(require("react"));
// @ts-ignore
const react_bootstrap_typeahead_1 = require("react-bootstrap-typeahead");
class TzDropdown extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false,
        };
        this.toggle = () => {
            const { isOpen } = this.state;
            this.setState({ isOpen: !isOpen });
        };
    }
    render() {
        return (react_1.default.createElement(react_bootstrap_typeahead_1.Typeahead, { disabled: this.props.disabled, multiple: false, "data-testid": `timezone-dropdown-${this.props.id}`, id: `timezone-dropdown-${this.props.id}`, onChange: (selected) => {
                this.props.onChange(selected[0]);
            }, options: moment_timezone_1.default.tz.names(), emptyLabel: "No Timezone found", placeholder: "Select a Timezone", selected: this.props.defaultValue ? [this.props.defaultValue] : [] }));
    }
}
exports.TzDropdown = TzDropdown;
//# sourceMappingURL=tzDropdown.js.map