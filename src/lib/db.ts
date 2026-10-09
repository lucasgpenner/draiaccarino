import type { D1Database } from "./types";

export type ConsultaRow = {
  id: string;
  createdAt: number;
  area: string;
  nombre: string;
  email: string;
  telefono: string | undefined;
  mensaje: string;
  consentVersion: string;
  consentText: string;
  consentAt: number;
  ipHash: string;
};

/** Borra consultas más viejas que el plazo de retención. */
export async function purgeExpired(db: D1Database, cutoffMs: number): Promise<void> {
  await db.prepare("DELETE FROM consultas WHERE created_at < ?").bind(cutoffMs).run();
}

/** Cantidad de envíos de una IP desde `sinceMs`. Usa el índice (ip_hash, created_at). */
export async function countByIpSince(db: D1Database, ipHash: string, sinceMs: number): Promise<number> {
  const row = await db
    .prepare("SELECT COUNT(*) AS n FROM consultas WHERE ip_hash = ? AND created_at >= ?")
    .bind(ipHash, sinceMs)
    .first<{ n: number }>();
  return row?.n ?? 0;
}

/** Cantidad total de consultas desde `sinceMs`. Tope diario global. */
export async function countSince(db: D1Database, sinceMs: number): Promise<number> {
  const row = await db
    .prepare("SELECT COUNT(*) AS n FROM consultas WHERE created_at >= ?")
    .bind(sinceMs)
    .first<{ n: number }>();
  return row?.n ?? 0;
}

export async function insertConsulta(db: D1Database, c: ConsultaRow): Promise<void> {
  await db
    .prepare(
      `INSERT INTO consultas
        (id, created_at, area, nombre, email, telefono, mensaje, consent_version, consent_text, consent_at, ip_hash, email_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    )
    .bind(
      c.id,
      c.createdAt,
      c.area,
      c.nombre,
      c.email,
      c.telefono ?? null,
      c.mensaje,
      c.consentVersion,
      c.consentText,
      c.consentAt,
      c.ipHash,
    )
    .run();
}

export async function setEmailStatus(db: D1Database, id: string, status: "sent" | "failed"): Promise<void> {
  await db.prepare("UPDATE consultas SET email_status = ? WHERE id = ?").bind(status, id).run();
}