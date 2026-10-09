/** Bindings y secretos del Worker. Ver .env.example */
export interface Env {
  DB: D1Database;
  /** Binding de assets: env.ASSETS.fetch() sirve el contenido de out/. */
  ASSETS: Fetcher;
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

/** Forma mínima de D1 que usa el código (tipada sin Workers público global). */
export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<{ success: boolean }>;
  first<T = unknown>(): Promise<T | null>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

/** Binding de assets del Worker. */
export interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}