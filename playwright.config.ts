import { defineConfig, PlaywrightTestConfig } from '@playwright/test';

interface CustomTestOptions {
  username: string;
  password: string;
}

const config: PlaywrightTestConfig<CustomTestOptions> = {
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    username: 'Admin',
    password: 'admin123'
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } }
  ],
  reporter: [['html', { outputFolder: 'playwright-report' }]]
};

export default defineConfig(config);