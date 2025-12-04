const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 120000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    storageState: 'auth.json' // Use saved login session
  },
  testDir: './tests/playwright-specs'
});
