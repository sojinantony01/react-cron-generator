import React, { Component } from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

export default class HourlyCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            every: false
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
        if(this.state.every && ((e.target.value > 0 && e.target.value < 24) || e.target.value === '')) {
            let val = ['0','0','*','*','*','?','*'];
            val[2] = e.target.value ? `0/${e.target.value}` : e.target.value;
            val[3] = '1/1';
            this.props.onChange(val);
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
        const translateFn = this.props.translate;
        this.state.value = this.props.value
        return (   
            <div className="tab-content">              
                <div className="tab-pane active">
                    <div className="well well-small">
                        <input type="radio" onChange={(e) => {this.setState({ every:true }) ; this.props.onChange(['0','0','0/1','1/1','*','?','*'])}} checked={this.state.every} />
                        <span>{translateFn('Every')} </span>
                        <input disabled={!this.state.every} type="Number" onChange={this.onHourChange} value={this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : ''}  />
                        <span>{translateFn('hour(s)')}</span>
                    </div>
                    <div className="well df well-small margin-right-0 margin-left-0">
                    <div className="text_align_right row" style={{width:'100%'}}>
                        <input type="radio" onChange={(e) => {this.setState({ every: false }); this.props.onChange();}} checked={!this.state.every}/>
                        <span className="">{translateFn('At')}</span>
                        <Hour disabled={this.state.every} onChange={this.onAtHourChange} value={this.state.value[2]} />
                        <Minutes disabled={this.state.every} onChange={this.onAtMinuteChange} value={this.state.value[1]} />
                    </div>
                    </div>
                </div>
            </div>
        )
    }

}

