import React, {Component} from 'react';
import cronstrue from 'cronstrue';

export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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

    render() {
        this.state.value = this.props.value;
        return (<div className="well">
            Script <input className="form-input" type="input" onChange={this.onChange.bind(this)}
                          value={this.state.value[1].split('/')[1]}/>
        </div>);
    }
}
