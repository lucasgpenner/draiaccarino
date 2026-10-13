import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

export const metadata = buildMetadata({
  // En el segmento raíz el template del layout no aplica: la marca va explícita.
  title: `Abogada de familia en CABA y GBA · ${siteConfig.shortName}`,
  description:
    "Divorcios, cuota alimentaria y régimen de comunicación en CABA y Provincia de Buenos Aires. Asesoramiento claro y cercano por WhatsApp.",
  path: "/",
});

const familyServices = [
  {
    title: "Divorcio",
    text: "Sin necesidad de probar culpas. Te explicamos el trámite y qué resolver antes de firmar.",
    href: "/derecho-de-familia/#divorcio",
  },
  {
    title: "Cuota alimentaria",
    text: "Reclamar o defender una cuota justa, y pedir medidas urgentes si hace falta.",
    href: "/derecho-de-familia/#alimentos",
  },
  {
    title: "Régimen de comunicación",
    text: "Horarios y reglas claras para que los hijos sigan vinculados con ambos progenitores.",
    href: "/derecho-de-familia/#regimen-de-comunicacion",
  },
];

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

const consultMessage = "Hola, quisiera asesorarme sobre mi caso.";

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
              Abogada de familia en CABA y GBA
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-900/90 md:text-xl">
              Asesorate antes de decidir. Divorcios, cuota alimentaria y régimen de comunicación, explicados en
              lenguaje simple para que decidas con información y tranquilidad.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href={whatsappUrl(consultMessage)} external>
              Escribinos por WhatsApp
            </ButtonLink>
            <ButtonLink href="/contacto/" variant="secondary">
              Contanos tu caso
            </ButtonLink>
          </div>
          <p className="text-sm text-navy-900/75">Tu consulta es confidencial.</p>
        </div>
      </section>

      {/* Familia: servicio principal */}
      <Section
        id="familia"
        title="Derecho de familia"
        intro="Es el centro de nuestra práctica. Acompañamos los casos de familia con una mirada humana y un plan claro desde la primera consulta."
      >
        <ul className="grid gap-5 md:grid-cols-3">
          {familyServices.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="flex h-full flex-col rounded-lg border border-gold-500 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="text-xl">{service.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-navy-900/85">{service.text}</p>
                <span className="mt-4 inline-block text-sm font-bold text-navy-700 underline underline-offset-4">
                  Ver cómo lo trabajamos
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href="/derecho-de-familia/" variant="secondary">
            Ver derecho de familia en detalle
          </ButtonLink>
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

      {/* Cobertura compacta */}
      <section aria-labelledby="cobertura-titulo" className="border-y border-navy-900/10 bg-ivory-50">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="cobertura-titulo" className="text-2xl">
              Atendemos en CABA y Provincia de Buenos Aires
            </h2>
            <p className="mt-2 max-w-2xl text-base text-navy-900/85">
              Según el fuero y el domicilio, el caso se tramita en la justicia nacional, local o provincial. Lo
              definimos juntos desde la primera consulta.
            </p>
          </div>
          <Link
            href="/contacto/#cobertura"
            className="shrink-0 text-base font-bold text-navy-900 underline underline-offset-4"
          >
            Ver cobertura por zona
          </Link>
        </div>
      </section>

      {/* Otras materias: sin tarjetas, solo referencia */}
      <section id="otras-materias" aria-labelledby="otras-titulo" className="bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <h2 id="otras-titulo" className="text-2xl">
            También asesoramos en otras materias
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-navy-900/85">
            Civil, tránsito, ART, laboral, empresarial y societario, consumidor, ejecuciones y sucesiones. Si tu
            caso no está en esta lista, consultanos igual.
          </p>
          <p className="mt-4">
            <Link
              href="/contacto/"
              className="font-bold text-navy-900 underline underline-offset-4"
            >
              Contanos tu caso
            </Link>
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section aria-labelledby="cta-final-titulo" className="bg-navy-900 text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="cta-final-titulo" className="text-3xl text-white md:text-4xl">
              ¿Tenés una duda o querés asesorarte?
            </h2>
            <p className="mt-3 text-lg text-white/90">Escribinos y charlamos tu caso con calma.</p>
          </div>
          <ButtonLink href={whatsappUrl(consultMessage)} external>
            Escribinos por WhatsApp
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
