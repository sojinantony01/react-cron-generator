import React, { Component } from 'react';


export default class Cron extends Component {
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
        if(this.state.every) {
            let val = ['0','0','*','*','*','?','*'];
            val[2] = `0/${e.target.value}`;
            val[3] = '1/1'
            this.props.onChange(val)
        } 
    }
    onAtHourChange(e) {
        let val = ['0',this.state.value[1],'*','*','*','?','*']
        val[2] = `${e.target.value}`;
        val[3] = '1/1'
        this.props.onChange(val)
    }
    onAtMinuteChange(e) {
        let val = ['0','*',this.state.value[2],'*','*','?','*']
        val[1] = `${e.target.value}`;
        val[3] = '1/1'
        this.props.onChange(val)
    }


    render() {
        this.state.value = this.props.value
        return (   
            <div className="tab-content">              
                <div className="tab-pane active">
                    <div className="well well-small">
                        <input type="radio" onClick={(e) => {this.setState({every:true}) ; this.props.onChange()}} checked={this.state.every ? true:false} />
                        <span >&nbsp;Every &nbsp;</span>
                        <input disabled={this.state.every ? false: true} type="Number" onChange={this.onHourChange} value={this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : ''}  />
                        <span >&nbsp;hour(s)&nbsp;</span>
                    </div>
                    <div className="container-fluid">
                    <div className="well row well-small ">
                    <div className="col-md-offset-2 col-md-6 ">
                        <input type="radio" onClick={(e) => {this.setState({every:false}); this.props.onChange()}} checked={this.state.every ? false : true}/>
                            <span className="">&nbsp;At&nbsp;</span>
                        <select className="hours" disabled={this.state.every ? true: false}  onChange={this.onAtHourChange} value={this.state.value[2]}>
                            {this.getHours()}
                        </select>
                        <select  className="minutes" disabled={this.state.every ? true: false} onChange={this.onAtMinuteChange} value={this.state.value[1]}>
                            {this.getMinutes()}
                        </select>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
    getHours() {
        let hours = []
        for(let i = 0 ; i<24 ; i++) {
            hours.push(<option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
        }
        return hours;
    }
    getMinutes() {
        let minutes = []
        for(let i = 0 ; i<60 ; i++) {
            minutes.push(<option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
        }
        return minutes;
    }
}

