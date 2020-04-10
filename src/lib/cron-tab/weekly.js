import React, { Component } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

export default class WeeklyCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }
    
    onAtHourChange(e) {
        let val = this.state.value;
        val[0] = '0';
        val[2] = `${e.target.value}`;
        this.props.onChange(val);
    }

    onAtMinuteChange(e) {
        let val = this.state.value;
        val[0] = '0';
        val[1] = `${e.target.value}`;
        this.props.onChange(val);
    }

    onCheck(e) {
        let val = this.state.value;
        val[0] = '0';
        if(e.target.checked) {
            this.onDayChecked(val, e);
        } else {
            this.onDayUnChecked(val, e);           
        }
        this.props.onChange(val)
    }

    onDayChecked(val, e) {
        val[2] = (`${val[2]}`.split('/').length > 1) ? '0' : val[2].toString();
        val[3] = '?';
        val[4] = '*';
        if (val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
            val[5] = e.target.value;
        } else {
            val[5] = val[5] + '!' + e.target.value;
        }
    }

    onDayUnChecked(val, e) {
        val[5] = val[5].split('!');
        if (val[5].length > 1) {
            val[5].splice(val[5].indexOf(e.target.value), 1);
            val[5] = val[5].toString().replace(/,/g, '!');
        }
        else {
            val[5] = '*';
        }
    }

    render() {
        this.state.value = this.props.value;
        return (<div className="container-fluid">
            <div className="well well-small row">
                <div className="span6 col-sm-6">
                    <div className="text_align_left">
                        <input type="checkbox" value="MON" onChange={this.onCheck} checked={(this.state.value[5].search('MON') !== -1 ) ? true : false} />Monday<br/>
                        <input type="checkbox" value="WED" onChange={this.onCheck} checked={this.state.value[5].search('WED') !== -1 ? true : false}  />Wednesday<br/>
                        <input type="checkbox" value="FRI" onChange={this.onCheck} checked={(this.state.value[5].search('FRI') !== -1 ) ? true : false}/>Friday<br/>
                        <input type="checkbox" value="SUN" onChange={this.onCheck} checked={this.state.value[5].search('SUN') !== -1 ? true : false}/>Sunday
                    </div>
                </div>
                <div className="span6 col-sm-6">
                    <div className="text_align_left">
                        <input type="checkbox" value="TUE" onChange={this.onCheck} checked={this.state.value[5].search('TUE') !== -1 ? true : false}/>Tuesday<br />
                        <input type="checkbox" value="THU" onChange={this.onCheck} checked={this.state.value[5].search('THU') !== -1 ? true : false}/>Thursday<br />
                        <input type="checkbox" value="SAT" onChange={this.onCheck} checked={this.state.value[5].search('SAT') !== -1 ? true : false}/>Saturday
                    </div><br /><br />
                </div>
            </div>
            Start time
            <Hour onChange={this.onAtHourChange} value={this.state.value[2]} />
            <Minutes onChange={this.onAtMinuteChange} value={this.state.value[1]} />
        </div>)
    }
}

