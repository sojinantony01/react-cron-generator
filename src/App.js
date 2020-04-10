import React, { Component } from 'react';
import Cron from './lib';
import { HEADER } from './lib';

const options = {
  headers: [HEADER.MONTHLY, HEADER.WEEKLY, HEADER.MINUTES, HEADER.HOURLY, HEADER.DAILY]
};

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
      };
  }

  render() {
    return (<div>
      <Cron
        onChange={(e)=> {this.setState({value:e}); console.log(e)}}
        value={this.state.value}
        showResultText={true}
        showResultCron={true}
        />
                            
    </div>)
  }
}

export default App;