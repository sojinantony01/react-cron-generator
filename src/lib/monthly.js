import React, { Component } from 'react';


export default class Cron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour:0,
            minute:0
        };

        this.onDayChange = this.onDayChange.bind(this);
        this.onLastDayChange = this.onLastDayChange.bind(this);
    }
    componentWillMount() {
        this.state.value = this.props.value;
        if(this.state.value[3] === 'L'){
            this.state.every = "2";
        }else if(this.state.value[3] === 'LW') {
            this.state.every = "3";
        }else if(this.state.value[3].startsWith('L')) {
            this.state.every = "4";
        } else {
            this.state.every = "1";
        }
    }
    onDayChange(e) {
        if(((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31)) || e.target.value == "") {
            let val = this.props.value
            val[3] = `${e.target.value}`;
            this.props.onChange(val)
        }
    }
    onLastDayChange(e) {
        if(((parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31)) || e.target.value == "") {
            let val = this.props.value
            if(e.target.value == '') {
                    val[3] = ''
            } else {
                    val[3] = `L-${e.target.value}`;
            } 
            this.props.onChange(val)
        }
    }

    render() {
        this.state.value = this.props.value;
        return (<div className="tab-pane" >
                    <div className="well well-small">
                        <input type="radio" onChange={(e) => {this.setState({every:e.target.value}); this.props.onChange(this.state.value)}} value="1" name="MonthlyRadio" checked={this.state.every === "1" ? true : false} />
                        &nbsp;Day&nbsp;
                        <input readOnly={this.state.every !== "1"} type="number" value={this.state.value[3]} onChange={this.onDayChange}/>
                        &nbsp;of every month(s)
                    </div>

                    <div className="well well-small">
                        <input type="radio"  onChange={(e) => {this.setState({every:e.target.value});  this.props.onChange(this.state.value) }} value="4" name="MonthlyRadio" checked={this.state.every === "4" ? true : false} />
                       
                        <input readOnly={this.state.every !== "4"} type="number" value={this.state.value[3].split('-')[1]} onChange={this.onLastDayChange}/>
                        &nbsp;day(s) before the end of the month
                    </div>
        
                </div>)
    }
}

