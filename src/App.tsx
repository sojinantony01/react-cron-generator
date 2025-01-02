import React, { useState } from 'react';
import Cron from './lib';
import { HEADER } from './lib';
import packageConf from '../package.json';

const cronOptions = {
  headers: [HEADER.CUSTOM, HEADER.MINUTES, HEADER.HOURLY, HEADER.WEEKLY, HEADER.MONTHLY],
};

interface State {
  value?: string;
}
function App() {
  const [state, setState] = useState<State>({});

  return (
    <div>
      <div>React cron generator: V {packageConf.version}</div>
      <div>
        <Cron
          onChange={(e, text) => {
            setState({ value: e });
            console.log(e, text);
          }}
          value={state.value}
          showResultText={true}
          showResultCron={true}
          // options={cronOptions}
        />
      </div>
    </div>
  );
}

export default App;
