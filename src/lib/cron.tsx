import React, { useEffect, useState } from 'react';
import cronstrue from 'cronstrue/i18n';
import { metadata, loadHeaders, HeaderKeyType, HeaderValType } from './meta';
import translations from '../lib/localization/translation.json';
import './cron-builder.css';
export interface CronProp {
  value?: string;
  onChange(val: string, text: string): void;
  showResultText: boolean;
  showResultCron: boolean;
  translateFn?(key: string): string;
  locale?: string;
  options?: { headers: HeaderKeyType[] };
  disabled?: boolean;
}
interface State {
  value: string[];
  selectedTab?: HeaderValType;
  headers: HeaderValType[];
  locale: string;
}
interface Dic {
  [key: string]: string;
}
const defaultCron = '0 0 00 1/1 * ? *';
const Cron: React.FunctionComponent<CronProp> = (props) => {
  const [state, setState] = useState<State>({
    value: [],
    headers: loadHeaders(props.options),
    locale: props.locale ? props.locale : 'en',
  });
  useEffect(() => {
    let newVal = '';
    newVal = state.value.toString().replace(/,/g, ' ');
    newVal = newVal.replace(/!/g, ',');
    if (props.value !== newVal) {
      setValue(props.value ? props.value : '');
    }
    if (props.translateFn && !props.locale) {
      console.warn('Warning !!! locale not set while using translateFn');
    }
  }, [props.value]);
  useEffect(() => {
    state.value && state.value.length && parentChange(state.value);
  }, [state.value]);
  const setValue = (value: string) => {
    let prevState = { ...state };
    prevState.value = value.replace(/,/g, '!').split(' ');
    const allHeaders = loadHeaders();
    if (value && value.split(' ').length === 6) {
      prevState.value.push('*');
    }
    if (!value || value.split(' ').length !== 7) {
      value = '0 0 00 1/1 * ? *';
      prevState.selectedTab = allHeaders[0];
      prevState.value = value.split(' ');
      parentChange(value.split(' '));
    } else {
      prevState.value = value.replace(/,/g, '!').split(' ');
    }
    let val = prevState.value;
    if (val[1].search('/') !== -1 && val[2] === '*' && val[3] === '1/1') {
      prevState.selectedTab = allHeaders[0];
    } else if (val[3] === '1/1') {
      prevState.selectedTab = allHeaders[1];
    } else if (val[3].search('/') !== -1 || val[5] === 'MON-FRI') {
      prevState.selectedTab = allHeaders[2];
    } else if (val[3] === '?') {
      prevState.selectedTab = allHeaders[3];
    } else if (val[3].startsWith('L') || val[4] === '1/1') {
      prevState.selectedTab = allHeaders[4];
    } else {
      prevState.selectedTab = allHeaders[0];
    }
    if (!prevState.headers.includes(prevState.selectedTab)) {
      prevState.selectedTab = prevState.headers[0];
    }
    setState(prevState);
  };
  const tabChanged = (tab: HeaderValType) => {
    if (state.selectedTab !== tab && !props.disabled) {
      setState({ ...state, selectedTab: tab, value: defaultValue(tab) });
    }
  };
  const getHeaders = () => {
    return state.headers.map((d, index) => {
      return (
        <li className="nav-item" key={index}>
          <a
            className={`nav-link ${state.selectedTab === d ? 'active' : ''} ${props.disabled ? 'disabled' : ''}`}
            onClick={() => tabChanged(d)}
          >
            {translate(d)}
          </a>
        </li>
      );
    });
  };
  const onValueChange = (val: string[]) => {
    if (val && val.length) {
      setState({ ...state, value: [...val] });
    } else {
      val = ['0', '0', '00', '1/1', '*', '?', '*'];
      setState({ ...state, value: val });
    }
  };
  const parentChange = (val: string[]) => {
    let newVal = '';
    newVal = val.toString().replace(/,/g, ' ');
    newVal = newVal.replace(/!/g, ',');
    props.onChange(newVal, getVal());
  };
  const getVal = () => {
    let val = cronstrue.toString(state.value.toString().replace(/,/g, ' ').replace(/!/g, ','), {
      throwExceptionOnParseError: false,
      locale: state.locale,
    });
    if (val.search('undefined') === -1 && state.value && state.value.length) {
      return val;
    }
    return '-';
  };

  const defaultValue = (tab: HeaderValType): string[] => {
    let defaultValCron = metadata.find((m) => m.name == tab);
    if (!defaultValCron || !defaultValCron.initialCron) {
      return defaultCron.split(' ');
    }
    return defaultValCron.initialCron;
  };
  const getComponent = (tab: HeaderValType) => {
    const index = state.headers.indexOf(tab);
    let selectedMetaData = metadata.find((data) => data.name === tab);
    if (!selectedMetaData) {
      selectedMetaData = metadata[index];
    }
    if (!selectedMetaData) {
      throw new Error('Value does not match any available headers.');
    }
    const CronComponent = selectedMetaData.component;
    return (
      <CronComponent
        translate={translate}
        value={state.value}
        onChange={onValueChange}
        disabled={props.disabled}
      />
    );
  };
  const translate = (key: string): string => {
    let translatedText = key;
    if (props.translateFn) {
      translatedText = props.translateFn(key);
      if (typeof translatedText !== 'string') {
        throw new Error('translateFn expects a string translation');
      }
    } else if ((translations as Dic)[translatedText]) {
      return (translations as Dic)[translatedText];
    }
    return translatedText;
  };

  return (
    <div className="cron_builder">
      <ul className="nav nav-tabs">{getHeaders()}</ul>
      <div className="cron_builder_bordering">
        {state.selectedTab ? getComponent(state.selectedTab) : 'Select a header'}
      </div>
      {props.showResultText && <div className="cron-builder-bg">{getVal()}</div>}
      {props.showResultCron && (
        <div className="cron-builder-bg">
          {state.value.toString().replace(/,/g, ' ').replace(/!/g, ',')}
        </div>
      )}
    </div>
  );
};
export default Cron;
