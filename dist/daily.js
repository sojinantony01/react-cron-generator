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
    this.state = {
      hour: 0,
      minute: 0
    };
    this.onDayChange = this.onDayChange.bind(this);
    this.onAtHourChange = this.onAtHourChange.bind(this);
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
  }

  componentWillMount() {
    this.state.value = this.props.value;

    if (this.state.value[3] === '?') {
      this.state.every = false;
    } else {
      this.state.every = true;
    }
  }

  onDayChange(e) {
    if (e.target.value > 0 && e.target.value < 32 || e.target.value == '') {
      let val = ['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], '*', '*', '?'];

      if (e.target.value == '') {
        val[3] = '';
      } else {
        val[3] = `1/${e.target.value}`;
      }

      this.props.onChange(val);
    }
  }

  onAtHourChange(e) {
    let val = this.state.value;
    val[2] = `${e.target.value}`;
    this.props.onChange(val);
  }

  onAtMinuteChange(e) {
    let val = this.state.value;
    val[1] = `${e.target.value}`;
    this.props.onChange(val);
  }

  render() {
    this.state.value = this.props.value;
    return _react.default.createElement(_reactstrap.Container, null, _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Form, {
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
        this.props.onChange();
      }
    }), "Every"), _react.default.createElement(_reactstrap.Input, {
      type: "Number",
      className: "mx-sm-1",
      disabled: this.state.every ? false : true,
      min: 1,
      max: 31,
      value: this.state.value[3].split('/')[1] ? this.state.value[3].split('/')[1] : '',
      onChange: this.onDayChange
    }), _react.default.createElement(_reactstrap.FormText, {
      color: "muted"
    }, "Must be integer value (1 - 31)."))))), _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Form, {
      inline: true
    }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
      for: "every-week-day",
      className: "mr-sm-1"
    }, _react.default.createElement(_reactstrap.CustomInput, {
      id: "variant-selector-every-week-day",
      type: "radio",
      name: "variantSelector",
      checked: this.state.every ? false : true,
      onClick: e => {
        this.setState({
          every: false
        });
        this.props.onChange(['0', this.state.value[1], this.state.value[2], '?', '*', 'MON-FRI']);
      }
    }), "Every Mon - Fri at"), _react.default.createElement(_reactstrap.Input, {
      id: "DailyHours",
      className: "mr-sm-1 hours",
      type: "select",
      disabled: this.state.every ? true : false,
      onChange: this.onAtHourChange,
      value: this.state.value[2]
    }, _react.default.createElement("option", {
      id: "0"
    }, "00"), _react.default.createElement("option", {
      id: "1"
    }, "01"), _react.default.createElement("option", {
      id: "2"
    }, "02"), _react.default.createElement("option", {
      id: "3"
    }, "03"), _react.default.createElement("option", {
      id: "4"
    }, "04"), _react.default.createElement("option", {
      id: "5"
    }, "05"), _react.default.createElement("option", {
      id: "6"
    }, "06"), _react.default.createElement("option", {
      id: "7"
    }, "07"), _react.default.createElement("option", {
      id: "8"
    }, "08"), _react.default.createElement("option", {
      id: "9"
    }, "09"), _react.default.createElement("option", {
      id: "10"
    }, "10"), _react.default.createElement("option", {
      id: "11"
    }, "11"), _react.default.createElement("option", {
      id: "12"
    }, "12"), _react.default.createElement("option", {
      id: "13"
    }, "13"), _react.default.createElement("option", {
      id: "14"
    }, "14"), _react.default.createElement("option", {
      id: "15"
    }, "15"), _react.default.createElement("option", {
      id: "16"
    }, "16"), _react.default.createElement("option", {
      id: "17"
    }, "17"), _react.default.createElement("option", {
      id: "18"
    }, "18"), _react.default.createElement("option", {
      id: "19"
    }, "19"), _react.default.createElement("option", {
      id: "20"
    }, "20"), _react.default.createElement("option", {
      id: "21"
    }, "21"), _react.default.createElement("option", {
      id: "22"
    }, "22"), _react.default.createElement("option", {
      id: "23"
    }, "23")), _react.default.createElement(_reactstrap.Input, {
      id: "DailyMinutes",
      className: "mr-sm-1 minutes",
      type: "select",
      disabled: this.state.every ? true : false,
      onChange: this.onAtMinuteChange,
      value: this.state.value[1]
    }, _react.default.createElement("option", {
      id: "0"
    }, "00"), _react.default.createElement("option", {
      id: "1"
    }, "01"), _react.default.createElement("option", {
      id: "2"
    }, "02"), _react.default.createElement("option", {
      id: "3"
    }, "03"), _react.default.createElement("option", {
      id: "4"
    }, "04"), _react.default.createElement("option", {
      id: "5"
    }, "05"), _react.default.createElement("option", {
      id: "6"
    }, "06"), _react.default.createElement("option", {
      id: "7"
    }, "07"), _react.default.createElement("option", {
      id: "8"
    }, "08"), _react.default.createElement("option", {
      id: "9"
    }, "09"), _react.default.createElement("option", {
      id: "10"
    }, "10"), _react.default.createElement("option", {
      id: "11"
    }, "11"), _react.default.createElement("option", {
      id: "12"
    }, "12"), _react.default.createElement("option", {
      id: "13"
    }, "13"), _react.default.createElement("option", {
      id: "14"
    }, "14"), _react.default.createElement("option", {
      id: "15"
    }, "15"), _react.default.createElement("option", {
      id: "16"
    }, "16"), _react.default.createElement("option", {
      id: "17"
    }, "17"), _react.default.createElement("option", {
      id: "18"
    }, "18"), _react.default.createElement("option", {
      id: "19"
    }, "19"), _react.default.createElement("option", {
      id: "20"
    }, "20"), _react.default.createElement("option", {
      id: "21"
    }, "21"), _react.default.createElement("option", {
      id: "22"
    }, "22"), _react.default.createElement("option", {
      id: "23"
    }, "23"), _react.default.createElement("option", {
      id: "24"
    }, "24"), _react.default.createElement("option", {
      id: "25"
    }, "25"), _react.default.createElement("option", {
      id: "26"
    }, "26"), _react.default.createElement("option", {
      id: "27"
    }, "27"), _react.default.createElement("option", {
      id: "28"
    }, "28"), _react.default.createElement("option", {
      id: "29"
    }, "29"), _react.default.createElement("option", {
      id: "30"
    }, "30"), _react.default.createElement("option", {
      id: "31"
    }, "31"), _react.default.createElement("option", {
      id: "32"
    }, "32"), _react.default.createElement("option", {
      id: "33"
    }, "33"), _react.default.createElement("option", {
      id: "34"
    }, "34"), _react.default.createElement("option", {
      id: "35"
    }, "35"), _react.default.createElement("option", {
      id: "36"
    }, "36"), _react.default.createElement("option", {
      id: "37"
    }, "37"), _react.default.createElement("option", {
      id: "38"
    }, "38"), _react.default.createElement("option", {
      id: "39"
    }, "39"), _react.default.createElement("option", {
      id: "40"
    }, "40"), _react.default.createElement("option", {
      id: "41"
    }, "41"), _react.default.createElement("option", {
      id: "42"
    }, "42"), _react.default.createElement("option", {
      id: "43"
    }, "43"), _react.default.createElement("option", {
      id: "44"
    }, "44"), _react.default.createElement("option", {
      id: "45"
    }, "45"), _react.default.createElement("option", {
      id: "46"
    }, "46"), _react.default.createElement("option", {
      id: "47"
    }, "47"), _react.default.createElement("option", {
      id: "48"
    }, "48"), _react.default.createElement("option", {
      id: "49"
    }, "49"), _react.default.createElement("option", {
      id: "50"
    }, "50"), _react.default.createElement("option", {
      id: "51"
    }, "51"), _react.default.createElement("option", {
      id: "52"
    }, "52"), _react.default.createElement("option", {
      id: "53"
    }, "53"), _react.default.createElement("option", {
      id: "54"
    }, "54"), _react.default.createElement("option", {
      id: "55"
    }, "55"), _react.default.createElement("option", {
      id: "56"
    }, "56"), _react.default.createElement("option", {
      id: "57"
    }, "57"), _react.default.createElement("option", {
      id: "58"
    }, "58"), _react.default.createElement("option", {
      id: "59"
    }, "59")))))));
  }

}

exports.default = Cron;