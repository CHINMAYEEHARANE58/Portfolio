import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("tiny pixel cat stays visible and follows the pointer", async ({ page }) => {
  await page.goto("/");
  const cat = page.getByTestId("cursor-cat");
  await expect(cat).toBeVisible();
  await expect(cat).toHaveCSS("pointer-events", "none");

  if (test.info().project.name === "desktop") {
    await page.mouse.move(180, 180);
    await expect.poll(async () => (await cat.boundingBox())?.x ?? -1).toBeLessThan(180);
    await page.mouse.move(1100, 220);
    await expect.poll(async () => (await cat.boundingBox())?.x ?? -1, { timeout: 3000 }).toBeGreaterThan(900);
    await expect(cat).toHaveAttribute("data-direction", "right");
  }

  await page.goto("/projects");
  await expect(cat).toBeVisible();
});
test("homepage, navigation, case studies, and resume", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Hi, I'm Chinmayee/ })).toBeVisible();
  await expect(page.getByText(/2026\./).first()).toBeVisible();
  await page.getByRole("navigation", { name: "Quick navigation" }).getByRole("link", { name: "Jump to projects" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await page.getByRole("link", { name: "all case studies" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.getByRole("link", { name: /Read SplitStream case study/ }).click();
  await expect(page.getByRole("heading", { name: /SplitStream/ })).toBeVisible();
  const pdf = await request.get("/resume/Chinmayee_Harane_Resume.pdf");
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
});
test("project filters and shareable search", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Smart Library Manager" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "SplitStream" })).toHaveCount(0);
  await expect(page).toHaveURL(/category=Mobile/);
  await page.getByRole("searchbox", { name: /Search projects/ }).fill("not-a-project");
  await expect(page.getByRole("heading", { name: "No projects found" })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("heading", { name: "SplitStream" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Mitworking", exact: true })).toBeVisible();
});
test("theme persists, contact states, and 404", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.goto("/contact");
  await page.getByRole("button", { name: /Send message/ }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await page.getByLabel("Your name").fill("A Person");
  await page.getByLabel("Email address").fill("person@example.com");
  await page.getByLabel("Subject").fill("Hello");
  await page.getByLabel("Message").fill("This is a valid test message.");
  await page.route("**/api/contact", route => route.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ error: "Service unavailable" }) }));
  await page.getByRole("button", { name: /Send message/ }).click();
  await expect(page.getByText("Service unavailable")).toBeVisible();
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", route => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }));
  await page.getByRole("button", { name: /Send message/ }).click();
  await expect(page.getByRole("heading", { name: "Message sent." })).toBeVisible();
  await page.goto("/missing-page");
  await expect(page.getByRole("heading", { name: /detour/ })).toBeVisible();
});
test("automated accessibility on main routes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/about", "/experience", "/projects", "/contact", "/projects/splitstream"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations, `${route}: ${JSON.stringify(results.violations.map(v => ({ id: v.id, nodes: v.nodes.length })))}`).toEqual([]);
  }
});
test("light theme passes accessibility checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  for (const route of ["/", "/projects", "/contact"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations, `${route} in light theme`).toEqual([]);
  }
});
test("responsive layouts stay within the viewport", async ({ page }) => {
  for (const width of [320, 375, 428, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    for (const route of ["/", "/projects", "/contact"]) {
      await page.goto(route);
      const { overflow, offenders } = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        offenders: [...document.querySelectorAll<HTMLElement>("body *")]
          .filter(element => element.getBoundingClientRect().right > window.innerWidth + 1)
          .slice(0, 5).map(element => `${element.tagName.toLowerCase()}.${element.className || ""}`),
      }));
      expect(overflow, `${route} overflows at ${width}px; elements: ${offenders.join(", ")}`).toBeLessThanOrEqual(1);
    }
  }
});
test("mobile menu traps focus and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/projects");
  await page.getByRole("button", { name: "Open menu" }).click();
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link", { name: "Home" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(nav.getByRole("link", { name: /Download resume/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(nav).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});
