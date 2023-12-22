import { test, expect } from "@playwright/test";
import { mockGptResponse } from "@/server/utils/MockApi";

const url = "http://localhost:3000";

test("has title", async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Bingus/);
});

test("get started link", async ({ page }) => {
  await page.goto(url);

  await page.getByRole("button", { name: "Send" }).click();

  await expect(page.getByText(mockGptResponse)).toBeVisible();
});
