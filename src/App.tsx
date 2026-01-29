import React, { useState } from 'react';
import Cron from './lib';
import './lib/cron-builder.css';
import './App.css';
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
    <div className="app-container">
      {/* Compact Header */}
      <header className="app-header">
        <h1>Cron Expression Generator</h1>
        <p className="subtitle">Create cron schedules easily - Supports Unix & Quartz formats</p>
      </header>

      {/* Format Selection - Compact */}
      <div className="format-selection">
        <label>
          <input
            type="checkbox"
            checked={state.isUnix}
            onChange={(e) => setState((prev) => ({ ...prev, isUnix: e.target.checked }))}
          />
          <span>Use Unix format (5 fields) instead of Quartz (7 fields)</span>
        </label>
        <div className="format-info">
          <strong>Current Format:</strong> {state.isUnix ? 'Unix (5 fields)' : 'Quartz (7 fields)'}
          <br />
          <strong>Example:</strong>{' '}
          {state.isUnix ? '*/5 * * * * (Every 5 minutes)' : '0 0/5 * * * ? * (Every 5 minutes)'}
        </div>
      </div>

      {/* Cron Generator Component - Main Focus */}
      <section className="cron-section">
        <h2>Build Your Cron Expression</h2>
        <div className="cron-container">
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
      </section>

      {/* Info Sections */}
      <section className="info-section">
        <h2>What is a Cron Expression?</h2>
        <p>
          A cron expression is a string that represents a schedule for executing tasks
          automatically. It's widely used in Unix-based systems, job schedulers, and automation
          tools to define when tasks should run - whether it's every minute, hourly, daily, weekly,
          or on custom schedules.
        </p>
      </section>

      <section className="info-section">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Visual Interface:</strong> No need to memorize cron syntax
          </li>
          <li>
            <strong>Dual Format Support:</strong> Unix (5 fields) and Quartz (7 fields)
          </li>
          <li>
            <strong>Real-time Preview:</strong> Human-readable descriptions
          </li>
          <li>
            <strong>Validation:</strong> Automatic validation of expressions
          </li>
          <li>
            <strong>Free & Open Source:</strong> No registration required
          </li>
          <li>
            <strong>React Component:</strong> Available as npm package
          </li>
        </ul>
      </section>

      <section className="info-section">
        <h2>Common Use Cases</h2>
        <ul>
          <li>Schedule automated backups and database maintenance</li>
          <li>Set up periodic data synchronization tasks</li>
          <li>Configure email reports and notifications</li>
          <li>Automate system monitoring and health checks</li>
          <li>Schedule batch processing jobs</li>
          <li>Set up recurring API calls and data fetching</li>
        </ul>
      </section>

      {/* Compact Footer */}
      <footer className="app-footer">
        <p>
          <strong>React Cron Generator</strong> v{packageConf.version} |
          <a
            href="https://github.com/sojinantony01/react-cron-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{' '}
          |
          <a
            href="https://www.npmjs.com/package/react-cron-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

// Made with Bob
