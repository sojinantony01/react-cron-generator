import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/setupTests.ts',
        'src/**/*.d.ts',
        'src/reportWebVitals.ts',
        'src/lib/types/index.ts',  // type-only file — no runtime statements to cover
        'src/lib/index.ts',        // barrel re-exports only — no executable statements for V8
      ],
      reportsDirectory: './coverage',
    },
  },
});
