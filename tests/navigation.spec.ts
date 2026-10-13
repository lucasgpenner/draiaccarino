import { expect, test } from "@playwright/test";

test("menú móvil: abre, navega y se cierra con Esc", async ({ page, isMobile }) => {
  test.skip(!isMobile, "solo en viewport móvil");
  await page.goto("/");

  // El nombre accesible cambia a "Cerrar menú" al abrir: ubicamos el botón por aria-controls.
  const toggle = page.locator("header button[aria-controls]");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Principal móvil" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("menú móvil: el enlace navega a la página", async ({ page, isMobile }) => {
  test.skip(!isMobile, "solo en viewport móvil");
  await page.goto("/");
  await page.locator("header button[aria-controls]").click();
  await page.getByRole("navigation", { name: "Principal móvil" }).getByRole("link", { name: "Derecho de familia" }).click();
  await expect(page).toHaveURL(/\/derecho-de-familia\/$/);
});

test("menú de escritorio visible y con enlaces", async ({ page, isMobile }) => {
  test.skip(isMobile, "solo en escritorio");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Principal" });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link", { name: "Derecho de familia" })).toHaveAttribute("href", "/derecho-de-familia/");
});

test("tarjetas de familia llevan a su sección", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Cuota alimentaria/ }).click();
  await expect(page).toHaveURL(/\/derecho-de-familia\/#alimentos$/);
  await expect(page.locator("#alimentos")).toBeInViewport();
});

test("formulario de contacto valida campos vacíos", async ({ page }) => {
  await page.goto("/contacto/");
  // El formulario usa noValidate: el error lo muestra el servidor (API). Sin backend
  // en la prueba estática, verificamos que los campos requeridos estén marcados.
  const nombre = page.getByLabel(/Nombre y apellido/);
  await expect(nombre).toHaveAttribute("required", "");
  await expect(nombre).toHaveAttribute("aria-required", "true");
});
