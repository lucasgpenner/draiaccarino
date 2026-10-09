import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático: genera HTML/CSS/JS en /out para Cloudflare Pages.
  output: "export",
  // /derecho-de-familia/ -> derecho-de-familia/index.html
  trailingSlash: true,
  images: {
    // El export estático no tiene optimizador de imágenes de Next.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
