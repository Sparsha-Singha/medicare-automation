import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  use: {
    headless: false,
    viewport: { width: 1400, height: 800 },
    actionTimeout: 30000,
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    baseURL: 'http://115.127.218.89:8787/medicare-web-client-v2/#',
  },
  reporter: [['html'], ['list']],
});
