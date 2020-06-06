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
| translateFn | translate function callback | method | No
| locale | locale for cronstrue | en | No
| options | Options for Cron component, *Must pass a valid cron value for available headers | All available headers | No

**translateFn**

Expects a method. Use this prop for localization support. `react-cron-generator` will call this method for every key. List of keys are available [here](https://github.com/sojinantony01/react-cron-generator/tree/master/src/lib/localization/translation.json)

`locale` option should be set for correct `ResultText` translation. Please visit [cronstrue](https://github.com/bradymholt/cRonstrue) for supported locales.

## Options

**options.headers**

```
import { HEADER } from 'react-cron-generator';

const options = {
  headers: [HEADER.MONTHLY, HEADER.WEEKLY, HEADER.MINUTES, HEADER.HOURLY, HEADER.DAILY]
};

```

Added `ref` to the component now you can access state and functions using ref. You can change cron value from outside the component even after cron generator loaded, 

add the new prop  ` onRef={ref => (this.cronGen = ref)} `

```
      <Cron
        onRef={ref => (this.cronGen = ref)}  
        onChange={(e)=> {this.setState({value:e}); console.log(e)}}
        value={this.state.value}
        showResultText={true}
        showResultCron={true}
        />
```
 Just call this.cronGen.setValue(/* Your new value */) to change the value when you need 

[Sojin Antony](https://github.com/sojinantony01)

## Acknowledgments

**cronstrue**

[Viswanath Lekshmanan](https://viswanathl.in/)
