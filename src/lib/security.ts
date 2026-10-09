import type { Env } from "./types";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Verifica el token de Turnstile en el servidor. Falla cerrado ante cualquier error. */
export async function verifyTurnstile(env: Env, token: string, ip: string): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    const json = (await res.json()) as { success?: boolean; hostname?: string };
    if (json.success !== true) return false;
    if (env.SITE_HOSTNAME && json.hostname !== env.SITE_HOSTNAME) return false;
    return true;
  } catch {
    return false;
  }
}

/** HMAC-SHA256 en hex. Permite rate limit sin guardar la IP en texto plano. */
export async function hmacHex(secret: string, value: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** IP del cliente tal como la informa Cloudflare. */
export function clientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? "";
}