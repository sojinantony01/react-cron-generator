import React, { useState } from 'react';
import Cron from './lib';
import './lib/cron-builder.css';
// import { HEADER } from './lib';
import packageConf from '../package.json';

// Example of custom header options (currently commented out in usage)
// const cronOptions = {
//   headers: [HEADER.CUSTOM, HEADER.MINUTES, HEADER.HOURLY, HEADER.WEEKLY, HEADER.MONTHLY],
// };

interface State {
  value?: string;
  isUnix: boolean;
}
function App() {
  const [state, setState] = useState<State>({ isUnix: false });

  return (
    <div>
      <div>React cron generator: V {packageConf.version}</div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={state.isUnix}
            onChange={(e) => setState((prev) => ({ ...prev, isUnix: e.target.checked }))}
          />{' '}
          Use Unix format (5 fields) instead of Quartz (7 fields)
        </label>
      </div>
      <div>
        <Cron
          onChange={(e, text) => {
            setState((prev) => ({ ...prev, value: e }));
            console.log('Cron value:', e);
            console.log('Human readable:', text);
          }}
          value={state.value}
          showResultText={true}
          showResultCron={true}
          isUnix={state.isUnix}
          // options={cronOptions}
        />
      </div>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <strong>Format:</strong> {state.isUnix ? 'Unix (5 fields)' : 'Quartz (7 fields)'}
        <br />
        <strong>Example:</strong>{' '}
        {state.isUnix ? '*/5 * * * * (Every 5 minutes)' : '0 0/5 * * * ? * (Every 5 minutes)'}
      </div>
    </div>
  );
}

export default App;
