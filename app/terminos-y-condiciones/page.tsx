import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio web del estudio.",
  path: "/terminos-y-condiciones/",
});

export default function TerminosPage() {
  return (
    <LegalPage title="Términos y condiciones" updated={siteConfig.legal.privacyVersion}>
      <section>
        <h2>1. Uso del sitio</h2>
        <p>
          Este sitio es informativo. Su uso implica aceptar estos términos. Podés navegarlo y enviar consultas
          sin costo.
        </p>
      </section>

      <section>
        <h2>2. Sin relación profesional por el sitio</h2>
        <p>
          Enviar una consulta no genera una relación abogado-cliente. Esa relación se formaliza solo con la
          aceptación expresa del encargo, por escrito, en los términos que se acuerden.
        </p>
      </section>

      <section>
        <h2>3. Información general</h2>
        <p>
          El contenido es orientativo y no reemplaza el asesoramiento personalizado. Las normas citadas pueden
          cambiar y cada caso depende de sus circunstancias particulares.
        </p>
      </section>

      <section>
        <h2>4. Sin garantía de resultados</h2>
        <p>No garantizamos resultados. Cada caso es distinto.</p>
      </section>

      <section>
        <h2>5. Honorarios</h2>
        <p>
          Los honorarios se acuerdan en cada caso, por escrito, antes de iniciar el trabajo profesional. El
          sitio no publica tarifas.
        </p>
      </section>

      <section>
        <h2>6. Propiedad intelectual</h2>
        <p>
          Los textos, imágenes, logos y diseño del sitio pertenecen al estudio o se usan con autorización. Su
          reproducción sin permiso está prohibida.
        </p>
      </section>

      <section>
        <h2>7. Enlaces a terceros</h2>
        <p>El sitio puede enlazar a servicios de terceros, como WhatsApp. No somos responsables por sus contenidos.</p>
      </section>

      <section>
        <h2>8. Ley aplicable y jurisdicción</h2>
        <p>
          Estos términos se rigen por la ley argentina. [Pendiente: definir jurisdicción, por ejemplo tribunales
          de CABA.]
        </p>
      </section>
    </LegalPage>
  );
}
