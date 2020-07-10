import React, { Component } from 'react';
import Cron from './lib';


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