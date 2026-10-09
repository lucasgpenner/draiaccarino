import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Contacto",
  description:
    "Contanos tu caso por formulario o WhatsApp. Atendemos en CABA y Provincia de Buenos Aires.",
  path: "/contacto/",
});

export default function ContactoPage() {
  return (
    <main className="bg-white">
      <section aria-labelledby="contacto-titulo" className="bg-ivory-50">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
          <h1 id="contacto-titulo" className="text-4xl leading-tight md:text-5xl">
            Contanos tu caso
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-900/90">
            Escribinos con lo que quieras contarnos. Te respondemos con calma y te explicamos los caminos
            posibles para tu caso.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-16 lg:grid-cols-[1fr_2fr]">
        <aside aria-label="Otras vías de contacto" className="space-y-6 text-base leading-relaxed">
          <div>
            <h2 className="text-xl">WhatsApp</h2>
            <p className="mt-2">
              <a
                className="font-bold underline underline-offset-4"
                href={whatsappUrl("Hola, quisiera asesorarme sobre mi caso.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.contact.whatsappDisplay}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-xl">Email</h2>
            <p className="mt-2">
              <a className="font-bold underline underline-offset-4 break-all" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-xl">Cobertura</h2>
            <p className="mt-2">{siteConfig.coverage.summary}. No atendemos en una oficina física: trabajamos por canales digitales y reuniones coordinadas.</p>
          </div>
          <p className="text-sm text-navy-900/80">
            Al enviar el formulario aceptás nuestra{" "}
            <Link href="/politica-de-privacidad/" className="font-bold underline underline-offset-4">
              Política de privacidad
            </Link>
            .
          </p>
        </aside>

        <ContactForm />
      </div>
    </main>
  );
}
