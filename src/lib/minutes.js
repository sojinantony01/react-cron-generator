import { connect } from 'react-redux';
import React, { Component } from 'react';
import I18 from '../../../../../i18'


export default class Cron extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    onChange(e) {
        if(e.target.value <60) {
            let val = ['0','*','*','*','*','?','*']
            val[1] = `0/${e.target.value}`;
            this.props.onChange(val)
        } 
    }

    render() {
        this.state.value = this.props.value
        return (<div className="well">   
               <I18 tkey='Every' /> <input type="Number" onChange={this.onChange.bind(this)} value={this.state.value[1].split('/')[1]} min={1} max={60}/> <I18 tkey='minute(s)' />
        </div>)
    }
}
