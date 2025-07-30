import { expect } from "playwright/test";
import { test } from "tests/fixtures";

test.describe("WorkflowAssetsIdentification E2E", () => {
	test.beforeEach(async ({ page }) => {
		await page.getByTestId("BCNavLink-Management Center").click();
		await page.getByTestId("BCNavLink-Cyber Asset Identification").click();
		await page.getByTestId("BCNavLink-Workflow").click();
	});

	test("should display accordion with SCAN title", async ({ page }) => {
		await page.waitForSelector(".mantine-Skeleton-root", { state: "detached" });

		await expect(page.getByTestId("workflow-card-title")).toBeVisible();
		await expect(page.getByText("Last Scan Time:")).toBeVisible();
		await expect(page.getByText("Next Scheduled Scan:")).toBeVisible();
	});

	test("should show workflow phases when data is loaded", async ({ page }) => {
		await page.waitForSelector(".mantine-Skeleton-root", { state: "detached" });

		const viewAssetButton = page.getByTestId("workflow-accordion-phase").first();
		if (await viewAssetButton.isVisible()) {
			await viewAssetButton.click();
		}
	});

	test("should open and close Scan History modal", async ({ page }) => {
		await page.waitForSelector(".mantine-Skeleton-root", { state: "detached" });

		const scanHistoryButton = page.getByTestId("workflow-button-scan-history");
		await scanHistoryButton.click();

		await page.waitForSelector(".mantine-Skeleton-root", { state: "detached" });

		const modalTitle = page.getByTestId("BCDrawer-title");
		await expect(modalTitle).toContainText("Scan History");

		const closeButton = page.getByTestId("BCDrawer-close");
		await closeButton.click();

		await expect(modalTitle).not.toBeVisible();
	});

	test("should open and close Step Scan History modal", async ({ page }) => {
		await page.waitForSelector(".mantine-Skeleton-root", { state: "detached" });

		const viewAssetButton = page.getByTestId("workflow-accordion-phase").first();

		if (await viewAssetButton.isVisible()) {
			await viewAssetButton.click();

			const viewStepMenu = page.getByTestId("workflow-menu-icon").first();
			await viewStepMenu.click();
			await page.getByRole("menuitem", { name: "View Matched Assets" }).click();

			await page.waitForSelector(".mantine-Skeleton-root", { state: "detached" });

			const modalTitle = page.getByTestId("BCDrawer-title");
			await expect(modalTitle).toContainText("Detected Assets");

			const closeButton = page.getByTestId("BCDrawer-close");
			await closeButton.click();
		}
	});
});
