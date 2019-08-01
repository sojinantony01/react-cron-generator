import React, { Component } from 'react';


export default class Cron extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    onChange(e) {
        if((e.target.value > 0 && e.target.value < 60) || e.target.value == '') {
            console.log("VALUEEE" , e.target.value)
            let val = this.props.value
            
            if(e.target.value == '') {
                val[1] = '';
            } else {
                val[1] = `0/${e.target.value}`;
            }
            this.props.onChange(val)
        } 
    }
    render() {
        this.state.value = this.props.value
        return (<div className="well">   
               Every <input type="Number" onChange={this.onChange.bind(this)} value={this.state.value[1].split('/')[1]} min={1} max={60}/> minute(s)'
        </div>)
    }
}
