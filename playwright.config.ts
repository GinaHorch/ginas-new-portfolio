import { defineConfig, devices } from "@playwright/test";

/**
 * Tests run against a production build, not `next dev`.
 *
 * The dev server injects a dev-tools indicator and serves images differently, both
 * of which show up in visual snapshots. It also runs on port 3000, which is usually
 * already taken by a dev server during local work — so this uses its own port and
 * leaves that alone.
 *
 * See https://playwright.dev/docs/test-configuration.
 */
const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["html"], ["github"]] : "html",

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  expect: {
    toHaveScreenshot: {
      // An absolute budget, not a ratio. A ratio scales with page height, so on a
      // long page a real layout shift can stay under the threshold — a 16px padding
      // change on the skills chart did exactly that at 1%.
      maxDiffPixels: 150,
      animations: "disabled",
      caret: "hide",
    },
  },

  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
    },
  ],

  webServer: {
    command: `npm run build && npx next start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "pipe",
  },
});
