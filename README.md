# react-cron-generator

Simple react component to generate cron expression

## Getting Started

Package helps to build linux scheduler cron expression.

[![npm version](https://badge.fury.io/js/react-cron-generator.svg)](https://badge.fury.io/js/react-cron-generator) ![Downloads](https://img.shields.io/npm/dm/react-cron-generator.svg)
 
  <a href="https://github.com/sojinantony01/react-spread-sheet/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/react-cron-generator.svg" alt="license">
  </a>

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
| onChange | have 2 arguments, 1st is cron value and 2nd is cron result text from cronstrue  |  | Yes
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
  headers: [HEADER.MONTHLY, HEADER.WEEKLY, HEADER.MINUTES, HEADER.HOURLY, HEADER.DAILY, HEADER.CUSTOM]
};

```


## Release notes 2.x.x
1. Build Procedure updated
2. Updated to latest react(18)
3. Migrated to hooks and typescript

[Sojin Antony](https://github.com/sojinantony01)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg)](https://www.buymeacoffee.com/sojinantony)


## Acknowledgments

**cronstrue**

[Viswanath Lekshmanan](https://viswanathl.in/)
