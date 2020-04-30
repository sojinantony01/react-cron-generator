import React, {Component} from 'react';
import cronstrue from 'cronstrue';

export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cron_minutes: 0,
            cron_hours: 0,
            cron_dom: 0,
            cron_months: 0,
            cron_dow: 0
        };
        this.cronValueItemToList = this.cronValueItemToList.bind(this);
        this.importCronExpression = this.importCronExpression.bind(this);
    }

    onChange(e) {
        let parts = e.target.value.split(" ");
        let val = cronstrue.toString(e.target.value, {throwExceptionOnParseError: false});
        if (val.search('Check the cron expression') === -1) {
            if (parts.length >= 6) {
                this.props.onChange(e.target.value.toString().replace(/,/g, '!'))
            }
        }else{
            this.props.onChange('* * * * * **');
        }
    }

    /** List all select items contained in the list {{{
     * @param id jQuery selector
     * @param list The values to select
     */
    cronHelperSelectList(e, list) {
        e.target.value = list;
    }

    importCronExpression(expression) {
        if (!expression.match(/^((\*(\/[1-9][0-9]?)?|([0-9]{1,2}(-[0-9]{1,2})?)(,[0-9]{1,2}(-[0-9]{1,2})?)*)( |$)){5}$/))
            return;
        let parts = expression.split(" ");
        let tmp;
        if (parts[0] !== this.state.cron_minutes) {
            this.setState({cron_minutes: parts[0]});
            this.cronValueItemToList(true, 59, parts[0]);
        }
        if (parts[1] !== this.state.cron_hours) {
            this.setState({cron_hours: parts[1]});
            this.cronValueItemToList(true, 23, parts[1]);
        }
        if (parts[2] !== this.state.cron_dom) {
            this.setState({cron_dom: parts[2]});
            this.cronValueItemToList(false, 31, parts[2]);
        }
        if (parts[3] !== this.state.cron_months) {
            this.setState({cron_months: parts[3]});
            this.cronValueItemToList(false, 12, parts[3]);
        }
        if (parts[4] !== this.state.cron_dow) {
            this.setState({cron_dow: parts[4]});
            this.cronValueItemToList(true, 6, parts[4]);
        }
    }

    /** Convert a cron-expression (one item) to a list of values {{{
     * @param bool zeroAllowed  weather the number zero is allowed (true) or not
     *                          (false)
     * @param  int              max the maximum value (eg. 59 for minutes)
     * @param  string           the cron expression (eg. "*")
     * @return int[]
     */
    cronValueItemToList(allowZero, maxValue, value) {
        let list = [];
        if (value === "*") {
            for (let i = allowZero ? 0 : 1; i <= maxValue; i++) {
                list.push(i);
            }
        } else if (value.match(/^\*\/[1-9][0-9]?$/)) {
            let c = parseInt(value.match(/^\*\/([1-9][0-9]?)$/)[1]);
            for (let i = allowZero ? 0 : 1; i <= maxValue; i++) {
                if (i % c === 0)
                    list.push(i);
            }
        } else if (value.match(/^([0-9]+|[0-9]+-[0-9]+)(,[0-9]+|,[0-9]+-[0-9]+)*$/)) {
            let a = value.split(",");
            for (let i = 0; i < a.length; i++) {
                let e = a[i].split("-");
                if (e.length === 2) {
                    for (let j = parseInt(e[0]); j <= parseInt(e[1]); j++)
                        list.push(j);
                } else {
                    list.push(parseInt(e[0]));
                }
            }
        } else {
            return [];
        }
        return list;
    }

    render() {
        this.state.value = this.props.value
        return (<div className="well">
            Script <input className="form-input" type="input" onChange={this.onChange.bind(this)}
                          value={this.state.value[1].split('/')[1]}/>
        </div>)
    }
}
