import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import cronstrue from 'cronstrue/i18n';
import { metadata, loadHeaders, HeaderKeyType, HeaderValType } from './meta';
import translations from '../lib/localization/translation.json';
import { unixToQuartz, quartzToUnix } from './utils/cron-converter';
import { validateCron } from './utils/cron-validator';
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
  isUnix?: boolean;
  use6FieldQuartz?: boolean;
}

interface State {
  value: string[];
  selectedTab?: HeaderValType;
  headers: HeaderValType[];
  locale: string;
  isUnix: boolean;
}

interface Dic {
  [key: string]: string;
}

const defaultCron = '0 0 00 1/1 * ? *';

const Cron: React.FunctionComponent<CronProp> = (props) => {
  // Validate prop combination
  if (props.isUnix && props.use6FieldQuartz) {
    throw new Error(
      'Cannot use both isUnix and use6FieldQuartz props together. Please use only one format option.',
    );
  }

  const [state, setState] = useState<State>({
    value: [],
    headers: loadHeaders(props.options),
    locale: props.locale ? props.locale : 'en',
    isUnix: props.isUnix || false,
  });

  // Use refs to avoid stale closures in callbacks
  const propsRef = useRef(props);
  const stateRef = useRef(state);

  // Update refs when props or state change
  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  /**
   * Translate function with memoization
   */
  const { translateFn } = props;
  const translate = useCallback(
    (key: string): string => {
      let translatedText = key;
      if (translateFn) {
        translatedText = translateFn(key);
        if (typeof translatedText !== 'string') {
          throw new Error('translateFn expects a string translation');
        }
      } else if ((translations as Dic)[translatedText]) {
        return (translations as Dic)[translatedText];
      }
      return translatedText;
    },
    [translateFn],
  );

  /**
   * Convert internal Quartz format to output format (Unix or Quartz)
   * This is the single source of truth for format conversion
   */
  const convertToOutputFormat = useCallback(
    (quartzValue: string[], isUnixFormat?: boolean): string => {
      let outputVal = quartzValue.toString().replace(/,/g, ' ').replace(/!/g, ',');

      const useUnix = isUnixFormat !== undefined ? isUnixFormat : stateRef.current.isUnix;

      if (useUnix) {
        try {
          outputVal = quartzToUnix(outputVal);
        } catch (e) {
          console.error('Error converting Quartz to Unix:', e);
          return outputVal;
        }
      } else if (propsRef.current.use6FieldQuartz) {
        // If use6FieldQuartz is enabled, output 6-field (remove year field)
        const parts = outputVal.split(' ');
        if (parts.length === 7 && parts[6] === '*') {
          outputVal = parts.slice(0, 6).join(' ');
        }
      }

      return outputVal;
    },
    [],
  );

  /**
   * Get human-readable cron description
   */
  const getVal = useCallback((cronExpression: string) => {
    // cronstrue expects Quartz format, so if we have Unix, convert it first
    let cronForParsing = cronExpression;

    // Check if the cron expression is in Unix format (5 fields)
    const parts = cronForParsing.split(' ');
    if (parts.length === 5) {
      try {
        cronForParsing = unixToQuartz(cronForParsing);
      } catch (e) {
        // If conversion fails, use as is
        console.warn('Failed to convert Unix to Quartz for parsing:', e);
      }
    }

    try {
      const val = cronstrue.toString(cronForParsing, {
        throwExceptionOnParseError: false,
        locale: stateRef.current.locale,
      });
      if (val.search('undefined') === -1 && cronForParsing && cronForParsing.length) {
        return val;
      }
    } catch (e) {
      console.warn('Failed to parse cron expression:', e);
    }
    return '-';
  }, []);

  /**
   * Notify parent of value changes
   */
  const parentChange = useCallback(
    (val: string[]) => {
      const outputVal = convertToOutputFormat(val);

      // Validate the output cron expression
      const validation = validateCron(outputVal);
      if (!validation.isValid) {
        console.warn('Invalid cron expression:', validation.error);
        return;
      }

      propsRef.current.onChange(outputVal, getVal(outputVal));
    },
    [convertToOutputFormat, getVal],
  );

  /**
   * Set cron value from external source
   */
  const setValue = useCallback(
    (value: string) => {
      const allHeaders = loadHeaders();
      let processedValue = value;

      // Convert Unix to Quartz if needed for internal representation
      if (stateRef.current.isUnix && value) {
        const parts = value.split(' ');
        if (parts.length === 5) {
          try {
            processedValue = unixToQuartz(value);
          } catch (e) {
            console.error('Error converting Unix to Quartz:', e);
            processedValue = defaultCron;
          }
        }
      }

      let valueArray = processedValue.replace(/,/g, '!').split(' ');

      // Handle 6-field cron (add year field for internal processing)
      if (processedValue && processedValue.split(' ').length === 6) {
        valueArray.push('*');
      }

      // Validate and set default if invalid
      if (!processedValue || processedValue.split(' ').length !== 7) {
        processedValue = defaultCron;
        valueArray = processedValue.split(' ');
        setState((prev) => ({
          ...prev,
          value: valueArray,
          selectedTab: allHeaders[0],
        }));
        parentChange(valueArray);
        return;
      }

      // Determine appropriate tab based on cron pattern
      let selectedTab = allHeaders[0];
      const val = valueArray;

      if (val[1].search('/') !== -1 && val[2] === '*' && val[3] === '1/1') {
        selectedTab = allHeaders[0]; // Minutes
      } else if (val[3] === '1/1') {
        selectedTab = allHeaders[1]; // Hourly
      } else if (val[3].search('/') !== -1 || val[5] === 'MON-FRI') {
        selectedTab = allHeaders[2]; // Daily
      } else if (val[3] === '?') {
        selectedTab = allHeaders[3]; // Weekly
      } else if (val[3].startsWith('L') || val[4] === '1/1') {
        selectedTab = allHeaders[4]; // Monthly
      }

      // Ensure selected tab is in available headers
      if (!stateRef.current.headers.includes(selectedTab)) {
        selectedTab = stateRef.current.headers[0];
      }

      setState((prev) => ({
        ...prev,
        value: valueArray,
        selectedTab,
      }));
    },
    [parentChange],
  );

  /**
   * Get default value for a tab
   */
  const defaultValue = useCallback((tab: HeaderValType): string[] => {
    const defaultValCron = metadata.find((m) => m.name === tab);
    if (!defaultValCron || !defaultValCron.initialCron) {
      return defaultCron.split(' ');
    }
    return [...defaultValCron.initialCron];
  }, []);

  /**
   * Handle tab change
   */
  const tabChanged = useCallback(
    (tab: HeaderValType) => {
      if (stateRef.current.selectedTab !== tab && !propsRef.current.disabled) {
        setState((prev) => ({
          ...prev,
          selectedTab: tab,
          value: defaultValue(tab),
        }));
      }
    },
    [defaultValue],
  );

  /**
   * Handle value change from child components
   */
  const onValueChange = useCallback(
    (val: string[]) => {
      if (val && val.length) {
        setState((prev) => ({ ...prev, value: [...val] }));
        parentChange(val);
      } else {
        const defaultVal = ['0', '0', '00', '1/1', '*', '?', '*'];
        setState((prev) => ({ ...prev, value: defaultVal }));
        parentChange(defaultVal);
      }
    },
    [parentChange],
  );

  /**
   * Sync with external value prop
   */
  useEffect(() => {
    let newVal = stateRef.current.value.toString().replace(/,/g, ' ');
    newVal = newVal.replace(/!/g, ',');

    // Convert to appropriate format for comparison using props.isUnix (not stateRef)
    let compareVal = newVal;
    if (props.isUnix) {
      try {
        compareVal = quartzToUnix(newVal);
      } catch (e) {
        // Ignore conversion errors during comparison
      }
    } else if (props.use6FieldQuartz) {
      const parts = newVal.split(' ');
      if (parts.length === 7 && parts[6] === '*') {
        compareVal = parts.slice(0, 6).join(' ');
      }
    }

    if (props.value !== compareVal) {
      setValue(props.value ? props.value : '');
    }

    if (props.translateFn && !props.locale) {
      console.warn('Warning !!! locale not set while using translateFn');
    }
  }, [props.value, props.isUnix, props.use6FieldQuartz, props.translateFn, props.locale, setValue]);

  /**
   * Handle isUnix prop changes - notify parent with converted format
   */
  useEffect(() => {
    if (props.isUnix !== undefined && props.isUnix !== state.isUnix) {
      setState((prev) => ({ ...prev, isUnix: props.isUnix || false }));
      // Immediately notify parent with new format
      if (state.value && state.value.length) {
        const outputVal = convertToOutputFormat(state.value, props.isUnix);
        const validation = validateCron(outputVal);
        if (validation.isValid) {
          propsRef.current.onChange(outputVal, getVal(outputVal));
        }
      }
    }
  }, [props.isUnix, state.isUnix, state.value, convertToOutputFormat, getVal]);

  /**
   * Notify parent when value changes
   */
  useEffect(() => {
    if (state.value && state.value.length) {
      parentChange(state.value);
    }
  }, [state.value, parentChange]);

  /**
   * Render tab headers
   */
  const headers = useMemo(
    () =>
      state.headers.map((d, index) => (
        <li className="nav-item" key={index}>
          <button
            type="button"
            className={`nav-link ${state.selectedTab === d ? 'active' : ''} ${
              props.disabled ? 'disabled' : ''
            }`}
            onClick={() => tabChanged(d)}
            disabled={props.disabled}
            aria-label={`Select ${translate(d)} tab`}
          >
            {translate(d)}
          </button>
        </li>
      )),
    [state.headers, state.selectedTab, props.disabled, tabChanged, translate],
  );

  /**
   * Get component for selected tab
   */
  const getComponent = useCallback(
    (tab: HeaderValType) => {
      const index = state.headers.indexOf(tab);
      let selectedMetaData = metadata.find((data) => data.name === tab);
      if (!selectedMetaData) {
        selectedMetaData = { ...metadata[index] };
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
          isUnix={state.isUnix}
        />
      );
    },
    [state.headers, state.value, state.isUnix, props.disabled, translate, onValueChange],
  );

  /**
   * Get display value for result cron (uses single source of truth)
   */
  const displayCron = useMemo(() => {
    return convertToOutputFormat(state.value, state.isUnix);
  }, [state.value, state.isUnix, convertToOutputFormat]);

  return (
    <div className="cron_builder">
      <ul className="nav nav-tabs" role="tablist">
        {headers}
      </ul>
      <div className="cron_builder_bordering" role="tabpanel">
        {state.selectedTab ? getComponent(state.selectedTab) : 'Select a header'}
      </div>
      {props.showResultText && (
        <div className="cron-builder-bg" aria-label="Cron description">
          {getVal(displayCron)}
        </div>
      )}
      {props.showResultCron && (
        <div className="cron-builder-bg" aria-label="Cron expression">
          {displayCron}
        </div>
      )}
    </div>
  );
};

export default Cron;
