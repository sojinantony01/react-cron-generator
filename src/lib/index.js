import React, { Component } from 'react';
import cronstrue from 'cronstrue';
import Minutes from './minutes';
import Daily from './daily';
import Hourly from './hourly';
import Weekly from './weekly';
import Monthly from './monthly';
import Yearly from './yearly';
// import './cron-builder.css';
const tabs = ['Minutes','Hourly','Daily','Weekly', 'Monthly'] //,'Yearly'
export default class Cron extends Component {
    constructor(props) {
        super(props);
        this.state = {
        //    selectedTab: tabs[0],
           
        };
    }
    componentWillMount() {
        if(!this.props.value || this.props.value.split(' ').length !== 7 ) {
            this.state.value = ['0','0','0','*','*','*','*']
            this.state.selectedTab = tabs[0]
        } else  {
            this.state.value = this.props.value.split(' ');
            let val = this.state.value;
            if((val[1].search('/') !== -1) && (val[2] == '*') && (val[3] == '1/1')) {
                this.state.selectedTab = tabs[0];
            } else if((val[3] == '1/1')) {
                this.state.selectedTab = tabs[1];
            } else if((val[3].search('/') !== -1) || (val[5] == 'MON-FRI')) {
                this.state.selectedTab = tabs[2];
            } else if (val[3] === '?') {
                this.state.selectedTab = tabs[3];
            }
            else if (val[3].startsWith('L') || val[4] === '1/1') {
                this.state.selectedTab = tabs[4];
            }
             else {
                this.state.selectedTab = tabs[0];
            }
        }
       
    }

    tabChanged(tab) {
        this.setState({selectedTab:tab,value:['0','0','0','*','*','*','*']}); 
    }
    getHeaders() {
        return tabs.map(d => {  
            return <li className={this.state.selectedTab === d ? 'active' : ''}><a onClick={this.tabChanged.bind(this,d)}>{d}</a></li>
        })
    }
    onValueChange(val) {
        let newVal = ''
        if(val && val.length) {
            this.setState({value:val})
        } else { 
            this.setState({value:['0','0','0','*','*','*','*']})
            val = ['0','0','0','*','*','*','*'];
        }
        newVal = val.toString().replace(/,/g,' ')
        newVal = newVal.replace(/!/g, ',')
        console.log(newVal);
        this.props.onChange(newVal) 
    }

    getComponent(tab) {
        switch(tab) {
            case tabs[0] : 
                return   <Minutes value={this.state.value} onChange={this.onValueChange.bind(this)}/>
                break;
            case tabs[1] : 
                return   <Hourly value={this.state.value} onChange={this.onValueChange.bind(this)}/>
                break;
            case tabs[2] : 
                return   <Daily value={this.state.value} onChange={this.onValueChange.bind(this)}/>
                break;
            case tabs[3] : 
                return   <Weekly value={this.state.value} onChange={this.onValueChange.bind(this)}/>
                break;
            case tabs[4] : 
                return   <Monthly value={this.state.value} onChange={this.onValueChange.bind(this)}/>
                break;
            case tabs[5] : 
                return   <Yearly value={this.state.value} onChange={this.onValueChange.bind(this)}/>
                break;
            default: 
                return
        }
    }
    getVal() {
        let val = cronstrue.toString(this.state.value.toString().replace(/,/g,' ').replace(/!/g, ','))
        return val;
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

