import { AppRoutes } from "@/shared/constants/routes";
// tests/fixtures.ts
import { test as baseTest } from "@playwright/test";

export const test = baseTest.extend({
	page: async ({ page }, use) => {
		await page.goto(AppRoutes.login);
		await page.getByTestId("login-username").click();
		await page.getByTestId("login-username").fill("adminnolimit");
		await page.getByTestId("login-username").press("Tab");
		await page.getByTestId("login-password").fill("Admin@Watcher1!");
		await page.getByTestId("login-submit-button").click();

		// await page.waitForURL(AppRoutes.panel, { timeout: 100000 });

		await use(page);
	},
});
