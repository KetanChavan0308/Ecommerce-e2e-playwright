import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // 📁 Test directory
  testDir: "./tests",

  // ⏱ Timeout
  timeout: 120000,

  // ⚡ Parallel execution
  fullyParallel: true,

  // 🚫 Prevent test.only in CI
  forbidOnly: !!process.env.CI,

  // 🔁 Retry logic
  retries: process.env.CI ? 2 : 1,

  // 👷 Workers
  workers: process.env.CI ? 1 : undefined,

  // 📊 REPORTERS
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/html", open: "never" }],
    ["junit", { outputFile: "reports/results.xml" }],
    ["allure-playwright", { outputFolder: "reports/allure-results" }],
  ],

  // 📁 Playwright artifacts
  outputDir: "reports/test-results",

  // 🎯 Global settings
  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",

    // 🖥 Default viewport (standard)
    viewport: { width: 1440, height: 900 },

    // =====================================================
    // 🍎 MacBook 13-inch viewport (uncomment when needed)
    // =====================================================
    //viewport: { width: 1280, height: 800 },

    launchOptions: {
      slowMo: process.env.CI ? 0 : 300, // Slow down actions by 300 ms for better visibility during test execution (disable in CI for faster runs)
    },

    //headless: process.env.CI ? true : false,
    headless: true, // Always run in headed mode for better visibility during test execution

    // =====================================================
    // 🔥 OPTIONAL SETTINGS (uncomment when needed)
    // =====================================================

    ignoreHTTPSErrors: true,

    permissions: ["geolocation"],
    geolocation: { latitude: 19.076, longitude: 72.8777 },

    // timezoneId: "Asia/Kolkata",
    // locale: "en-IN",

    // acceptDownloads: true,
  },

  // 🌍 Browser projects
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // 🦊 Firefox (enable if needed)
    // {
    //   name: "Firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // 🍎 WebKit (Safari)
    // {
    //   name: "WebKit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    // 🌐 Google Chrome (real browser)
    // {
    //   name: "Chrome",
    //   use: { ...devices["Desktop Chrome"], channel: "chrome" },
    // },
    // 🌐 Microsoft Edge
    // {
    //   name: "Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
  ],
});
