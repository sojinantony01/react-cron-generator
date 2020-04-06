import React, { Component } from 'react';

export default class Minutes extends Component {

    render() {
        return (<select disabled={this.props.disabled === true ? true : false} className="minutes" onChange={this.props.onChange ? this.props.onChange : () => {}} value={this.props.value} >
            {this.buildOptions()}
        </select>)
    }

    buildOptions() {
        let options = [];
        for(let i = 0; i < 60; i++) {
            options.push(<option key={i} id={i}>{(i < 10 ? '0' : '') + i}</option>)
        }
        return options;
    }
    
}

