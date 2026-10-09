-- Registro de consultas y consentimiento (Ley 25.326).
-- created_at y consent_at en milisegundos Unix (UTC).
CREATE TABLE IF NOT EXISTS consultas (
  id              TEXT PRIMARY KEY,
  created_at      INTEGER NOT NULL,
  area            TEXT NOT NULL,
  nombre          TEXT NOT NULL,
  email           TEXT NOT NULL,
  telefono        TEXT,
  mensaje         TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  consent_text    TEXT NOT NULL,
  consent_at      INTEGER NOT NULL,
  ip_hash         TEXT NOT NULL,
  email_status    TEXT NOT NULL DEFAULT 'pending'
);

-- Rate limit por IP (hash) y límite diario global.
CREATE INDEX IF NOT EXISTS idx_consultas_ip_created ON consultas (ip_hash, created_at);
CREATE INDEX IF NOT EXISTS idx_consultas_created ON consultas (created_at);
