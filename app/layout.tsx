import type { Metadata } from "next";
import { Lato, Lora } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { legalServiceJsonLd, serializeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${lora.variable} ${lato.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(legalServiceJsonLd()) }}
        />
        <Header />
        <div id="contenido" className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
