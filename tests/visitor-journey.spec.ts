import { expect, test } from "@playwright/test";
import { acknowledgeCountry, navLink } from "./helpers";

/**
 * One continuous journey, in the order a real visitor takes it: land on the site,
 * deal with the Acknowledgement of Country, read the hero, then discover About,
 * Projects (including a case study) and Skills through the navigation.
 *
 * Assertions are about what the visitor can actually see and do, so this fails on a
 * broken journey rather than on a reworded sentence.
 */
test.describe("visitor journey", () => {
  test("lands, acknowledges Country, then discovers About, Projects and Skills", async ({
    page,
  }) => {
    // --- Landing -----------------------------------------------------------
    await test.step("the Acknowledgement of Country greets a first-time visitor", async () => {
      await page.goto("/");

      await expect(
        page.getByRole("heading", { name: "Acknowledgement of Country" }),
      ).toBeVisible();
      await expect(page.getByText(/Whadjuk people of the Noongar nation/i)).toBeVisible();

      await acknowledgeCountry(page);
    });

    // --- Homepage ----------------------------------------------------------
    await test.step("the homepage states what Gina does and shows featured work", async () => {
      await expect(page).toHaveTitle(/Gina Horch/);

      // The hero has to answer "what is this person" without scrolling. The wording
      // is expected to keep evolving, so this asserts the hero exists and carries a
      // real statement rather than pinning one sentence.
      const hero = page.getByRole("heading", { level: 1 });
      await expect(hero).toHaveCount(1);
      await expect(hero).toBeVisible();
      expect((await hero.innerText()).trim().length).toBeGreaterThan(15);

      // The capability tags are a deliberate part of the hero.
      await expect(page.getByRole("listitem").filter({ hasText: /^TypeScript$/ })).toBeVisible();

      // Positioning guardrail from .claude/context/positioning.md: the site must not
      // lead with the old Scrum Master framing.
      await expect(page.locator("body")).not.toContainText("Scrum Master");

      // Featured work is the evidence behind the hero's claim.
      await expect(page.getByRole("heading", { name: "Featured work" })).toBeVisible();
      await expect(page.getByRole("link", { name: /Dive into the Details/i }).first()).toBeVisible();
    });

    // --- About -------------------------------------------------------------
    await test.step("About explains who she is", async () => {
      await navLink(page, "About").click();
      await page.waitForURL("**/about");

      await expect(page.getByRole("heading", { level: 1, name: "Gina Horch" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Studies" })).toBeVisible();
      // GitHub and LinkedIn each appear twice (profile buttons and footer icons),
      // so assert the visitor is offered at least one route to each.
      await expect(page.getByRole("link", { name: "GitHub" }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: "LinkedIn" }).first()).toBeVisible();
    });

    // --- Projects ----------------------------------------------------------
    await test.step("Projects lists the work, and a case study opens", async () => {
      await navLink(page, "Projects").click();
      await page.waitForURL("**/work");

      const caseStudyLinks = page.getByRole("link", { name: /Dive into the Details/i });
      await expect(caseStudyLinks.first()).toBeVisible();
      expect(await caseStudyLinks.count()).toBeGreaterThanOrEqual(6);

      await caseStudyLinks.first().click();
      await page.waitForURL("**/work/**");

      // A case study is a real page with a heading, a body and a way back.
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: "Projects" }).first()).toBeVisible();
    });

    // --- Skills ------------------------------------------------------------
    await test.step("Skills shows capability grouped by evidence", async () => {
      await navLink(page, "Skills").click();
      await page.waitForURL("**/skills");

      await expect(page.getByRole("heading", { name: "Skill groups" })).toBeVisible();

      // The evidence framing is the point of this page, not a decoration.
      await expect(page.getByText(/Production experience/).first()).toBeVisible();
      await expect(page.getByRole("heading", { name: "Software Development" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Cloud, Systems & Deployment" })).toBeVisible();

      // The chart is a canvas, so its text alternative is what most tools can read.
      await expect(page.locator("canvas")).toBeVisible();
    });

    // --- Back home ---------------------------------------------------------
    await test.step("the Acknowledgement does not interrupt the visitor again", async () => {
      await navLink(page, "Home").click();
      await page.waitForURL(new RegExp(`${page.url().split("/skills")[0]}/?$`));

      await expect(page.getByRole("button", { name: "Acknowledge" })).toBeHidden();
    });
  });

  test("every primary navigation link reaches a working page", async ({ page }) => {
    await page.goto("/");
    await acknowledgeCountry(page);

    for (const { name, path } of [
      { name: "About", path: "/about" },
      { name: "Projects", path: "/work" },
      { name: "Skills", path: "/skills" },
    ]) {
      await navLink(page, name).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));

      // Exactly one top-level heading per page, for screen-reader navigation and SEO.
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1, `${path} should have exactly one h1`).toHaveCount(1);
      await expect(h1).toBeVisible();
    }
  });
});
