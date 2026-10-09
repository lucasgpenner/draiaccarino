import { CONSENT_TEXT, PRIVACY_VERSION } from "../../lib/consent";
import { countByIpSince, countSince, insertConsulta, purgeExpired, setEmailStatus } from "./db";
import { sendNotification } from "./email";
import { contactSchema, toFieldErrors } from "./validate";
import { clientIp, hmacHex, verifyTurnstile } from "./security";
import type { Env } from "./types";

/** Límites de abuso y consumo. Ajustables sin tocar la lógica. */
const LIMITS = {
  /** Mínimo de segundos entre carga y envío. Por debajo, se trata como bot. */
  minFillMs: 3_000,
  /** Envíos por IP por hora. */
  perIpPerHour: 5,
  /** Tope global diario, para proteger la cuota gratuita de D1. */
  perDay: 200,
  /** Tamaño máximo del body (bytes). */
  maxBodyBytes: 20_000,
  /** Plazo de retención en meses. */
  retentionMonths: 12,
} as const;

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...JSON_HEADERS, ...extra } });

const MSG = {
  unavailable:
    "El formulario no está disponible en este momento. Podés escribirnos por WhatsApp.",
  invalidRequest: "No pudimos leer el formulario. Recargá la página y volvé a intentar.",
  fields: "Revisá los campos marcados.",
  human: "No pudimos verificar tu navegador. Probá de nuevo.",
  rateIp: "Recibimos varios envíos desde tu conexión. Escribinos por WhatsApp.",
  rateDay: "Alcanzamos el cupo diario de consultas por el formulario. Escribinos por WhatsApp.",
  notified:
    "Guardamos tu consulta, pero no pudimos notificarla. Escribinos por WhatsApp para asegurarnos de recibirla.",
  ok: "Recibimos tu consulta. Te contactamos a la brevedad.",
} as const;

/** Cutoff de retención: hoy menos N meses, en ms. */
function retentionCutoff(now: Date): number {
  const d = new Date(now.getTime());
  d.setUTCMonth(d.getUTCMonth() - LIMITS.retentionMonths);
  return d.getTime();
}

function isConfigured(env: Env): boolean {
  return Boolean(
    env.DB && env.TURNSTILE_SECRET_KEY && env.RESEND_API_KEY && env.CONTACT_TO_EMAIL && env.IP_HASH_SECRET,
  );
}

export async function handleContactRequest(request: Request, env: Env): Promise<Response> {
  try {
    return await handleContact(request, env);
  } catch (err) {
    // Sin datos personales ni stack trace hacia el cliente.
    console.error("contacto: error interno", err instanceof Error ? err.name : "desconocido");
    return json({ ok: false, message: MSG.unavailable }, 500);
  }
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, message: "Método no permitido." }, 405, { Allow: "POST" });
  }

  // Falla cerrado si falta algún secreto o binding.
  if (!isConfigured(env)) {
    console.error("contacto: configuración incompleta");
    return json({ ok: false, message: MSG.unavailable }, 503);
  }

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > LIMITS.maxBodyBytes) {
    return json({ ok: false, message: MSG.invalidRequest }, 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, message: MSG.invalidRequest }, 400);
  }

  const raw: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") raw[key] = value;
  }

  // Honeypot: un humano no completa este campo. Respondemos OK sin guardar.
  if ((raw.website ?? "").trim() !== "") {
    return json({ ok: true, message: MSG.ok }, 200);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, message: MSG.fields, errors: toFieldErrors(parsed.error) }, 400);
  }
  const data = parsed.data;

  const now = new Date();
  const ip = clientIp(request);

  // Envío demasiado rápido: típico de bots. Respondemos OK sin guardar.
  const elapsed = now.getTime() - Number(data.startedAt);
  if (elapsed < LIMITS.minFillMs) {
    return json({ ok: true, message: MSG.ok }, 200);
  }

  if (!(await verifyTurnstile(env, raw["cf-turnstile-response"] ?? "", ip))) {
    return json({ ok: false, message: MSG.human }, 403);
  }

  const ipHash = await hmacHex(env.IP_HASH_SECRET, ip || "sin-ip");

  // Retención: se purga en cada envío válido.
  await purgeExpired(env.DB, retentionCutoff(now));

  const hourCount = await countByIpSince(env.DB, ipHash, now.getTime() - 60 * 60 * 1000);
  if (hourCount >= LIMITS.perIpPerHour) {
    return json({ ok: false, message: MSG.rateIp }, 429, { "Retry-After": "3600" });
  }

  const dayCount = await countSince(env.DB, now.getTime() - 24 * 60 * 60 * 1000);
  if (dayCount >= LIMITS.perDay) {
    return json({ ok: false, message: MSG.rateDay }, 429, { "Retry-After": "3600" });
  }

  const id = crypto.randomUUID();
  await insertConsulta(env.DB, {
    id,
    createdAt: now.getTime(),
    area: data.area,
    nombre: data.nombre,
    email: data.email,
    telefono: data.telefono,
    mensaje: data.mensaje,
    consentVersion: PRIVACY_VERSION,
    consentText: CONSENT_TEXT,
    consentAt: now.getTime(),
    ipHash,
  });

  const sent = await sendNotification(env, {
    id,
    area: data.area,
    nombre: data.nombre,
    email: data.email,
    telefono: data.telefono,
    mensaje: data.mensaje,
    createdAt: now,
  });
  await setEmailStatus(env.DB, id, sent ? "sent" : "failed");

  if (!sent) {
    console.error("contacto: falló el envío de notificación", id);
    return json({ ok: false, message: MSG.notified }, 502);
  }

  return json({ ok: true, message: MSG.ok }, 201);
}