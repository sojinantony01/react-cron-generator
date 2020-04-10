# react-cron-generator

Simple react component to generate cron expression

## Getting Started

Package helps to build linux scheduler cron expression.
Make sure you have include bootstrap in your project

```
data = '* * * * * * *'
```
```
npm install react-cron-generator

```
## demo
[Live demo](https://sojinantony01.github.io/react-cron-generator/)

![alt text](https://raw.githubusercontent.com/sojinantony01/react-cron-generator/master/public/images/Screenshot%20from%202019-06-08%2000-31-31.png)

![alt text](https://raw.githubusercontent.com/sojinantony01/react-cron-generator/master/public/images/Screenshot%20from%202019-06-08%2000-31-57.png)


```
import React, { Component } from 'react'
import Cron from 'react-cron-generator'
import 'react-cron-generator/dist/cron-builder.css'


class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }

  render() {
    return (<div>
      <Cron
        onChange={(e)=> {this.setState({value:e});}}
        value={this.state.value}
        showResultText={true}
        showResultCron={true}
        />
                            
    </div>)
  }
}

export default App;

```
## props

| Prop | Description | Default | Mandatory
| --- | --- | -- | -- |
| value | cron expression  |  |  No |
| onChange |  |  | Yes
| showResultText | show in readable text format | false | No
| showResultCron | show cron expression | false | No
| options | Options for Cron component, *Must pass a valid cron value for available headers | All available headers | No

## Options

**options.headers**

```
import { HEADER } from 'react-cron-generator';

const options = {
  headers: [HEADER.MONTHLY, HEADER.WEEKLY, HEADER.MINUTES, HEADER.HOURLY, HEADER.DAILY]
};

```

[Sojin Antony](https://github.com/sojinantony01)

## Acknowledgments

**cronstrue**

[Viswanath Lekshmanan](https://github.com/ViswanathLekshmanan)
