import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import { TimePicker, Icon } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import './time.css';
var format = 'HH:mm';

var TimeRangePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(TimeRangePicker, _Component);

  function TimeRangePicker(props) {
    var _this;

    _classCallCheck(this, TimeRangePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeRangePicker).call(this, props));
    _this.state = {
      start: false,
      end: false,
      range: _this.props.data ? _this.props.data : []
    };
    return _this;
  }

  _createClass(TimeRangePicker, [{
    key: "onChange",
    value: function onChange(state, e) {
      var prevState = this.state;
      prevState[state] = e;
      prevState.invalidOverlap = false;
      prevState.equalRange = false;
      prevState.invalidRange = false;
      this.setState(prevState);
    }
  }, {
    key: "checkTime",
    value: function checkTime(start, end, startTime, endTime) {
      if (start < endTime && start > startTime || end > startTime && end < endTime || startTime > start && startTime < end || endTime > start && endTime < end) {
        return true;
      }

      return false;
    }
  }, {
    key: "checkOpenings",
    value: function checkOpenings() {
      var valid = true;
      var start = moment(this.state.start).format('HH') * 3600 + moment(this.state.start).format('mm') * 60;
      var end = moment(this.state.end).format('HH') * 3600 + moment(this.state.end).format('mm') * 60;

      if (start === end) {
        this.setState({
          equalRange: true
        });
        return false;
      }

      if (!this.props.canOverlap) {
        var endTime = '';
        var startTime = '';
        this.state.range.map(function (data) {
          endTime = moment(data.end, 'HH:mm').format('HH') * 3600 + moment(data.end, 'HH:mm').format('mm') * 60;
          startTime = moment(data.start, 'HH:mm').format('HH') * 3600 + moment(data.start, 'HH:mm').format('mm') * 60;

          if (end < start) {
            if (this.checkTime(start, 0, startTime, endTime)) {
              valid = false;
            }

            if (this.checkTime(0, end, startTime, endTime)) {
              valid = false;
            }
          } else if (endTime < startTime) {
            if (this.checkTime(start, end, startTime, 0)) {
              valid = false;
            }

            if (this.checkTime(start, end, 0, endTime)) {
              valid = false;
            }
          } else {
            if (this.checkTime(start, end, startTime, endTime)) {
              valid = false;
            }
          }
        }.bind(this));

        if (!valid) {
          this.setState({
            invalidOverlap: true
          });
        }
      }

      return valid;
    }
  }, {
    key: "addTime",
    value: function addTime() {
      var prevState = this.state;

      if (this.state.start && this.state.end && this.state.range.length < 8) {
        if (this.checkOpenings()) {
          prevState.range.push({
            start: moment(this.state.start).format('HH:mm'),
            end: moment(this.state.end).format('HH:mm')
          });
          prevState.start = false;
          prevState.end = false;
          this.props.onChange(prevState.range);
        }
      } else {
        this.setState({
          invalidRange: true
        });
      }
    }
  }, {
    key: "getTimeData",
    value: function getTimeData() {
      var _this2 = this;

      return this.state.range.map(function (data, index) {
        return React.createElement("div", {
          className: "date_range_tags",
          key: index
        }, data.start, " - ", data.end, React.createElement(Icon, {
          type: "close",
          theme: "outlined",
          onClick: _this2.remove.bind(_this2, index)
        }));
      });
    }
  }, {
    key: "remove",
    value: function remove(index) {
      this.state.range.splice(index, 1);
      this.state.maxRange = false;
      this.state.invalidOverlap = false;
      this.state.equalRange = false;
      this.props.onChange(this.state.range);
    }
  }, {
    key: "render",
    value: function render() {
      this.state.range = this.props.openings ? this.props.openings : this.state.range;
      return React.createElement("div", {
        className: this.props.className
      }, React.createElement("div", {
        className: "timepicker_container"
      }, React.createElement(TimePicker, {
        value: this.state.start,
        format: format,
        onChange: this.onChange.bind(this, 'start'),
        placeholder: 'Select time'
      }), React.createElement("div", {
        className: ""
      }, React.createElement("span", null, "-")), React.createElement(TimePicker, {
        value: this.state.end,
        format: format,
        onChange: this.onChange.bind(this, 'end'),
        placeholder: 'Select time'
      }), this.state.invalidOverlap && React.createElement("span", {
        className: "invalid"
      }, "Time cannot be overlaped"), this.state.equalRange && React.createElement("span", {
        className: "invalid"
      }, "Time canot be equal"), React.createElement("span", {
        className: "tick margin-left-16",
        onClick: this.addTime.bind(this)
      }, React.createElement(Icon, {
        type: "check",
        theme: "outlined"
      }))), this.getTimeData());
    }
  }]);

  return TimeRangePicker;
}(Component);

export default TimeRangePicker;