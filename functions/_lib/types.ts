/** Bindings y secretos de la Pages Function. Ver .env.example */
export interface Env {
  DB: D1Database;
  /** Secret de Cloudflare Turnstile (server-side). */
  TURNSTILE_SECRET_KEY: string;
  /** Opcional: si se define, el token debe haberse emitido para este hostname. */
  SITE_HOSTNAME?: string;
  /** API key de Resend. */
  RESEND_API_KEY: string;
  /** Destino de las notificaciones (hoy, Gmail del estudio). */
  CONTACT_TO_EMAIL: string;
  /** Remitente. Sin dominio verificado, usar onboarding@resend.dev. */
  CONTACT_FROM_EMAIL?: string;
  /** Clave para HMAC del IP hash. No se guarda la IP en texto plano. */
  IP_HASH_SECRET: string;
}
