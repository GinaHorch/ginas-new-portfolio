import { expect, test } from "@playwright/test";
import { NAV_DESTINATIONS, acknowledgeCountry, navLink } from "./helpers";

/**
 * The header behaves differently below 768px: it moves from the top of the page to
 * a fixed bar at the bottom, and each item drops its text label for an icon. These
 * tests cover that specific responsive behaviour.
 */
test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "covers the small-screen header only");

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await acknowledgeCountry(page);
  });

  test("sits at the bottom of the screen within thumb reach", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    const headerBox = await header.boundingBox();
    const viewport = page.viewportSize();
    expect(headerBox).not.toBeNull();
    expect(viewport).not.toBeNull();

    if (!headerBox || !viewport) return;

    // Anchored to the lower half of the screen rather than the top.
    expect(headerBox.y).toBeGreaterThan(viewport.height / 2);
    // And fully on screen.
    expect(headerBox.y + headerBox.height).toBeLessThanOrEqual(viewport.height + 1);
  });

  test("stays in place while the page scrolls", async ({ page }) => {
    const header = page.locator("header");
    const before = await header.boundingBox();

    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect(page.locator("header")).toBeVisible();

    const after = await header.boundingBox();
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    if (!before || !after) return;

    expect(Math.abs(after.y - before.y)).toBeLessThan(2);
  });

  test("shows icon-only items that still expose an accessible name", async ({ page }) => {
    for (const { name } of NAV_DESTINATIONS) {
      const link = navLink(page, name);
      await expect(link).toBeVisible();

      // The visible item is the icon-only variant: no rendered text, but a name
      // that assistive technology can announce.
      await expect(link).toHaveText("");
      await expect(link).toHaveAccessibleName(name);
    }
  });

  test("navigates to every destination by tapping", async ({ page }) => {
    for (const { name, path } of NAV_DESTINATIONS.filter((d) => d.path !== "/")) {
      await navLink(page, name).tap();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("marks the current page as selected", async ({ page }) => {
    await navLink(page, "Skills").tap();
    await page.waitForURL("**/skills");

    const skills = navLink(page, "Skills");
    const about = navLink(page, "About");

    const selectedClass = await skills.getAttribute("class");
    const unselectedClass = await about.getAttribute("class");

    expect(selectedClass).toMatch(/selected/);
    expect(unselectedClass).not.toMatch(/selected/);
  });

  test.describe("layout", () => {
    for (const path of ["/", "/about", "/work", "/skills"]) {
      test(`${path} fits the viewport without sideways scrolling`, async ({ page }) => {
        await page.goto(path);

        const overflow = await page.evaluate(() => {
          const root = document.documentElement;
          return {
            scrollWidth: root.scrollWidth,
            clientWidth: root.clientWidth,
            widest: Array.from(document.querySelectorAll<HTMLElement>("body *"))
              .map((el) => ({
                tag: el.tagName,
                cls: typeof el.className === "string" ? el.className.slice(0, 60) : "",
                right: Math.round(el.getBoundingClientRect().right),
              }))
              .filter((el) => el.right > root.clientWidth + 1)
              .slice(0, 5),
          };
        });

        // A one-pixel allowance for sub-pixel rounding.
        expect(
          overflow.scrollWidth,
          `Elements overflowing the viewport: ${JSON.stringify(overflow.widest)}`,
        ).toBeLessThanOrEqual(overflow.clientWidth + 1);
      });
    }
  });

  test("the skills chart keeps its category labels readable", async ({ page }) => {
    await page.goto("/skills");

    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible();

    // Chart.js clips axis labels that do not fit, so the component wraps them onto
    // several lines instead. The text alternative is what proves the data is still
    // reachable when the canvas is not.
    const groups = ["Software Development", "AI-Assisted Engineering", "Cloud, Systems & Deployment"];
    for (const group of groups) {
      await expect(page.getByText(new RegExp(`${group}:`)).first()).toBeAttached();
    }

    const box = await canvas.boundingBox();
    const viewport = page.viewportSize();
    expect(box).not.toBeNull();
    if (!box || !viewport) return;
    expect(box.width).toBeLessThanOrEqual(viewport.width);
  });
});
