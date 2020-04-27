import React, { Component } from 'react';

export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onChange(e) {
        let val = ['*','*','*','*','*','?','*'];
        this.props.onChange(val);
        // if((e.target.value > 0 && e.target.value < 60) || e.target.value === '') {
        //     let val = ['0','*','*','*','*','?','*']
        //     val[1] = e.target.value ? `0/${e.target.value}` : val[1];
        //     this.props.onChange(val)
        // }
    }

    render() {
        this.state.value = this.props.value
        return (<div className="well">
            Script <input className="form-input" type="input" onChange={this.onChange.bind(this)} value={this.state.value[1].split('/')[1]}/>
        </div>)
    }
}
