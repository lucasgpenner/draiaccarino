import { practiceAreas } from "../../lib/areas";
import type { Env } from "./types";

const RESEND_URL = "https://api.resend.com/emails";

export type NotificationData = {
  id: string;
  area: string;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  createdAt: Date;
};

/**
 * Envía la notificación al estudio. El asunto no incluye datos personales.
 * Devuelve false ante cualquier falla (el registro ya quedó guardado).
 */
export async function sendNotification(env: Env, data: NotificationData): Promise<boolean> {
  const areaTitle = practiceAreas.find((a) => a.slug === data.area)?.title ?? "Otra consulta";
  const from = env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  const text = [
    `Nueva consulta desde el sitio (${data.createdAt.toISOString()})`,
    "",
    `Área: ${areaTitle}`,
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.telefono ?? "No informado"}`,
    "",
    "Mensaje:",
    data.mensaje,
    "",
    `ID de registro: ${data.id}`,
  ].join("\n");

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": data.id,
      },
      body: JSON.stringify({
        from,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject: `Nueva consulta · ${areaTitle}`,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
