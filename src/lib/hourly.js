import React, { Component } from 'react';
import Minutes from './minutes-select';
import Hour from './hour-select';

export default class HourlyCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onHourChange = this.onHourChange.bind(this);
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    }

    componentWillMount() {
        this.state.value = this.props.value;
        if(this.state.value[2].split('/')[1] || this.state.value[2] === '*') {
            this.state.every = true;
        }
    }

    onHourChange(e) {
        if(this.state.every && ((e.target.value > 0 && e.target.value < 24) || e.target.value == '')) {
            let val = ['0','0','*','*','*','?','*'];
            val[2] = e.target.value ? `0/${e.target.value}` : e.target.value;
            val[3] = '1/1';
            this.props.onChange(val)
        } 
    }

    onAtHourChange(e) {
        let val = ['0',this.state.value[1],'*','1/1','*','?','*']
        val[2] = `${e.target.value}`;
        this.props.onChange(val);
    }

    onAtMinuteChange(e) {
        let val = ['0','*', this.state.value[2],'1/1','*','?','*']
        val[1] = `${e.target.value}`;
        this.props.onChange(val);
    }

    render() {
        this.state.value = this.props.value
        return (   
            <div className="tab-content">              
                <div className="tab-pane active">
                    <div className="well well-small">
                        <input type="radio" onClick={(e) => {this.setState({every:true}) ; this.props.onChange(['0','0','0/1','1/1','*','?','*'])}} checked={this.state.every} />
                        <span>Every </span>
                        <input disabled={!this.state.every} type="Number" onChange={this.onHourChange} value={this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : ''}  />
                        <span>hour(s)</span>
                    </div>
                    <div className="well row well-small margin-right-0 margin-left-0">
                    <div className="col-md-offset-2 col-md-6 text_align_right">
                        <input type="radio" onClick={(e) => {this.setState({ every: false }); this.props.onChange();}} checked={!this.state.every}/>
                            <span className="margin-right-10 ">At</span>
                        <Hour onChange={this.onAtHourChange} value={this.state.value[2]} />
                        <Minutes onChange={this.onAtMinuteChange} value={this.state.value[1]} />
                    </div>
                    </div>
                </div>
            </div>
        )
    }

}

