import React, {Component} from 'react';

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
    }

    onChange(e) {
        let val = ['*', '*', '*', '*', '*', '?', '*'];
        this.props.onChange(val);
        // if((e.target.value > 0 && e.target.value < 60) || e.target.value === '') {
        //     let val = ['0','*','*','*','*','?','*']
        //     val[1] = e.target.value ? `0/${e.target.value}` : val[1];
        //     this.props.onChange(val)
        // }
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
        if (parts[0] !== cron_minutes) {
            this.setState({cron_minutes: parts[0]});
            cron_minutes_id, cronValueItemToList(true, 59, parts[0]);
        }
        if (parts[1] !== cron_hours) {
            this.setState({cron_hours: parts[1]});
            cron_hours_id, cronValueItemToList(true, 23, parts[1]);
        }
        if (parts[2] !== cron_dom) {
            this.setState({cron_dom: parts[2]});
            cron_dom_id, cronValueItemToList(false, 31, parts[2]);
        }
        if (parts[3] !== cron_months) {
            this.setState({cron_months: parts[3]});
            cron_months_id, cronValueItemToList(false, 12, parts[3]);
        }
        if (parts[4] !== cron_dow) {
            this.setState({cron_dow: parts[4]});
            cron_dow_id, cronValueItemToList(true, 6, parts[4]);
        }
    }

    render() {
        this.state.value = this.props.value
        return (<div className="well">
            Script <input className="form-input" type="input" onChange={this.onChange.bind(this)}
                          value={this.state.value[1].split('/')[1]}/>
        </div>)
    }
}
