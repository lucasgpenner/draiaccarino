import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Aviso legal",
  description: "Datos identificatorios del estudio y alcance de la información del sitio.",
  path: "/aviso-legal/",
});

export default function AvisoLegalPage() {
  const { name, contact, lawyer, coverage } = siteConfig;
  return (
    <LegalPage title="Aviso legal" updated={siteConfig.legal.privacyVersion}>
      <section>
        <h2>Identificación</h2>
        <ul>
          <li>Nombre: {name}</li>
          <li>Titular: {lawyer.name}, {lawyer.title.toLowerCase()}</li>
          <li>Contacto: {contact.email} · WhatsApp {contact.whatsappDisplay}</li>
          <li>Cobertura: {coverage.summary}</li>
          <li>
            Matrícula profesional: [Pendiente: número de matrícula del Colegio de Abogados que corresponda.]
          </li>
        </ul>
      </section>

      <section>
        <h2>Alcance de la información</h2>
        <p>
          La información de este sitio es de carácter general y no constituye asesoramiento legal. Para tu
          situación particular, consultanos.
        </p>
      </section>

      <section>
        <h2>Responsabilidad</h2>
        <p>
          El estudio procura que la información sea precisa y actualizada, pero no se responsabiliza por
          decisiones tomadas solo a partir del contenido publicado.
        </p>
      </section>
    </LegalPage>
  );
}
