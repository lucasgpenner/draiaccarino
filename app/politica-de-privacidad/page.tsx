import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Política de privacidad",
  description: "Cómo tratamos tus datos personales según la Ley 25.326.",
  path: "/politica-de-privacidad/",
});

export default function PrivacidadPage() {
  const { legal, contact, name } = siteConfig;
  return (
    <LegalPage title="Política de privacidad" updated={legal.privacyVersion}>
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          {name}, a cargo de la Dra. Andrea Iaccarino. Contacto: {contact.email} · WhatsApp{" "}
          {contact.whatsappDisplay}.
        </p>
      </section>

      <section>
        <h2>2. Datos que recolectamos</h2>
        <p>Desde el formulario de contacto recolectamos:</p>
        <ul>
          <li>Nombre y apellido, email y, si lo indicás, teléfono.</li>
          <li>Área de consulta y el mensaje que escribas.</li>
          <li>Registro de tu consentimiento (fecha y versión de esta política).</li>
          <li>Una huella criptográfica de tu IP (hash), usada solo para prevenir abusos.</li>
        </ul>
      </section>

      <section>
        <h2>3. Finalidad</h2>
        <p>
          Responder tu consulta, coordinar una reunión y, si contratás, gestionar tu caso. No usamos tus datos
          para publicidad ni los vendemos.
        </p>
      </section>

      <section>
        <h2>4. Base legal</h2>
        <p>
          Tu consentimiento expreso, que otorgás al enviar el formulario (art. 5 de la Ley 25.326).
        </p>
      </section>

      <section>
        <h2>5. Destinatarios y proveedores</h2>
        <p>
          Para operar el sitio y recibir consultas usamos proveedores de infraestructura (Cloudflare, con
          alojamiento y base de datos) y de envío de correo (Resend). Algunos pueden procesar datos fuera de
          Argentina. [Pendiente: verificar y declarar transferencia internacional.]
        </p>
      </section>

      <section>
        <h2>6. Plazo de conservación</h2>
        <p>
          Conservamos las consultas por {legal.retentionMonths} meses desde su recepción. Luego se eliminan.
        </p>
      </section>

      <section>
        <h2>7. Tus derechos</h2>
        <p>
          Podés solicitar acceso, rectificación, actualización y supresión de tus datos, escribiéndonos al
          email de contacto. La Ley 25.326 otorga la acción de protección de datos personales (habeas data)
          en caso de incumplimiento.
        </p>
      </section>

      <section>
        <h2>8. Órgano de control</h2>
        <p>
          {legal.supervisoryAuthority}, en su rol de órgano de control de la Ley 25.326.
        </p>
      </section>

      <section>
        <h2>9. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas razonables: conexión cifrada (HTTPS), validación de datos en el servidor,
          protección anti-bots y acceso restringido a la información.
        </p>
      </section>

      <section>
        <h2>10. Cambios</h2>
        <p>Si cambiamos esta política, actualizaremos la fecha de la versión vigente.</p>
      </section>
    </LegalPage>
  );
}
