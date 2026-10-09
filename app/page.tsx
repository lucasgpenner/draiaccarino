import { AreaCard } from "@/components/AreaCard";
import { CoverageMap } from "@/components/CoverageMap";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { practiceAreas } from "@/lib/areas";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

export const metadata = buildMetadata({
  // En el segmento raíz el "template" del layout no aplica: se escribe completo.
  title: `Abogada de familia en CABA y GBA · ${siteConfig.shortName}`,
  description:
    "Divorcios, cuota alimentaria y régimen de comunicación en CABA y Provincia de Buenos Aires. Asesoramiento claro y cercano. Consultá por WhatsApp.",
  path: "/",
});

const steps: { title: string; text?: string }[] = [
  {
    title: "Contanos tu caso.",
    text: "Por WhatsApp o con el formulario.",
  },
  {
    title: "Te explicamos tus opciones.",
    text: "En lenguaje claro, con los caminos posibles para tu caso.",
  },
  {
    title: "Te acompañamos hasta el final.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section aria-labelledby="hero-titulo" className="bg-ivory-50">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-16 md:py-24">
          <p className="inline-flex w-fit items-center rounded-full border border-gold-500 bg-white px-4 py-1 text-sm font-bold text-navy-900">
            +15 años de trayectoria · CABA y GBA
          </p>
          <div>
            <h1 id="hero-titulo" className="text-4xl leading-tight md:text-6xl">
              Asesorate antes de decidir.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-900/90 md:text-xl">
              Divorcios, cuota alimentaria y régimen de comunicación. Te explicamos cada paso en lenguaje
              simple, para que decidas con información y tranquilidad.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href={whatsappUrl("Hola, quisiera asesorarme sobre mi caso.")} external>
              Escribinos por WhatsApp
            </ButtonLink>
            <ButtonLink href="/contacto/" variant="secondary">
              Contanos tu caso
            </ButtonLink>
          </div>
          <p className="text-sm text-navy-900/75">Tu consulta es confidencial.</p>
        </div>
      </section>

      {/* Cobertura */}
      <Section
        id="cobertura"
        title="Trabajamos en CABA y en la Provincia de Buenos Aires"
        intro="Atendemos casos en la Ciudad y en el Gran Buenos Aires. Según el fuero y el domicilio, el caso se tramita en la justicia nacional, local o provincial. Lo definimos juntos desde la primera consulta."
      >
        <CoverageMap />
      </Section>

      {/* Áreas */}
      <Section id="areas" title="En qué te podemos acompañar" tone="ivory">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area) => (
            <li key={area.slug}>
              <AreaCard area={area} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Nosotros */}
      <Section id="nosotros" title="Una abogada que te explica las cosas como son">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-start">
          <div className="rounded-lg border-t-4 border-gold-500 bg-ivory-50 p-6">
            <p className="font-serif text-2xl text-navy-900">{siteConfig.lawyer.name}</p>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-navy-700">
              {siteConfig.lawyer.title} · Titular
            </p>
            <p className="mt-3 text-base text-navy-900/85">{siteConfig.lawyer.experience}</p>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-navy-900/90">
            <p>
              Con más de 15 años de trayectoria, la Dra. Andrea Iaccarino acompaña casos de derecho de
              familia, civil, comercial y societario. Su enfoque es simple: escuchar, explicar las opciones
              con honestidad y acompañar cada paso.
            </p>
          </div>
        </div>
      </Section>

      {/* Cómo trabajamos */}
      <Section id="como-trabajamos" title="Tres pasos para empezar" tone="ivory">
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-lg border border-navy-900/10 bg-white p-6">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 font-serif text-lg text-white"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl">{step.title}</h3>
              {step.text && <p className="mt-2 text-base text-navy-900/85">{step.text}</p>}
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-sm text-navy-900/80">
          Cada caso es distinto y no prometemos resultados. Te decimos con honestidad qué esperar.
        </p>
      </Section>

      {/* CTA final */}
      <section aria-labelledby="cta-final-titulo" className="bg-navy-900 text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="cta-final-titulo" className="text-3xl text-white md:text-4xl">
              ¿Tenés una duda o querés asesorarte?
            </h2>
            <p className="mt-3 text-lg text-white/90">Escribinos y charlamos tu caso con calma.</p>
          </div>
          <ButtonLink href={whatsappUrl("Hola, quisiera asesorarme sobre mi caso.")} external>
            Escribinos por WhatsApp
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
