/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import cronstrue from 'cronstrue';
import { metadata, loadHeaders } from './meta';
import './cron-builder.css';

export default class Cron extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            headers: loadHeaders(this.props.options),
        };
    }

    componentWillMount() {
        if(!this.props.value || this.props.value.split(' ').length !== 7 ) {
            this.state.value = ['0','0','00','1/1','*','?','*']
            this.state.selectedTab = this.state.headers[0];
            this.parentChange(this.state.value);
        } else  {
            this.state.value = this.props.value.replace(/,/g, '!').split(' ');
        }
        let val = this.state.value;
        if((val[1].search('/') !== -1) && (val[2] === '*') && (val[3] === '1/1')) {
            this.state.selectedTab = this.state.headers[0];
        } else if((val[3] === '1/1')) {
            this.state.selectedTab = this.state.headers[1];
        } else if((val[3].search('/') !== -1) || (val[5] === 'MON-FRI')) {
            this.state.selectedTab = this.state.headers[2];
        } else if (val[3] === '?') {
            this.state.selectedTab = this.state.headers[3];
        } else if (val[3].startsWith('L') || val[4] === '1/1') {
            this.state.selectedTab = this.state.headers[4];
        } else {
            this.state.selectedTab = this.state.headers[0];
        }
    }

    tabChanged(tab) {
        this.setState({selectedTab: tab, value:this.defaultValue(tab) }); 
        this.parentChange(this.defaultValue(tab))
    }

    getHeaders() {
        return this.state.headers.map((d, index) => {
            return <li key={index} className={this.state.selectedTab === d ? 'active' : ''}><a onClick={this.tabChanged.bind(this,d)}>{d}</a></li>
        })
    }

    onValueChange(val) {     
        if(val && val.length) {
            this.setState({ value:val });
        } else { 
            this.setState({ value: ['0','0','00','1/1','*','?','*'] });
            val = ['0','0','00','1/1','*','?','*'];
        }
       this.parentChange(val)
    }

    parentChange(val) {
        let newVal = '';
        newVal = val.toString().replace(/,/g,' ');
        newVal = newVal.replace(/!/g, ',');
        this.props.onChange(newVal) 
    }

    getVal() {
        let val = cronstrue.toString(this.state.value.toString().replace(/,/g,' ').replace(/!/g, ','))
        if(val.search('undefined') === -1) {
            return val;
        }
        return '-';   
    }

    defaultValue(tab) {
        const index = this.state.headers.indexOf(tab);
        if(metadata[index] === -1) {
            return;
        }
        return metadata[index].initialCron;
    }

    getComponent(tab) {
        const index = this.state.headers.indexOf(tab);
        if(metadata[index] === -1) {
            return;
        }
        const selectedMetaData = metadata.find(data => data.component.name === (tab + 'Cron'))
        const CronComponent = selectedMetaData.component;
        return <CronComponent value={this.state.value} onChange={this.onValueChange.bind(this)} />;
    }

    render() {
        return (    
            <div className='cron_builder'>
            <ul className="nav nav-tabs" >
                {this.getHeaders()}
            </ul>
            <div className="cron_builder_bordering">{this.getComponent(this.state.selectedTab)}</div>
            {this.props.showResultText && <div className="cron-builder-bg">{this.getVal()}</div>}
            {this.props.showResultCron && <div className="cron-builder-bg">{this.state.value.toString().replace(/,/g,' ').replace(/!/g, ',')}</div>}       
        </div>)
    }
}
