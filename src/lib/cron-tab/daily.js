/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

export default class DailyCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour:0,
            minute:0
        };

        this.onDayChange = this.onDayChange.bind(this);
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    }

    componentWillMount() {
        this.state.value = this.props.value;
        this.state.every=  this.props.value[3] !== '?';
    }

    onDayChange(e) {
        if(!e.target.value || (e.target.value > 0 && e.target.value < 32 )) {
            this.state.value = ['0', this.getValueByIndex(1), this.getValueByIndex(1),'*','*','?','*'];
            this.onValueChange(3, (e.target.value ? `1/${e.target.value}` : e.target.value));
        }
    }

    /**
     * If value is * return 0 else return value
     * @param {position in array} index 
     */
    getValueByIndex(index) {
        return this.state.value[index] === '*' ? '0' : this.state.value[index];
    }

    onAtHourChange(e) {
        this.onValueChange(2, e.target.value);
    }

    onAtMinuteChange(e) {
        this.onValueChange(1, e.target.value);
    }

    onValueChange(cronPosition, value) {
        let val = this.state.value;
        val[cronPosition] = value;
        this.props.onChange(val);
    }

    render() {
        const translateFn = this.props.translate;
        this.state.value = this.props.value;
        let enable_daily_options = this.props.enable_daily_options;

        let days = <div>
                <span>{translateFn('Every')}</span>
                <input disabled={!this.state.every} type="Number" maxLength="2" onChange={this.onDayChange} value={this.state.value[3].split('/')[1] ? this.state.value[3].split('/')[1] :''} />
                <span>{translateFn('day(s)')}</span>
            </div>;
        let daily_options = enable_daily_options ? <div>
            <div className="well well-small">
                <input type="radio" onChange={(e) => {this.setState({ every:true }); this.props.onChange();}} value="1" name="DailyRadio" checked={this.state.every} />
                {days}
                </div>
                <div className="well well-small">
                    <input onChange={(e) => {this.setState({ every:false }); this.props.onChange(['0', this.state.value[1], this.state.value[2],'?','*', 'MON-FRI','*'])}} type="radio" value="2" name="DailyRadio" checked={!this.state.every}/>
                    <span>{translateFn('Every week day')}</span>
                </div>
            </div> : days;

        return (<div className="tab-pane" >
                    {daily_options}
                    <span>{translateFn('Start time')}</span>
                    <Hour onChange={this.onAtHourChange} value={this.state.value[2]} />
                    <Minutes onChange={this.onAtMinuteChange} value={this.state.value[1]} />
                </div>)
    }
}