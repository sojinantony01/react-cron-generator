import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import I18 from '../../../../../i18'


class Cron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour:0,
            minute:0
        };

        this.onDayChange = this.onDayChange.bind(this);
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    }
    componentWillMount() {
        this.state.value = this.props.value;
        if(this.state.value[3] === '?') {
            this.state.every = false;
        } else {
            this.state.every = true;
        }
    }
    onDayChange(e) {
        let val = ['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],'*','*','?','*'];
        val[3] = `1/${e.target.value}`;
        this.props.onChange(val)
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
                        <input type="radio" onClick={(e) => {this.setState({every:true}) ; this.props.onChange()}} value="1" name="DailyRadio" checked={this.state.every ? true : false} />
                        &nbsp; <I18 tkey='Every' /> &nbsp;
                        <input disabled={this.state.every ? false: true} type="Number" onChange={this.onDayChange} value={this.state.value[3].split('/')[1] ? this.state.value[3].split('/')[1] :''} />
                        &nbsp; <I18 tkey='day(s)' />
                    </div>
                    <div class="well well-small">
                        <input onClick={(e) => {this.setState({every:false}); this.props.onChange(['0',this.state.value[1], this.state.value[2],'?','*', 'MON-FRI','*'])}} type="radio" value="2" name="DailyRadio" checked={this.state.every ? false : true}/>
                        &nbsp; <I18 tkey='Every week day' /> &nbsp;
                    </div>
                    &nbsp; <I18 tkey='Start time' /> &nbsp;
                    <select id="DailyHours" class="hours" onChange={this.onAtHourChange} value={this.state.value[2]}>
                        <option id="0">00</option><option id="1">01</option><option id="2">02</option><option id="3">03</option><option id="4">04</option><option id="5">05</option><option id="6">06</option><option id="7">07</option><option id="8">08</option><option id="9">09</option><option id="10">10</option><option id="11">11</option><option id="12">12</option><option id="13">13</option><option id="14">14</option><option id="15">15</option><option id="16">16</option><option id="17">17</option><option id="18">18</option><option id="19">19</option><option id="20">20</option><option id="21">21</option><option id="22">22</option><option id="23">23</option>
                    </select>
                    <select id="DailyMinutes" class="minutes"  onChange={this.onAtMinuteChange} value={this.state.value[1]}>
                        <option id="0">00</option><option id="1">01</option><option id="2">02</option><option id="3">03</option><option id="4">04</option><option id="5">05</option><option id="6">06</option><option id="7">07</option><option id="8">08</option><option id="9">09</option><option id="10">10</option><option id="11">11</option><option id="12">12</option><option id="13">13</option><option id="14">14</option><option id="15">15</option><option id="16">16</option><option id="17">17</option><option id="18">18</option><option id="19">19</option><option id="20">20</option><option id="21">21</option><option id="22">22</option><option id="23">23</option><option id="24">24</option><option id="25">25</option><option id="26">26</option><option id="27">27</option><option id="28">28</option><option id="29">29</option><option id="30">30</option><option id="31">31</option><option id="32">32</option><option id="33">33</option><option id="34">34</option><option id="35">35</option><option id="36">36</option><option id="37">37</option><option id="38">38</option><option id="39">39</option><option id="40">40</option><option id="41">41</option><option id="42">42</option><option id="43">43</option><option id="44">44</option><option id="45">45</option><option id="46">46</option><option id="47">47</option><option id="48">48</option><option id="49">49</option><option id="50">50</option><option id="51">51</option><option id="52">52</option><option id="53">53</option><option id="54">54</option><option id="55">55</option><option id="56">56</option><option id="57">57</option><option id="58">58</option><option id="59">59</option>
                    </select>
                </div>)
    }
}

Cron.propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(connect(store => ({ 
    user: store.user,
    actions: store.actions,
    translations :store.translations,
}))(Cron));