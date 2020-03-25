"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _cronstrue = _interopRequireDefault(require("cronstrue"));

var _minutes = _interopRequireDefault(require("./minutes"));

var _daily = _interopRequireDefault(require("./daily"));

var _hourly = _interopRequireDefault(require("./hourly"));

var _weekly = _interopRequireDefault(require("./weekly"));

var _monthly = _interopRequireDefault(require("./monthly"));

var _yearly = _interopRequireDefault(require("./yearly"));

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const tabs = ['Minutes', 'Hourly', 'Daily', 'Weekly', 'Monthly']; //,'Yearly'

class Cron extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {//    selectedTab: tabs[0],
    };
  }

  componentWillMount() {
    if (!this.props.value || this.props.value.split(' ').length !== 7) {
      this.state.value = ['0', '0', '00', '1/1', '*', '?'];
      this.state.selectedTab = tabs[0];
      this.parentChange(this.state.value);
    } else {
      this.state.value = this.props.value.replace(/,/g, '!').split(' ');
    }

    let val = this.state.value;

    if (val[1].search('/') !== -1 && val[2] == '*' && val[3] == '1/1') {
      this.state.selectedTab = tabs[0];
    } else if (val[3] == '1/1') {
      this.state.selectedTab = tabs[1];
    } else if (val[3].search('/') !== -1 || val[5] == 'MON-FRI') {
      this.state.selectedTab = tabs[2];
    } else if (val[3] === '?') {
      this.state.selectedTab = tabs[3];
    } else if (val[3].startsWith('L') || val[4] === '1/1') {
      this.state.selectedTab = tabs[4];
    } else {
      this.state.selectedTab = tabs[0];
    }
  }

  defaultValue(tab) {
    switch (tab) {
      case tabs[0]:
        return ['0', '0/1', '*', '*', '*', '?'];
        break;

      case tabs[1]:
        return ['0', '0', '00', '1/1', '*', '?'];
        break;

      case tabs[2]:
        return ['0', '0', '00', '1/1', '*', '?'];
        break;

      case tabs[3]:
        return ['0', '0', '00', '?', '*', '*'];
        break;

      case tabs[4]:
        return ['0', '0', '00', '1', '1/1', '?'];
        break;

      case tabs[5]:
        return ['0', '0', '00', '1', '1/1', '?'];
        break;

      default:
        return;
    }
  }

  tabChanged(tab) {
    this.setState({
      selectedTab: tab,
      value: this.defaultValue(tab)
    });
    this.parentChange(this.defaultValue(tab));
  }

  getHeaders() {
    return tabs.map(d => _react.default.createElement(_reactstrap.NavItem, null, _react.default.createElement(_reactstrap.NavLink, {
      href: "#",
      active: this.state.selectedTab === d,
      onClick: this.tabChanged.bind(this, d)
    }, d)));
  }

  onValueChange(val) {
    if (val && val.length) {
      this.setState({
        value: val
      });
    } else {
      this.setState({
        value: ['0', '0', '00', '1/1', '*', '?']
      });
      val = ['0', '0', '00', '1/1', '*', '?'];
    }

    this.parentChange(val);
  }

  parentChange(val) {
    let newVal = '';
    newVal = val.toString().replace(/,/g, ' ');
    newVal = newVal.replace(/!/g, ',');
    console.log(newVal);
    this.props.onChange(newVal);
  }

  getVal() {
    let val = _cronstrue.default.toString(this.state.value.toString().replace(/,/g, ' ').replace(/!/g, ','));

    if (val.search('undefined') === -1) {
      return val;
    }

    return '-';
  }

  getComponent(tab) {
    switch (tab) {
      case tabs[0]:
        return _react.default.createElement(_minutes.default, {
          value: this.state.value,
          onChange: this.onValueChange.bind(this)
        });
        break;

      case tabs[1]:
        return _react.default.createElement(_hourly.default, {
          value: this.state.value,
          onChange: this.onValueChange.bind(this)
        });
        break;

      case tabs[2]:
        return _react.default.createElement(_daily.default, {
          value: this.state.value,
          onChange: this.onValueChange.bind(this)
        });
        break;

      case tabs[3]:
        return _react.default.createElement(_weekly.default, {
          value: this.state.value,
          onChange: this.onValueChange.bind(this)
        });
        break;

      case tabs[4]:
        return _react.default.createElement(_monthly.default, {
          value: this.state.value,
          onChange: this.onValueChange.bind(this)
        });
        break;

      case tabs[5]:
        return _react.default.createElement(_yearly.default, {
          value: this.state.value,
          onChange: this.onValueChange.bind(this)
        });
        break;

      default:
        return;
    }
  }

  render() {
    return _react.default.createElement("div", {
      className: "react-cron-generator"
    }, _react.default.createElement(_reactstrap.Nav, {
      fill: true,
      pills: true
    }, this.getHeaders()), _react.default.createElement(_reactstrap.Container, null, _react.default.createElement(_reactstrap.Row, {
      className: "panel-row justify-content-center align-items-center"
    }, _react.default.createElement(_reactstrap.Col, {
      className: "col-6"
    }, this.getComponent(this.state.selectedTab)))));
  }

}

exports.default = Cron;