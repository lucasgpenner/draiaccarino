/**
 * Fuente única de datos del estudio.
 * Cualquier cambio de teléfono, email, áreas o cobertura se hace acá.
 */

import { PRIVACY_VERSION } from "./consent";

const siteUrlFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();

// En build de producción la URL es obligatoria: sin ella canonicals, OG,
// sitemap y JSON-LD quedarían apuntando a localhost.
if (process.env.NODE_ENV === "production" && !siteUrlFromEnv) {
  throw new Error(
    "Falta NEXT_PUBLIC_SITE_URL. Definila en el entorno de build (ej.: https://tu-dominio.com).",
  );
}

export const siteConfig = {
  name: "Dra. Iaccarino & Asociados",
  shortName: "Iaccarino & Asociados",
  tagline: "Asesorate",
  description:
    "Derecho de familia, tránsito, ART, laboral, empresarial y más. Atendemos en CABA y Provincia de Buenos Aires.",
  // Sin dominio propio todavía. Se define en las variables de build de Pages.
  url: siteUrlFromEnv && siteUrlFromEnv.length > 0 ? siteUrlFromEnv : "http://localhost:3000",
  locale: "es-AR",
  lawyer: {
    name: "Andrea Iaccarino",
    title: "Abogada",
    experience: "Más de 15 años de trayectoria",
  },
  contact: {
    // Formato internacional para wa.me (sin + ni espacios).
    whatsappNumber: "5491135107220",
    whatsappDisplay: "+54 9 11 3510-7220",
    // Mantener Gmail hasta contar con dominio institucional.
    email: "andrealaura.iaccarino@gmail.com",
  },
  coverage: {
    summary: "CABA y Provincia de Buenos Aires",
    // Sin direcciones físicas: se informa cobertura, no sedes.
    caba: {
      label: "Ciudad Autónoma de Buenos Aires",
      short: "CABA",
    },
    gba: {
      label: "Gran Buenos Aires",
      short: "GBA",
      // Partidos agrupados por zona. Confirmar la lista final con la Dra.
      zones: [
        {
          name: "Zona Norte",
          partidos: [
            "San Isidro",
            "Vicente López",
            "San Fernando",
            "Tigre",
            "San Martín",
            "Tres de Febrero",
            "Malvinas Argentinas",
            "José C. Paz",
            "San Miguel",
            "Escobar",
            "Pilar",
          ],
        },
        {
          name: "Zona Oeste",
          partidos: [
            "Morón",
            "Hurlingham",
            "Ituzaingó",
            "Merlo",
            "Moreno",
            "General Rodríguez",
            "Marcos Paz",
            "La Matanza",
          ],
        },
        {
          name: "Zona Sur",
          partidos: [
            "Lomas de Zamora",
            "Lanús",
            "Avellaneda",
            "Quilmes",
            "Berazategui",
            "Florencio Varela",
            "Almirante Brown",
            "Esteban Echeverría",
            "Ezeiza",
            "Cañuelas",
          ],
        },
      ],
    },
  },
  social: {
    // Completar cuando existan perfiles activos.
    instagram: null as string | null,
    linkedin: null as string | null,
  },
  legal: {
    privacyVersion: PRIVACY_VERSION,
    retentionMonths: 12,
    supervisoryAuthority: "Agencia de Acceso a la Información Pública (AAIP)",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const whatsappUrl = (message?: string) => {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
