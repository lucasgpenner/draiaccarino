import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type PageMetaInput = {
  title: string;
  description: string;
  /** Ruta absoluta del sitio, con barra final. Ej: "/derecho-de-familia/" */
  path: string;
};

export function buildMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Serializa JSON-LD escapando "<" para evitar inyección en el <script>.
 * Ver: node_modules/next/dist/docs/01-app/02-guides/json-ld.md
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** LegalService con cobertura por jurisdicción. Sin PostalAddress a propósito. */
export function legalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+${siteConfig.contact.whatsappNumber}`,
    email: siteConfig.contact.email,
    inLanguage: siteConfig.locale,
    areaServed: [
      { "@type": "AdministrativeArea", name: siteConfig.coverage.caba.label },
      { "@type": "AdministrativeArea", name: "Provincia de Buenos Aires" },
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.lawyer.name,
      jobTitle: siteConfig.lawyer.title,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.contact.whatsappNumber}`,
      contactType: "customer service",
      availableLanguage: "Spanish",
      areaServed: "AR",
    },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
