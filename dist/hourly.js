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
    this.onHourChange = this.onHourChange.bind(this);
    this.onAtHourChange = this.onAtHourChange.bind(this);
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
  }

  componentWillMount() {
    this.state.value = this.props.value;

    if (this.state.value[2].split('/')[1] || this.state.value[2] === '*') {
      this.state.every = true;
    }
  }

  onHourChange(e) {
    if (this.state.every && (e.target.value > 0 && e.target.value < 24 || e.target.value == '')) {
      let val = ['0', '0', '*', '*', '*', '?', '*'];

      if (e.target.value == '') {
        val[2] = '';
      } else {
        val[2] = `0/${e.target.value}`;
      }

      val[3] = '1/1';
      this.props.onChange(val);
    }
  }

  onAtHourChange(e) {
    let val = ['0', this.state.value[1], '*', '*', '*', '?', '*'];
    val[2] = `${e.target.value}`;
    val[3] = '1/1';
    this.props.onChange(val);
  }

  onAtMinuteChange(e) {
    let val = ['0', '*', this.state.value[2], '*', '*', '?', '*'];
    val[1] = `${e.target.value}`;
    val[3] = '1/1';
    this.props.onChange(val);
  }

  render() {
    this.state.value = this.props.value;
    return _react.default.createElement(_reactstrap.Container, null, _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Col, {
      className: "col-6"
    }, _react.default.createElement(_reactstrap.Form, {
      inline: true
    }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
      for: "every"
    }, _react.default.createElement(_reactstrap.CustomInput, {
      id: "variant-selector-every",
      type: "radio",
      name: "variantSelector",
      checked: this.state.every ? true : false,
      onClick: e => {
        this.setState({
          every: true
        });
        this.props.onChange(['0', '0', '0/1', '1/1', '*', '?', '*']);
      }
    }), "Every"), _react.default.createElement(_reactstrap.Input, {
      id: "every",
      className: "mx-sm-1",
      type: "Number",
      disabled: this.state.every ? false : true,
      min: 1,
      max: 23,
      value: this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : '',
      onChange: this.onHourChange
    }), _react.default.createElement(_reactstrap.FormText, {
      color: "muted"
    }, "Must be integer value (1 - 23)."))))), _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Col, {
      className: "col-6"
    }, _react.default.createElement(_reactstrap.Form, {
      inline: true
    }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
      for: "at",
      className: "mr-sm-1"
    }, _react.default.createElement(_reactstrap.CustomInput, {
      id: "variant-selector-at",
      type: "radio",
      name: "variantSelector",
      checked: this.state.every ? false : true,
      onClick: e => {
        this.setState({
          every: false
        });
        this.props.onChange();
      }
    }), "At"), _react.default.createElement(_reactstrap.Input, {
      className: "mr-sm-1 hours",
      type: "select",
      disabled: this.state.every ? true : false,
      onChange: this.onAtHourChange,
      value: this.state.value[2]
    }, this.getHours()), _react.default.createElement(_reactstrap.Input, {
      type: "select",
      className: "mr-sm-1 minutes",
      disabled: this.state.every ? true : false,
      onChange: this.onAtMinuteChange,
      value: this.state.value[1]
    }, this.getMinutes()))))));
  }

  getHours() {
    let hours = [];

    for (let i = 0; i < 24; i++) {
      hours.push(_react.default.createElement("option", {
        value: i < 10 ? `0${i}` : i
      }, i < 10 ? `0${i}` : i));
    }

    return hours;
  }

  getMinutes() {
    let minutes = [];

    for (let i = 0; i < 60; i++) {
      minutes.push(_react.default.createElement("option", {
        value: i < 10 ? `0${i}` : i
      }, i < 10 ? `0${i}` : i));
    }

    return minutes;
  }

}

exports.default = Cron;