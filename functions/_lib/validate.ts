import { z } from "zod";
import { practiceAreas } from "../../lib/areas";

const AREA_VALUES = [...practiceAreas.map((a) => a.slug), "otra"] as const;

/** Campos del formulario. Los nombres coinciden con components/ContactForm.tsx */
export const contactSchema = z.object({
  nombre: z
    .string({ error: "Ingresá tu nombre." })
    .trim()
    .min(2, { error: "Ingresá tu nombre." })
    .max(120, { error: "El nombre es demasiado largo." }),
  email: z
    .string({ error: "Ingresá tu email." })
    .trim()
    .max(254, { error: "El email es demasiado largo." })
    .pipe(z.email({ error: "Ingresá un email válido." })),
  telefono: z
    .string()
    .trim()
    .max(30, { error: "El teléfono es demasiado largo." })
    .regex(/^[+\d\s()-]*$/, { error: "Usá solo números, espacios, + y guiones." })
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  area: z.enum(AREA_VALUES, { error: "Elegí un área." }),
  mensaje: z
    .string({ error: "Contanos brevemente tu situación." })
    .trim()
    .min(10, { error: "Contanos un poco más para poder orientarte." })
    .max(2000, { error: "El mensaje supera los 2000 caracteres." }),
  consentimiento: z.literal("on", {
    error: "Necesitamos tu consentimiento para responder.",
  }),
  /** Honeypot: debe llegar vacío. */
  website: z.string().max(200).optional().default(""),
  /** Marca de tiempo de carga del formulario (ms, Unix). */
  startedAt: z.string().regex(/^\d{10,15}$/, { error: "Recargá la página y volvé a intentar." }),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Tabla de campos válidos para devolver errores por campo al cliente. */
export const FIELD_KEYS = ["nombre", "email", "telefono", "area", "mensaje", "consentimiento"] as const;
export type FieldKey = (typeof FIELD_KEYS)[number];

export function toFieldErrors(error: z.ZodError): Partial<Record<FieldKey, string>> {
  const out: Partial<Record<FieldKey, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && (FIELD_KEYS as readonly string[]).includes(key) && !out[key as FieldKey]) {
      out[key as FieldKey] = issue.message;
    }
  }
  return out;
}
