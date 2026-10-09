import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Política de cookies",
  description: "Qué cookies y tecnologías similares usa el sitio.",
  path: "/politica-de-cookies/",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" updated={siteConfig.legal.privacyVersion}>
      <section>
        <h2>Qué usamos</h2>
        <p>
          El sitio no usa cookies de publicidad ni de seguimiento. Usa almacenamiento técnico necesario para su
          funcionamiento y para la protección contra abusos.
        </p>
        <ul>
          <li>
            Turnstile (Cloudflare): verificación anti-bots en el formulario de contacto. Puede establecer cookies
            técnicas de seguridad.
          </li>
        </ul>
      </section>

      <section>
        <h2>Cómo gestionarlas</h2>
        <p>
          Podés borrar o bloquear cookies desde la configuración de tu navegador. Bloquear las técnicas puede
          impedir enviar el formulario.
        </p>
      </section>

      <section>
        <h2>Cambios</h2>
        <p>Si incorporamos analítica u otras cookies, actualizaremos esta política y pediremos tu consentimiento cuando corresponda.</p>
      </section>
    </LegalPage>
  );
}
