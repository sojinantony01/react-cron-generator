import React, { Component } from 'react';

export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onChange(e) {
        this.props.onChange(e.target.value.replace(/,/g, '!').split(" "));
    }

    render() {
        const translateFn = this.props.translate;
        this.state.value = this.props.value;

        let val = this.props.value.toString().replace(/,/g,' ').replace(/!/g, ',');

        return (<div className="well">   
               {translateFn('Expression')} <input type="text" onChange={this.onChange.bind(this)} value={val} />
        </div>)
    }
}
