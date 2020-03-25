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
    this.onLastDayChange = this.onLastDayChange.bind(this);
    this.onAtHourChange = this.onAtHourChange.bind(this);
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
  }

  componentWillMount() {
    this.state.value = this.props.value;

    if (this.state.value[3] === 'L') {
      this.state.every = "2";
    } else if (this.state.value[3] === 'LW') {
      this.state.every = "3";
    } else if (this.state.value[3].startsWith('L')) {
      this.state.every = "4";
    } else {
      this.state.every = "1";
    }
  }

  onDayChange(e) {
    if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31 || e.target.value == "") {
      let val = ['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], this.state.value[3], '1/1', '?'];
      val[3] = `${e.target.value}`;
      this.props.onChange(val);
    }
  }

  onLastDayChange(e) {
    if (parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31 || e.target.value == "") {
      let val = ['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], this.state.value[3], '1/1', '?'];

      if (e.target.value == '') {
        val[3] = '';
      } else {
        val[3] = `L-${e.target.value}`;
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
      className: "mr-sm-1"
    }, _react.default.createElement(_reactstrap.CustomInput, {
      id: "variant-selector-day",
      type: "radio",
      name: "variantSelector",
      value: "1",
      checked: this.state.every === "1",
      onChange: e => {
        this.setState({
          every: e.target.value
        });
        this.props.onChange(['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], '1', '1/1', '?']);
      }
    }), "Day of every month"), _react.default.createElement(_reactstrap.Input, {
      className: "mr-sm-1",
      readOnly: this.state.every !== "1",
      type: "number",
      min: 1,
      max: 31,
      value: this.state.value[3],
      onChange: this.onDayChange
    }), _react.default.createElement(_reactstrap.FormText, {
      color: "muted"
    }, "Must be integer value (1 - 31)."))))), _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Form, {
      inline: true
    }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, null, _react.default.createElement(_reactstrap.CustomInput, {
      id: "variant-selector-last-day",
      type: "radio",
      name: "variantSelector",
      value: "2",
      checked: this.state.every === "2",
      onChange: e => {
        this.setState({
          every: e.target.value
        });
        this.props.onChange(['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], 'L', '*', '?']);
      }
    }), "Last day of every month"))))), _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Form, {
      inline: true
    }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, null, _react.default.createElement(_reactstrap.CustomInput, {
      id: "variant-selector-last-week-day",
      type: "radio",
      name: "variantSelector",
      value: "3",
      checked: this.state.every === "3",
      onChange: e => {
        this.setState({
          every: e.target.value
        });
        this.props.onChange(['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], 'LW', '*', '?']);
      }
    }), "Last weekday of every month"))))), _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Form, {
      inline: true
    }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
      className: "mr-sm-1"
    }, _react.default.createElement(_reactstrap.CustomInput, {
      id: "variant-selector-before-end-month",
      type: "radio",
      name: "variantSelector",
      value: "4",
      checked: this.state.every === "4",
      onChange: e => {
        this.setState({
          every: e.target.value
        });
        this.props.onChange(['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], `L-${1}`, '*', '?']);
      }
    }), "Day(s) before the end of the month"), _react.default.createElement(_reactstrap.Input, {
      className: "mr-sm-1",
      readOnly: this.state.every !== "4",
      type: "Number",
      min: 1,
      max: 31,
      value: this.state.value[3].split('-')[1],
      onChange: this.onLastDayChange
    }), _react.default.createElement(_reactstrap.FormText, {
      color: "muted"
    }, "Must be integer value (1 - 31)."))))), _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Form, {
      inline: true
    }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
      className: "mr-sm-1"
    }, "Start time"), _react.default.createElement(_reactstrap.Input, {
      className: "mr-sm-1 hours",
      type: "select",
      min: 0,
      max: 23,
      value: this.state.value[2],
      onChange: this.onAtHourChange
    }, _react.default.createElement("option", {
      value: "0"
    }, "00"), _react.default.createElement("option", {
      value: "1"
    }, "01"), _react.default.createElement("option", {
      value: "2"
    }, "02"), _react.default.createElement("option", {
      value: "3"
    }, "03"), _react.default.createElement("option", {
      value: "4"
    }, "04"), _react.default.createElement("option", {
      value: "5"
    }, "05"), _react.default.createElement("option", {
      value: "6"
    }, "06"), _react.default.createElement("option", {
      value: "7"
    }, "07"), _react.default.createElement("option", {
      value: "8"
    }, "08"), _react.default.createElement("option", {
      value: "9"
    }, "09"), _react.default.createElement("option", {
      value: "10"
    }, "10"), _react.default.createElement("option", {
      value: "11"
    }, "11"), _react.default.createElement("option", {
      value: "12"
    }, "12"), _react.default.createElement("option", {
      value: "13"
    }, "13"), _react.default.createElement("option", {
      value: "14"
    }, "14"), _react.default.createElement("option", {
      value: "15"
    }, "15"), _react.default.createElement("option", {
      value: "16"
    }, "16"), _react.default.createElement("option", {
      value: "17"
    }, "17"), _react.default.createElement("option", {
      value: "18"
    }, "18"), _react.default.createElement("option", {
      value: "19"
    }, "19"), _react.default.createElement("option", {
      value: "20"
    }, "20"), _react.default.createElement("option", {
      value: "21"
    }, "21"), _react.default.createElement("option", {
      value: "22"
    }, "22"), _react.default.createElement("option", {
      value: "23"
    }, "23")), _react.default.createElement(_reactstrap.Input, {
      className: "minutes",
      type: "select",
      min: 0,
      max: 59,
      value: this.state.value[1],
      onChange: this.onAtMinuteChange
    }, _react.default.createElement("option", {
      value: "0"
    }, "00"), _react.default.createElement("option", {
      value: "1"
    }, "01"), _react.default.createElement("option", {
      value: "2"
    }, "02"), _react.default.createElement("option", {
      value: "3"
    }, "03"), _react.default.createElement("option", {
      value: "4"
    }, "04"), _react.default.createElement("option", {
      value: "5"
    }, "05"), _react.default.createElement("option", {
      value: "6"
    }, "06"), _react.default.createElement("option", {
      value: "7"
    }, "07"), _react.default.createElement("option", {
      value: "8"
    }, "08"), _react.default.createElement("option", {
      value: "9"
    }, "09"), _react.default.createElement("option", {
      value: "10"
    }, "10"), _react.default.createElement("option", {
      value: "11"
    }, "11"), _react.default.createElement("option", {
      value: "12"
    }, "12"), _react.default.createElement("option", {
      value: "13"
    }, "13"), _react.default.createElement("option", {
      value: "14"
    }, "14"), _react.default.createElement("option", {
      value: "15"
    }, "15"), _react.default.createElement("option", {
      value: "16"
    }, "16"), _react.default.createElement("option", {
      value: "17"
    }, "17"), _react.default.createElement("option", {
      value: "18"
    }, "18"), _react.default.createElement("option", {
      value: "19"
    }, "19"), _react.default.createElement("option", {
      value: "20"
    }, "20"), _react.default.createElement("option", {
      value: "21"
    }, "21"), _react.default.createElement("option", {
      value: "22"
    }, "22"), _react.default.createElement("option", {
      value: "23"
    }, "23"), _react.default.createElement("option", {
      value: "24"
    }, "24"), _react.default.createElement("option", {
      value: "25"
    }, "25"), _react.default.createElement("option", {
      value: "26"
    }, "26"), _react.default.createElement("option", {
      value: "27"
    }, "27"), _react.default.createElement("option", {
      value: "28"
    }, "28"), _react.default.createElement("option", {
      value: "29"
    }, "29"), _react.default.createElement("option", {
      value: "30"
    }, "30"), _react.default.createElement("option", {
      value: "31"
    }, "31"), _react.default.createElement("option", {
      value: "32"
    }, "32"), _react.default.createElement("option", {
      value: "33"
    }, "33"), _react.default.createElement("option", {
      value: "34"
    }, "34"), _react.default.createElement("option", {
      value: "35"
    }, "35"), _react.default.createElement("option", {
      value: "36"
    }, "36"), _react.default.createElement("option", {
      value: "37"
    }, "37"), _react.default.createElement("option", {
      value: "38"
    }, "38"), _react.default.createElement("option", {
      value: "39"
    }, "39"), _react.default.createElement("option", {
      value: "40"
    }, "40"), _react.default.createElement("option", {
      value: "41"
    }, "41"), _react.default.createElement("option", {
      value: "42"
    }, "42"), _react.default.createElement("option", {
      value: "43"
    }, "43"), _react.default.createElement("option", {
      value: "44"
    }, "44"), _react.default.createElement("option", {
      value: "45"
    }, "45"), _react.default.createElement("option", {
      value: "46"
    }, "46"), _react.default.createElement("option", {
      value: "47"
    }, "47"), _react.default.createElement("option", {
      value: "48"
    }, "48"), _react.default.createElement("option", {
      value: "49"
    }, "49"), _react.default.createElement("option", {
      value: "50"
    }, "50"), _react.default.createElement("option", {
      value: "51"
    }, "51"), _react.default.createElement("option", {
      value: "52"
    }, "52"), _react.default.createElement("option", {
      value: "53"
    }, "53"), _react.default.createElement("option", {
      value: "54"
    }, "54"), _react.default.createElement("option", {
      value: "55"
    }, "55"), _react.default.createElement("option", {
      value: "56"
    }, "56"), _react.default.createElement("option", {
      value: "57"
    }, "57"), _react.default.createElement("option", {
      value: "58"
    }, "58"), _react.default.createElement("option", {
      value: "59"
    }, "59")))))));
  }

}

exports.default = Cron;