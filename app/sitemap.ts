import type { MetadataRoute } from "next";
import { practiceAreas } from "@/lib/areas";
import { siteConfig } from "@/lib/site-config";

// Export estático: el sitemap se genera en build.
export const dynamic = "force-static";

// Fecha fija de la última revisión de contenido. No usar new Date(): cambia en cada build
// y Google deja de confiar en lastmod.
const CONTENT_UPDATED = new Date("2026-10-13");

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/contacto/", priority: 0.8 },
  // Áreas: solo las que tienen página propia (href definido en lib/areas.ts).
  ...practiceAreas
    .filter((area) => area.href)
    .map((area) => ({ path: area.href as string, priority: area.featured ? 0.9 : 0.8 })),
  { path: "/politica-de-privacidad/", priority: 0.3 },
  { path: "/terminos-y-condiciones/", priority: 0.3 },
  { path: "/aviso-legal/", priority: 0.3 },
  { path: "/politica-de-cookies/", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: CONTENT_UPDATED,
    priority,
  }));
}
