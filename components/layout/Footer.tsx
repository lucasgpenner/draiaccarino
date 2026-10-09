import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const legalLinks = [
  { label: "Política de privacidad", href: "/politica-de-privacidad/" },
  { label: "Términos y condiciones", href: "/terminos-y-condiciones/" },
  { label: "Aviso legal", href: "/aviso-legal/" },
  { label: "Política de cookies", href: "/politica-de-cookies/" },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-semibold">{siteConfig.name}</p>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-gold-500">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {siteConfig.lawyer.name}, {siteConfig.lawyer.title.toLowerCase()}. {siteConfig.lawyer.experience}.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-500">Contacto</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="underline underline-offset-4 hover:text-gold-500" href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}>
                WhatsApp {siteConfig.contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a className="underline underline-offset-4 hover:text-gold-500" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm text-white/85">Cobertura: {siteConfig.coverage.summary}.</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-500">Legal</p>
          <ul className="mt-4 space-y-2 text-sm">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link className="underline underline-offset-4 hover:text-gold-500" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto w-full max-w-5xl px-6 py-6 text-xs leading-relaxed text-white/75">
          © {new Date().getFullYear()} {siteConfig.name}. Información general. No constituye asesoramiento
          legal ni reemplaza la consulta profesional personalizada. Cada caso es distinto y no prometemos
          resultados.
        </p>
      </div>
    </footer>
  );
}
