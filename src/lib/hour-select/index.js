import React, { Component } from 'react';

export default class Hour extends Component {

    render() {
        return (<select className="hours" onChange={this.props.onChange ? this.props.onChange : () => {}} value={this.props.value} >
            {this.buildOptions()}
        </select>)
    }

    buildOptions() {
        let options = [];
        for(let i = 0; i < 24; i++) {
            options.push(<option id={i}>{(i < 10 ? '0' : '') + i}</option>)
        }
        return options;
    }
    
}

