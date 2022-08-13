import React, { Component } from "react";
import Hour from "../hour-select";
import Minutes from "../minutes-select";

export default class YearlyCron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0,
    };

    this.onDayChange = this.onDayChange.bind(this);
    this.onLastDayChange = this.onLastDayChange.bind(this);
    this.onAtHourChange = this.onAtHourChange.bind(this);
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onYearStepChange = this.onYearStepChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.state.value = this.props.value;
    if (this.state.value[3] === "L") {
      this.state.every = "2";
    } else if (this.state.value[3] === "LW") {
      this.state.every = "3";
    } else if (this.state.value[3].startsWith("L")) {
      this.state.every = "4";
    } else {
      this.state.every = "1";
    }
  }
  onDayChange(e) {
    if (
      (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) ||
      e.target.value === ""
    ) {
      let val = [
        "0",
        this.state.value[1] === "*" ? "0" : this.state.value[1],
        this.state.value[2] === "*" ? "0" : this.state.value[2],
        this.state.value[3],
        this.state.value[4] === "*" ? "1" : this.state.value[4],
        "?",
        this.state.value[6] === "*" ? "0" : this.state.value[6],
      ];
      val[3] = `${e.target.value}`;
      this.props.onChange(val);
    }
  }
  onLastDayChange(e) {
    if (
      (parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31) ||
      e.target.value === ""
    ) {
      let val = [
        "0",
        this.state.value[1] === "*" ? "0" : this.state.value[1],
        this.state.value[2] === "*" ? "0" : this.state.value[2],
        this.state.value[3],
        this.state.value[4] === "*" ? "1" : this.state.value[4],
        "?",
        this.state.value[6] === "*" ? "0" : this.state.value[6],
      ];
      if (e.target.value === "") {
        val[3] = "";
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
  onMonthChange(e) {
    let val = this.state.value;
    val[4] = `${e.target.value}`;
    this.props.onChange(val);
  }
  onYearStepChange(e) {
    let val = this.state.value;
    val[6] = `${val[6].split("/")[0]}/${e.target.value}`;
    this.props.onChange(val);
  }
  onYearChange(e) {
    let val = this.state.value;
    val[6] = `${e.target.value}/${val[6].split("/")[1]}`;
    this.props.onChange(val);
  }

  render() {
    let months = [
      { label: "January", value: 1 },
      { label: "February", value: 2 },
      { label: "March", value: 3 },
      { label: "April", value: 4 },
      { label: "May", value: 5 },
      { label: "June", value: 6 },
      { label: "July", value: 7 },
      { label: "August", value: 8 },
      { label: "September", value: 9 },
      { label: "October", value: 10 },
      { label: "November", value: 11 },
      { label: "December", value: 12 },
    ];
    const translateFn = this.props.translate;
    this.state.value = this.props.value;
    return (
      <div className="tab-pane">
        <div className="well well-small">
          {translateFn("Month")}
          <select style={{ width: "unset" }} onChange={this.onMonthChange}>
            {months.map(({ label, value }, i) => (
              <option key={i} value={value}>
                {label}
              </option>
            ))}
          </select>
          {translateFn("of every ")}
          <input
            type="number"
            value={this.state.value[6].split("/")[1]}
            onChange={this.onYearStepChange}
            min={1}
            max={2099 - new Date().getFullYear()}
          />
          {translateFn(" year(s) starting from")}
          <input
            type="number"
            value={this.state.value[6].split("/")[0]}
            onChange={this.onYearChange}
            min={new Date().getFullYear()}
            max={2099}
          />
        </div>

        <div className="well well-small">
          <input
            type="radio"
            onChange={(e) => {
              this.setState({ every: e.target.value });
              this.props.onChange([
                "0",
                this.state.value[1] === "*" ? "0" : this.state.value[1],
                this.state.value[2] === "*" ? "0" : this.state.value[2],
                "1",
                this.state.value[4] === "*" ? "1" : this.state.value[4],
                "?",
                this.state.value[6] === "*" ? "0" : this.state.value[6],
              ]);
            }}
            value="1"
            name="MonthlyRadio"
            checked={this.state.every === "1" ? true : false}
          />
          {translateFn("Day")}
          <input
            readOnly={this.state.every !== "1"}
            type="number"
            value={this.state.value[3]}
            onChange={this.onDayChange}
          />
          {translateFn("of every month(s)")}
        </div>

        <div className="well well-small">
          <input
            onChange={(e) => {
              this.setState({ every: e.target.value });
              this.props.onChange([
                "0",
                this.state.value[1] === "*" ? "0" : this.state.value[1],
                this.state.value[2] === "*" ? "0" : this.state.value[2],
                "L",
                this.state.value[4] === "*" ? "1" : this.state.value[4],
                "?",
                this.state.value[6] === "*" ? "0" : this.state.value[6],
              ]);
            }}
            type="radio"
            value="2"
            name="DailyRadio"
            checked={this.state.every === "2" ? true : false}
          />
          {translateFn("Last day of every month")}
        </div>
        <div className="well well-small">
          <input
            onChange={(e) => {
              this.setState({ every: e.target.value });
              this.props.onChange([
                "0",
                this.state.value[1] === "*" ? "0" : this.state.value[1],
                this.state.value[2] === "*" ? "0" : this.state.value[2],
                "LW",
                this.state.value[4] === "*" ? "1" : this.state.value[4],
                "?",
                this.state.value[6] === "*" ? "0" : this.state.value[6],
              ]);
            }}
            type="radio"
            value="3"
            name="DailyRadio"
            checked={this.state.every === "3" ? true : false}
          />
          {translateFn("On the last weekday of every month")}
        </div>
        <div className="well well-small">
          <input
            type="radio"
            onChange={(e) => {
              this.setState({ every: e.target.value });
              this.props.onChange([
                "0",
                this.state.value[1] === "*" ? "0" : this.state.value[1],
                this.state.value[2] === "*" ? "0" : this.state.value[2],
                `L-${1}`,
                this.state.value[4] === "*" ? "1" : this.state.value[4],
                "?",
                this.state.value[6] === "*" ? "0" : this.state.value[6],
              ]);
            }}
            value="4"
            name="MonthlyRadio"
            checked={this.state.every === "4" ? true : false}
          />

          <input
            readOnly={this.state.every !== "4"}
            type="number"
            value={
              this.state.value[3].split("-").length &&
              this.state.value[3].split("-")[1]
                ? this.state.value[3].split("-")[1]
                : ""
            }
            onChange={this.onLastDayChange}
          />
          {translateFn("day(s) before the end of the month")}
        </div>
        {translateFn("Start time")}
        <Hour onChange={this.onAtHourChange} value={this.state.value[2]} />
        <Minutes onChange={this.onAtMinuteChange} value={this.state.value[1]} />
      </div>
    );
  }
}
