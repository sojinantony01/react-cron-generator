import React, { Component } from 'react';

export default class MinutesCron extends Component {

    onChange(e) {
        if((e.target.value > 0 && e.target.value < 60) || e.target.value === '') {
            let val = ['0','*','*','*','*','?','*']
            val[1] = e.target.value ? `0/${e.target.value}` : val[1];  
            this.props.onChange(val)
        } 
    }

    render() {
        const translateFn = this.props.translate;
        let value = this.props.value;
        if(value && value.length > 1) {
            value = value[1].split('/')[1];
        }
        return (<div className="well">   
               {translateFn('Every')} <input type="Number" onChange={this.onChange.bind(this)} value={value} min={1} max={60} /> {translateFn('minute(s)')}
        </div>)
    }
}
