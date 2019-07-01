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
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
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
            let val = ['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],this.state.value[3],'1/1', '?','*'];
            val[3] = `${e.target.value}`;
            this.props.onChange(val)
        }
    }
    onLastDayChange(e) {
        if(((parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31)) || e.target.value == "") {
            let val = ['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],this.state.value[3],'1/1', '?','*'];
            if(e.target.value == '') {
                    val[3] = ''
            } else {
                    val[3] = `L-${e.target.value}`;
            } 
            this.props.onChange(val)
        }
    }
    onAtHourChange(e) {
        let val = this.state.value;
        val[2] = `${e.target.value}`;
        this.props.onChange(val)
    }
    onAtMinuteChange(e) {
        let val = this.state.value;
        val[1] = `${e.target.value}`;
        this.props.onChange(val)
    }
    render() {
        this.state.value = this.props.value;
        return (<div class="tab-pane" >
                    <div class="well well-small">
                        <input type="radio" onChange={(e) => {this.setState({every:e.target.value}); this.props.onChange(['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],'1','1/1', '?','*'])}} value="1" name="MonthlyRadio" checked={this.state.every === "1" ? true : false} />
                        &nbsp;Day&nbsp;
                        <input readOnly={this.state.every !== "1"} type="number" value={this.state.value[3]} onChange={this.onDayChange}/>
                        &nbsp;of every month(s)
                    </div>

                    <div class="well well-small">
                        <input onChange={(e) => {this.setState({every:e.target.value}); this.props.onChange(['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],'L','*', '?','*'])}} type="radio" value="2" name="DailyRadio" checked={this.state.every === "2" ? true : false}/>
                        &nbsp; Last day of every month &nbsp;
                    </div>
                    <div class="well well-small">
                        <input onChange={(e) => {this.setState({every:e.target.value}); this.props.onChange(['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2] ,'LW','*', '?','*'])}} type="radio" value="3" name="DailyRadio" checked={this.state.every === "3" ? true : false}/>
                        &nbsp; On the last weekday of every month &nbsp;
                    </div>
                    <div class="well well-small">
                        <input type="radio"  onChange={(e) => {this.setState({every:e.target.value});  this.props.onChange(['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],`L-${1}`,'*', '?','*']) }} value="4" name="MonthlyRadio" checked={this.state.every === "4" ? true : false} />
                       
                        <input readOnly={this.state.every !== "4"} type="number" value={this.state.value[3].split('-')[1]} onChange={this.onLastDayChange}/>
                        &nbsp;day(s) before the end of the month
                    </div>
                    &nbsp; Start time &nbsp;
                    <select  class="hours" onChange={this.onAtHourChange} value={this.state.value[2]}>
                        <option value="0">00</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option>
                    </select>
                    <select value="DailyMinutes" class="minutes"  onChange={this.onAtMinuteChange} value={this.state.value[1]}>
                        <option value="0">00</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option>
                    </select>
                </div>)
    }
}

