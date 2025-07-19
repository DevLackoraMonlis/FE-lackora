import { defineConfig, devices } from "@playwright/test";

// import path from "path";
// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// import dotenv from "dotenv";
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// playwright.config.ts
const isCI = !!process.env.CI; // در GitLab یا هر CI دیگر
const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

console.log(isCI, "isCI");
console.log(isProd, "isProd");
console.log(port, "port");

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./tests",
	timeout: 40000,
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: isCI,
	/* Retry on CI only */
	retries: isCI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: 1,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: `http://localhost:${port}`,
		headless: false,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		actionTimeout: 10000,
		navigationTimeout: 30000,
	},
	reporter: [["line"], ["allure-playwright"], ["junit", { outputFile: "test-results/junit.xml" }]],

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: isProd ? "npm run start" : "npm run dev",
		env: {
			PORT: port.toString(),
		},
		url: `http://localhost:${port}`,
		reuseExistingServer: !isCI,
		timeout: 60 * 10 * 1000,
	},
});
