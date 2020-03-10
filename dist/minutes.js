"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Cron extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(e) {
    if (e.target.value > 0 && e.target.value < 60 || e.target.value == '') {
      let val = ['0', '*', '*', '*', '*', '?', '*'];

      if (e.target.value == '') {
        val[1] = '';
      } else {
        val[1] = `0/${e.target.value}`;
      }

      this.props.onChange(val);
    }
  }

  render() {
    this.state.value = this.props.value;
    return _react.default.createElement(_reactstrap.Form, {
      className: "mt-sm-1",
      inline: true
    }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
      for: "every"
    }, "Every"), _react.default.createElement(_reactstrap.Input, {
      id: "every",
      className: "mx-sm-1",
      placeholder: "Minute value",
      type: "Number",
      min: 1,
      max: 59,
      onChange: this.onChange.bind(this),
      value: this.state.value[1].split('/')[1]
    }), _react.default.createElement(_reactstrap.FormText, {
      color: "muted"
    }, "Must be integer value (1 - 59).")));
  }

}

exports.default = Cron;