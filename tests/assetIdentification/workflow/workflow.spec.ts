import { expect } from "playwright/test";
import { test } from "tests/fixtures";

test.describe("WorkflowAssetsIdentification E2E", () => {
	test.beforeEach(async ({ page }) => {
		await page.getByTestId("BCNavLink-Management Center").click();
		await page.getByTestId("BCNavLink-Cyber Asset Identification").click();
		await page.getByTestId("BCNavLink-Workflow").click();
	});

	test("should display accordion with SCAN title", async ({ page }) => {
		await expect(page.getByTestId("workflow-title")).toBeVisible();
		await expect(page.getByTestId("workflow-title-next-scan")).toBeVisible();
		await expect(page.getByTestId("workflow-title-last-scan")).toBeVisible();
	});

	test("should show workflow phases when data is loaded", async ({ page }) => {
		const viewAssetButton = page.getByTestId("workflow-accordion-phase").first();
		if (await viewAssetButton.isVisible()) {
			await viewAssetButton.click();
		}
	});

	test("should open and close Scan History modal", async ({ page }) => {
		const scanHistoryButton = page.getByTestId("workflow-button-scan-history");
		await scanHistoryButton.click();

		const modalTitle = page.getByTestId("BCDrawer-title");
		await expect(modalTitle).toBeVisible();

		const closeButton = page.getByTestId("BCDrawer-close");
		await closeButton.click();

		await expect(modalTitle).not.toBeVisible();
	});

	test("should open and close Run Workflow modal", async ({ page }) => {
		const scanHistoryButton = page.getByTestId("workflow-button-run-manually");
		await scanHistoryButton.click();

		const modalTitle = page.getByTestId("BCModal-title");
		await expect(modalTitle).toBeVisible();

		const closeButton = page.getByTestId("BCModal-close");
		await closeButton.click();

		await expect(modalTitle).not.toBeVisible();
	});

	test("should open and close Step Scan History modal", async ({ page }) => {
		const viewAssetButton = page.getByTestId("workflow-accordion-phase").first();

		if (await viewAssetButton.isVisible()) {
			await viewAssetButton.click();

			const viewStepMenu = page.getByTestId("workflow-menu-icon").first();
			await viewStepMenu.click();
			await page.getByTestId("workflow-submenu-view").click();

			const modalTitle = page.getByTestId("BCDrawer-title");
			await expect(modalTitle).toBeVisible();

			const closeButton = page.getByTestId("BCDrawer-close");
			await closeButton.click();
		}
	});
});
