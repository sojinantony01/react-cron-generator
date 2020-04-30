/* eslint-disable react/no-direct-mutation-state */
import React, {Component} from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

export default class DailyCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour: 0,
            minute: 0
        };

        this.onCheck = this.onCheck.bind(this);
        this.onDayChange = this.onDayChange.bind(this);
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    }

    componentWillMount() {
        this.state.value = this.props.value;
        this.state.every = this.props.value[3] !== '?';
    }

    onDayChange(e) {
        if (!e.target.value || (e.target.value > 0 && e.target.value < 32)) {
            this.state.value = ['0', this.getValueByIndex(1), this.getValueByIndex(1), '*', '*', '?', '*'];
            this.onValueChange(3, (e.target.value ? `1/${e.target.value}` : e.target.value));
        }
    }

    onCheck(e) {
        let val = this.state.value;
        val[0] = '0';
        console.log(e.target.value.search('1') !== -1);
        if(e.target.checked) {
            this.onDayChecked(val, e);
        } else {
            this.onDayUnChecked(val, e);
        }
        this.props.onChange(val);
    }

    onDayChecked(val, e) {
        val[2] = (`${val[2]}`.split('/').length > 1) ? '0' : val[2].toString();
        val[5] = '*';
        val[4] = '*';
        if (val[3] === '*' || val[3] === '?') {
            val[3] = e.target.value;
        } else {
            val[3] = val[3] + '!' + e.target.value;
        }
    }

    onDayUnChecked(val, e) {
        val[3] = val[3].split('!');
        if (val[3].length > 1) {
            val[3].splice(val[3].indexOf(e.target.value), 1);
            val[3] = val[3].toString().replace(/,/g, '!');
        }
        else {
            val[3] = '*';
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
        this.state.value = this.props.value;
        return (<div className="tab-pane">
            <div className="well well-small row">
                <div className="span2 col-sm-2">
                    <div className="text_align_left">
                        <input type="checkbox" value="01" onChange={this.onCheck}
                               checked={(this.state.value[3].search('01') !== -1)}/>01<br/>
                        <input type="checkbox" value="07" onChange={this.onCheck}
                               checked={this.state.value[3].search('07') !== -1}/>07<br/>
                        <input type="checkbox" value="13" onChange={this.onCheck}
                               checked={(this.state.value[3].search('13') !== -1)}/>13<br/>
                        <input type="checkbox" value="19" onChange={this.onCheck}
                               checked={(this.state.value[3].search('19') !== -1)}/>19<br/>
                        <input type="checkbox" value="25" onChange={this.onCheck}
                               checked={(this.state.value[3].search('25') !== -1)}/>25<br/>
                        <input type="checkbox" value="31" onChange={this.onCheck}
                               checked={(this.state.value[3].search('31') !== -1)}/>31
                    </div>
                </div>
                <div className="span2 col-sm-2">
                    <div className="text_align_left">
                        <input type="checkbox" value="02" onChange={this.onCheck}
                               checked={this.state.value[3].search('02') !== -1}/>02<br/>
                        <input type="checkbox" value="08" onChange={this.onCheck}
                               checked={this.state.value[3].search('08') !== -1}/>08<br/>
                        <input type="checkbox" value="14" onChange={this.onCheck}
                               checked={this.state.value[3].search('14') !== -1}/>14<br/>
                        <input type="checkbox" value="20" onChange={this.onCheck}
                               checked={this.state.value[3].search('20') !== -1}/>20<br/>
                        <input type="checkbox" value="26" onChange={this.onCheck}
                               checked={(this.state.value[3].search('26') !== -1)}/>26
                    </div>
                </div>
                <div className="span2 col-sm-2">
                    <div className="text_align_left">
                        <input type="checkbox" value="03" onChange={this.onCheck}
                               checked={this.state.value[3].search('03') !== -1}/>03<br/>
                        <input type="checkbox" value="09" onChange={this.onCheck}
                               checked={this.state.value[3].search('09') !== -1}/>09<br/>
                        <input type="checkbox" value="15" onChange={this.onCheck}
                               checked={this.state.value[3].search('15') !== -1}/>15<br/>
                        <input type="checkbox" value="21" onChange={this.onCheck}
                               checked={this.state.value[3].search('21') !== -1}/>21<br/>
                        <input type="checkbox" value="27" onChange={this.onCheck}
                               checked={this.state.value[3].search('27') !== -1}/>27
                    </div>
                </div>
                <div className="span2 col-sm-2">
                    <div className="text_align_left">
                        <input type="checkbox" value="04" onChange={this.onCheck}
                               checked={this.state.value[3].search('04') !== -1}/>04<br/>
                        <input type="checkbox" value="10" onChange={this.onCheck}
                               checked={this.state.value[3].search('10') !== -1}/>10<br/>
                        <input type="checkbox" value="16" onChange={this.onCheck}
                               checked={this.state.value[3].search('16') !== -1}/>16<br/>
                        <input type="checkbox" value="22" onChange={this.onCheck}
                               checked={this.state.value[3].search('22') !== -1}/>22<br/>
                        <input type="checkbox" value="28" onChange={this.onCheck}
                               checked={this.state.value[3].search('28') !== -1}/>28
                    </div>
                </div>
                <div className="span2 col-sm-2">
                    <div className="text_align_left">
                        <input type="checkbox" value="05" onChange={this.onCheck}
                               checked={this.state.value[3].search('05') !== -1}/>05<br/>
                        <input type="checkbox" value="11" onChange={this.onCheck}
                               checked={this.state.value[3].search('11') !== -1}/>11<br/>
                        <input type="checkbox" value="17" onChange={this.onCheck}
                               checked={this.state.value[3].search('17') !== -1}/>17<br/>
                        <input type="checkbox" value="23" onChange={this.onCheck}
                               checked={this.state.value[3].search('23') !== -1}/>23<br/>
                        <input type="checkbox" value="29" onChange={this.onCheck}
                               checked={this.state.value[3].search('29') !== -1}/>29
                    </div>
                </div>
                <div className="span2 col-sm-2">
                    <div className="text_align_left">
                        <input type="checkbox" value="06" onChange={this.onCheck}
                               checked={this.state.value[3].search('06') !== -1}/>06<br/>
                        <input type="checkbox" value="12" onChange={this.onCheck}
                               checked={this.state.value[3].search('12') !== -1}/>12<br/>
                        <input type="checkbox" value="18" onChange={this.onCheck}
                               checked={this.state.value[3].search('18') !== -1}/>18<br/>
                        <input type="checkbox" value="24" onChange={this.onCheck}
                               checked={this.state.value[3].search('24') !== -1}/>24<br/>
                        <input type="checkbox" value="30" onChange={this.onCheck}
                               checked={this.state.value[3].search('30') !== -1}/>30
                    </div>
                </div>
            </div>
            <div className="well well-small">
                <input type="radio" onChange={(e) => {
                    this.setState({every: true});
                    this.props.onChange();
                }} value="1" name="DailyRadio" checked={this.state.every}/>
                <span>Every</span>
                <input disabled={!this.state.every} type="Number" maxLength="2" onChange={this.onDayChange}
                       value={this.state.value[3].split('/')[1] ? this.state.value[3].split('/')[1] : ''}/>
                <span>day(s)</span>
            </div>
            <div className="well well-small">
                <input onChange={(e) => {
                    this.setState({every: false});
                    this.props.onChange(['0', this.state.value[1], this.state.value[2], '?', '*', 'MON-FRI', '*'])
                }} type="radio" value="2" name="DailyRadio" checked={!this.state.every}/>
                <span>Every week day</span>
            </div>
            <span>Start time</span>
            <Hour onChange={this.onAtHourChange} value={this.state.value[2]}/>
            <Minutes onChange={this.onAtMinuteChange} value={this.state.value[1]}/>
        </div>)
    }
}
