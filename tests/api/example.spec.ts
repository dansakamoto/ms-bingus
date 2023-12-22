import { test, expect } from "@playwright/test";

const url = "http://localhost:3000";

test("has title", async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Bingus/);
});

/*
test("get started link", async ({ page }) => {
  await page.goto(url);

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
*/
