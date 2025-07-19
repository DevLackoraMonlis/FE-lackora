import { expect } from "@playwright/test";
import { test } from "../fixtures";

test("should show logged-in username", async ({ page }) => {
	await expect(page.getByTestId("logged-username")).toContainText("monowatchadmin");
});
