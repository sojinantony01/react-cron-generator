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
exports.DEFAULT_VALUE = void 0;
const react_1 = __importStar(require("react"));
const reactstrap_1 = require("reactstrap");
exports.DEFAULT_VALUE = [];
class Cron extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (react_1.default.createElement(reactstrap_1.Form, { className: "mt-sm-1 justify-content-center align-items-center panel-row", inline: true },
            react_1.default.createElement("div", null, "yearly")));
    }
}
exports.default = Cron;
//# sourceMappingURL=yearly.js.map