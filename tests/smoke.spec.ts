import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", h1: "Abogada de familia en CABA y GBA" },
  { path: "/derecho-de-familia/", h1: /Derecho de familia/ },
  { path: "/contacto/", h1: "Contanos tu caso" },
  { path: "/aviso-legal/", h1: "Aviso legal" },
];

for (const { path, h1 } of pages) {
  test(`${path} carga con un solo H1 y canonical propio`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(h1);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe(`${page.url().split("/").slice(0, 3).join("/")}${path}`);

    expect(errors).toEqual([]);
  });
}

test("la home no lista las áreas como tarjetas", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#areas")).toHaveCount(0);
  await expect(page.locator("#cobertura")).toHaveCount(0);
});

test("no hay enlaces internos rotos desde la home", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page
    .locator('a[href^="/"]')
    .evaluateAll((els) => [...new Set(els.map((el) => el.getAttribute("href") as string))]);

  for (const href of hrefs) {
    const [pathname] = href.split("#");
    const res = await request.get(pathname || "/");
    expect(res.status(), `enlace roto: ${href}`).toBe(200);
  }
});

test("sitemap y robots están publicados", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<loc>http://localhost:4173/contacto/</loc>");

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");
});

test("skip link lleva al contenido con el teclado", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contenido$/);
});
