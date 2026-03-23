import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'reports/junit.vitest.xml',
    },
  },
});
