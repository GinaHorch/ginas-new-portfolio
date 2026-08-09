import { expect, test } from "@playwright/test";
import { screenshotMasks, skipAcknowledgement, stabiliseForScreenshot } from "./helpers";

/**
 * Baselines are stored per project and platform, so `desktop` and `mobile` each keep
 * their own set. Regenerate deliberately with `npm run test:e2e:update` after an
 * intended visual change, and read the diff in the HTML report before accepting it.
 */
const PAGES = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "work", path: "/work" },
  { name: "skills", path: "/skills" },
  { name: "case-study", path: "/work/andromedae" },
] as const;

test.describe("visual regression", () => {
  for (const { name, path } of PAGES) {
    test(`${name} matches its baseline`, async ({ page }) => {
      await skipAcknowledgement(page);
      await page.goto(path);
      await stabiliseForScreenshot(page);

      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        mask: screenshotMasks(page),
      });
    });
  }

  test("the acknowledgement modal matches its baseline", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Acknowledgement of Country" })).toBeVisible();
    await stabiliseForScreenshot(page);

    await expect(page).toHaveScreenshot("acknowledgement-modal.png", {
      mask: screenshotMasks(page),
    });
  });

  test("the skills chart matches its baseline", async ({ page }) => {
    await skipAcknowledgement(page);
    await page.goto("/skills");
    await stabiliseForScreenshot(page);

    // Scoped to the chart so a copy change elsewhere on the page does not fail it.
    // This is the component whose labels clip when the container gets narrow.
    const chart = page.locator("canvas").locator("xpath=..");
    await expect(chart).toHaveScreenshot("skills-chart.png");
  });
});
