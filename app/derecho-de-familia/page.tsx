import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { SecurityNotice } from "@/components/SecurityNotice";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { buildMetadata, faqPageJsonLd, serializeJsonLd } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Derecho de familia en CABA y GBA",
  description:
    "Divorcios, cuota alimentaria y régimen de comunicación en CABA y Provincia de Buenos Aires. Acompañamiento humano y estrategia clara para tu caso.",
  path: "/derecho-de-familia/",
});

const faqs = [
  {
    question: "¿Cuánto tarda un divorcio?",
    answer:
      "Depende de si hay acuerdo y del juzgado. En la consulta te damos una estimación realista.",
  },
  {
    question: "¿Puedo pedir alimentos si no tengo trabajo?",
    answer:
      "Sí. La cuota se fija según las posibilidades de cada progenitor y las necesidades de los hijos. Lo analizamos en tu caso.",
  },
  {
    question: "Si nos ponemos de acuerdo, ¿hace falta abogado?",
    answer:
      "Igual conviene asesorarse. Un acuerdo mal redactado puede traer problemas después.",
  },
];

export default function DerechoDeFamiliaPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section aria-labelledby="familia-titulo" className="bg-ivory-50">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <nav aria-label="Migas de pan" className="text-sm text-navy-900/80">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link className="underline underline-offset-4" href="/">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-bold">
                Derecho de familia
              </li>
            </ol>
          </nav>
          <h1 id="familia-titulo" className="mt-6 text-4xl leading-tight md:text-5xl">
            Derecho de familia: te acompañamos en el momento más difícil
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-900/90">
            Divorcios, cuota alimentaria y régimen de comunicación, con cercanía y una estrategia clara para
            tu caso.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contacto/">Contanos tu caso</ButtonLink>
            <ButtonLink href={whatsappUrl("Hola, quisiera consultar por derecho de familia.")} variant="secondary" external>
              Consultá por WhatsApp
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Divorcio */}
      <Section id="divorcio" title="Divorcio: menos trámite del que imaginás">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-navy-900/90">
          <p>
            Con el Código Civil y Comercial, el divorcio no exige probar culpas ni expresar causas. Puede
            pedirlo uno solo de los cónyuges o los dos de común acuerdo.
          </p>
          <p>
            Lo que sí conviene resolver bien es lo que viene después: bienes, vivienda y los hijos.
          </p>
        </div>
      </Section>

      {/* Cuota */}
      <Section id="alimentos" title="Cuota alimentaria: que los chicos tengan lo que necesitan" tone="ivory">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-navy-900/90">
          <p>
            Los progenitores deben contribuir a la manutención de sus hijos. Te ayudamos a reclamar o defender
            una cuota justa, y a pedir medidas urgentes si no hay tiempo que perder.
          </p>
        </div>
      </Section>

      {/* Régimen */}
      <Section id="regimen-de-comunicacion" title="Régimen de comunicación: que los hijos sigan vinculados con ambos">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-navy-900/90">
          <p>
            Armamos un acuerdo o pedimos judicialmente un régimen con horarios y reglas claras, pensado en el
            bienestar de los chicos.
          </p>
        </div>
      </Section>

      {/* Seguridad */}
      <section aria-label="Línea de ayuda" className="bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 pb-4">
          <SecurityNotice />
        </div>
      </section>

      {/* FAQ */}
      <Section id="preguntas" title="Preguntas frecuentes">
        <FAQ items={faqs} />
      </Section>

      {/* CTA final */}
      <section aria-labelledby="familia-cta" className="bg-navy-900 text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="familia-cta" className="text-3xl text-white md:text-4xl">
              Hablemos de tu caso
            </h2>
            <p className="mt-3 text-lg text-white/90">Escribinos y charlamos tu caso con calma.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappUrl("Hola, quisiera consultar por derecho de familia.")} external>
              Escribinos por WhatsApp
            </ButtonLink>
            <ButtonLink href="/contacto/" variant="onDark">
              Contanos tu caso
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
