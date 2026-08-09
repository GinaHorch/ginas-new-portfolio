import { type Locator, type Page, expect } from "@playwright/test";

/**
 * The Acknowledgement of Country modal shows once per browsing session, gated on
 * sessionStorage. Every Playwright test gets a fresh context, so it appears on the
 * first navigation of every test.
 */
export async function acknowledgeCountry(page: Page) {
  const acknowledge = page.getByRole("button", { name: "Acknowledge" });
  await expect(acknowledge).toBeVisible();
  await acknowledge.click();
  await expect(acknowledge).toBeHidden();
}

/**
 * Marks Country as already acknowledged before the page runs any script.
 *
 * The modal is opened from a `useEffect`, so polling for it after navigation is a
 * race: sometimes the check runs first and the modal appears immediately after.
 * Seeding sessionStorage removes the modal from the run entirely, which is what
 * screenshots of everything-except-the-modal need.
 */
export async function skipAcknowledgement(page: Page) {
  await page.addInitScript(() => {
    window.sessionStorage.setItem("hasAcknowledged", "true");
  });
}

/**
 * The header renders each nav item twice — a labelled variant for wide screens and
 * an icon-only variant for narrow ones — and hides one with CSS. Both are in the
 * DOM and both expose the same accessible name, so resolve to whichever is showing.
 */
export function navLink(page: Page, name: string): Locator {
  return page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name, exact: true })
    .filter({ visible: true });
}

/** Every route reachable from the primary navigation. */
export const NAV_DESTINATIONS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/work" },
  { name: "Skills", path: "/skills" },
] as const;

/**
 * Removes the things that make a screenshot differ between two identical runs:
 * motion, the live clock in the header, and images that have not finished loading.
 */
export async function stabiliseForScreenshot(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });

  // Pull the whole page past the viewport so lazily-loaded images start fetching,
  // then return to the top before capturing.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });

  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0),
  );
  await page.waitForLoadState("networkidle");
}

/**
 * The header clock ticks every second, so it can never match a stored snapshot.
 *
 * Mask only the clock, not the whole header: masking the header blanked out part of
 * the hero on full-page captures and meant changes to the mobile navigation bar were
 * never compared at all. The clock is hidden below 768px, so on mobile this matches
 * nothing and the whole header is covered by the baseline.
 */
export function screenshotMasks(page: Page): Locator[] {
  return [page.getByTestId("header-clock")];
}
