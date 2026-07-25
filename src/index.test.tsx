import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('src/index.tsx — ReactDOM bootstrap', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // index.tsx calls document.getElementById('root') at module level.
    // Provide that element before the module is imported.
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.resetModules(); // ensure a clean module registry for subsequent tests
  });

  it('mounts the App into #root without throwing', async () => {
    // Dynamically import so the module-level side-effect runs AFTER #root exists.
    // Wrap in act() so React flushes the initial render before we assert.
    await act(async () => {
      await import('./index');
    });

    // The App renders an <h1> with this text — confirms render completed.
    expect(container.querySelector('h1')).toHaveTextContent('Cron Expression Generator');
  });
});
