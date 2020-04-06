import React, { Component } from 'react';
import Cron from './lib';
import { HEADERS } from './lib/meta';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }

  render() {
    const options = {
      headers: [HEADERS.MONTHLY, HEADERS.WEEKLY, HEADERS.MINUTES]
    };
    return (<div>
      <Cron
        options={options}
        onChange={(e)=> {this.setState({value:e});}}
        value={this.state.value}
        showResultText={true}
        showResultCron={true} />            
    </div>)
  }
}

export default App;
