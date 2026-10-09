import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Export estático: el sitemap se genera en build.
export const dynamic = "force-static";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/derecho-de-familia/", priority: 0.9 },
  { path: "/contacto/", priority: 0.7 },
  { path: "/politica-de-privacidad/", priority: 0.3 },
  { path: "/terminos-y-condiciones/", priority: 0.3 },
  { path: "/aviso-legal/", priority: 0.3 },
  { path: "/politica-de-cookies/", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    priority,
  }));
}
