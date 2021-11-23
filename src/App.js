import React, { Component } from 'react';
import Cron from './lib';
import { HEADER } from './lib';
import  packageConf from  '../package.json'

// const cronOptions = {
//   headers: [ HEADER.DAILY, HEADER.WEEKLY, HEADER.MONTHLY],
// };
class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
      };
  }

  render() {

    return (<div>
      <div>
        React cron generator: V {packageConf.version}
      </div>
      <div>
        <Cron
          onChange={(e, text)=> {this.setState({value:e}); console.log(e, text)}}
          value={this.state.value}
          showResultText={true}
          showResultCron={true}
          // options={cronOptions}
          />  
      </div>               
    </div>)
  }
}

export default App;