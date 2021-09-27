/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import cronstrue from 'cronstrue/i18n';
import { metadata, loadHeaders } from './meta';
import './cron-builder.css';

export default class Cron extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            headers: loadHeaders(this.props.options),
            locale: this.props.locale ? this.props.locale : 'en'
        };
    }

    componentWillMount() {
        this.setValue(this.props.value) 
        if(this.props.translateFn && !this.props.locale) {
            console.log('Warning !!! locale not set while using translateFn');
        }
        if(this.props.onRef) {
            this.props.onRef(this);
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.value !== nextProps.value && this.state.value) {
            let newVal = '';
            newVal = this.state.value.toString().replace(/,/g,' ');
            newVal = newVal.replace(/!/g, ',');
            if(nextProps.value !== newVal) {
                this.setValue(nextProps.value) 
            }
        }
    }

    setValue(value) {
        let prevState = this.state;
        prevState.value = value;
        if(prevState.value  && prevState.value.split(' ').length === 6) {
            prevState.value += ' *'
        }
        if(!prevState.value  || prevState.value.split(' ').length !== 7) {
            prevState.value = ['0','0','00','1/1','*','?','*']
            prevState.selectedTab = prevState.headers[0];
            this.parentChange(prevState.value);
        } else  {
            prevState.value = prevState.value.replace(/,/g, '!').split(' ');
        }
        let val = prevState.value;
        if((val[1].search('/') !== -1) && (val[2] === '*') && (val[3] === '1/1')) {
            prevState.selectedTab = prevState.headers[0];
        } else if((val[3] === '1/1')) {
            prevState.selectedTab = prevState.headers[1];
        } else if((val[3].search('/') !== -1) || (val[5] === 'MON-FRI')) {
            prevState.selectedTab = prevState.headers[2];
        } else if (val[3] === '?') {
            prevState.selectedTab = prevState.headers[3];
        } else if (val[3].startsWith('L') || val[4] === '1/1') {
            prevState.selectedTab = prevState.headers[4];
        } else {
            prevState.selectedTab = prevState.headers[0];
        }
        // this.parentChange(prevState.value)
        this.setState(prevState)
    }
    tabChanged(tab) {
        this.setState({selectedTab: tab, value:this.defaultValue(tab) }, ()=>this.parentChange(this.defaultValue(tab))); 
    }

    getHeaders() {
        return this.state.headers.map((d, index) => {
            return <li className="nav-item" key={index} ><a className={`nav-link ${this.state.selectedTab === d ? 'active' : ''}`} onClick={this.tabChanged.bind(this,d)}>{this.translate(d)}</a></li>
        })
    }

    onValueChange(val) {     
        if(val && val.length) {
            this.setState({ value:val }, ()=>this.parentChange(val));
        } else { 
            val = ['0','0','00','1/1','*','?','*']
            this.setState({ value:  val}, ()=>this.parentChange(val));
            // val = ['0','0','00','1/1','*','?','*'];
        }
    }

    parentChange(val) {
        let newVal = '';
        newVal = val.toString().replace(/,/g,' ');
        newVal = newVal.replace(/!/g, ',');
        this.props.onChange(newVal) 
    }

    getVal() {
        let val = cronstrue.toString(this.state.value.toString().replace(/,/g,' ').replace(/!/g, ','), { throwExceptionOnParseError: false, locale: this.state.locale })
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
        let selectedMetaData = metadata.find(data => data.name === tab);
        if(!selectedMetaData) {
            selectedMetaData = metadata[index];
        }
        if(!selectedMetaData) {
            throw new Error('Value does not match any available headers.');
        }
        const CronComponent = selectedMetaData.component;
        return <CronComponent translate={this.translate.bind(this)} value={this.state.value} onChange={this.onValueChange.bind(this)} />;
    }

    translate(key) {
        let translatedText = key;
        if(this.props.translateFn) {
            translatedText = this.props.translateFn(key);
            if(typeof translatedText !== 'string') {
                throw new Error('translateFn expects a string translation');
            }
        }
        return translatedText;
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
