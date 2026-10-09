"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { practiceAreas } from "@/lib/areas";
import { CONSENT_TEXT } from "@/lib/consent";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

type FieldErrors = Partial<Record<"nombre" | "email" | "telefono" | "area" | "mensaje" | "consentimiento", string>>;

type ApiResponse = {
  ok: boolean;
  message?: string;
  errors?: FieldErrors;
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function ContactForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});
  // Marca de tiempo de carga: el servidor rechaza envíos demasiado rápidos.
  // Se escribe por ref (no por estado) para no re-renderizar ni salir del SSR estático.
  const startedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
    if (!TURNSTILE_SITE_KEY) return;
    if (document.querySelector('script[data-turnstile="1"]')) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = "1";
    document.head.appendChild(script);
  }, []);

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    setErrors({});

    const form = e.currentTarget;
    // startedAt viaja en el input oculto y se incluye en FormData.
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contacto", { method: "POST", body: data });
      const json = (await res.json().catch(() => null)) as ApiResponse | null;

      if (res.ok && json?.ok) {
        setStatus("sent");
        setMessage("Recibimos tu consulta. Te contactamos a la brevedad.");
        form.reset();
        if (startedRef.current) startedRef.current.value = String(Date.now());
        return;
      }

      setStatus("error");
      setErrors(json?.errors ?? {});
      setMessage(
        json?.message ??
          "No pudimos enviar tu consulta. Podés escribirnos por WhatsApp mientras lo resolvemos.",
      );
      if (json?.errors) {
        const firstInvalid = Object.keys(json.errors)[0];
        document.getElementById(fieldId(firstInvalid))?.focus();
      }
    } catch {
      setStatus("error");
      setMessage("Hubo un problema de conexión. Podés escribirnos por WhatsApp.");
    }
  }

  const inputClass = (name: keyof FieldErrors) =>
    `mt-2 w-full min-h-12 rounded-md border bg-white px-4 py-3 text-base text-navy-900 focus:outline-2 focus:outline-offset-2 focus:outline-navy-700 ${
      errors[name] ? "border-red-700" : "border-navy-900/30"
    }`;

  // Función de render (no componente): evita remontar el nodo en cada cambio.
  const renderError = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p id={errorId(name)} className="mt-1 text-sm font-bold text-red-800">
        {errors[name]}
      </p>
    ) : null;

  const describedBy = (name: keyof FieldErrors, hint?: string) =>
    [hint ? `${fieldId(name)}-hint` : null, errors[name] ? errorId(name) : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={`${formId}-intro`}
      className="grid gap-5 rounded-lg border border-navy-900/10 bg-white p-6 md:p-8"
    >
      <p id={`${formId}-intro`} className="text-base text-navy-900/85">
        Completá el formulario y te respondemos. Si preferís, también podés{" "}
        <a className="font-bold underline underline-offset-4" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          escribirnos por WhatsApp
        </a>
        .
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor={fieldId("nombre")} className="block text-sm font-bold text-navy-900">
            Nombre y apellido <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("nombre")}
            name="nombre"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            aria-required="true"
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={describedBy("nombre")}
            className={inputClass("nombre")}
          />
          {renderError("nombre")}
        </div>

        <div>
          <label htmlFor={fieldId("email")} className="block text-sm font-bold text-navy-900">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={inputClass("email")}
          />
          {renderError("email")}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor={fieldId("telefono")} className="block text-sm font-bold text-navy-900">
            Teléfono <span className="font-normal">(opcional)</span>
          </label>
          <input
            id={fieldId("telefono")}
            name="telefono"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            aria-invalid={Boolean(errors.telefono)}
            aria-describedby={describedBy("telefono", "hint")}
            className={inputClass("telefono")}
          />
          <p id={`${fieldId("telefono")}-hint`} className="mt-1 text-sm text-navy-900/75">
            Si lo dejás, te contactamos por WhatsApp o llamada.
          </p>
          {renderError("telefono")}
        </div>

        <div>
          <label htmlFor={fieldId("area")} className="block text-sm font-bold text-navy-900">
            Área de consulta <span aria-hidden="true">*</span>
          </label>
          <select
            id={fieldId("area")}
            name="area"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.area)}
            aria-describedby={describedBy("area")}
            defaultValue=""
            className={inputClass("area")}
          >
            <option value="" disabled>
              Elegí un área
            </option>
            {practiceAreas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.title}
              </option>
            ))}
            <option value="otra">Otra consulta</option>
          </select>
          {renderError("area")}
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("mensaje")} className="block text-sm font-bold text-navy-900">
          Contanos brevemente tu situación <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={fieldId("mensaje")}
          name="mensaje"
          rows={5}
          required
          minLength={10}
          maxLength={2000}
          aria-required="true"
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={describedBy("mensaje", "hint")}
          className={inputClass("mensaje")}
        />
        <p id={`${fieldId("mensaje")}-hint`} className="mt-1 text-sm text-navy-900/75">
          No hace falta que incluyas datos sensibles. Lo vemos juntos en la consulta.
        </p>
        {renderError("mensaje")}
      </div>

      {/* Honeypot: los humanos no lo ven; los bots suelen completarlo. */}
      <div hidden aria-hidden="true">
        <label htmlFor={fieldId("website")}>Sitio web (no completar)</label>
        <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />

      {TURNSTILE_SITE_KEY && (
        <div
          className="cf-turnstile"
          data-sitekey={TURNSTILE_SITE_KEY}
          data-theme="light"
          data-language="es"
        />
      )}

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId("consentimiento")}
            name="consentimiento"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.consentimiento)}
            aria-describedby={describedBy("consentimiento")}
            className="mt-1 h-5 w-5 shrink-0 accent-navy-900"
          />
          <label htmlFor={fieldId("consentimiento")} className="text-sm leading-relaxed text-navy-900">
            {CONSENT_TEXT} Puedo ejercer mis derechos de acceso, rectificación y supresión (Ley 25.326).{" "}
            <Link href="/politica-de-privacidad/" className="font-bold underline underline-offset-4">
              Ver Política de privacidad
            </Link>
            .
          </label>
        </div>
        {renderError("consentimiento")}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold-500 px-8 py-3 text-base font-bold text-navy-900 hover:bg-navy-900 hover:text-white disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Enviando…" : "Enviar consulta"}
        </button>
        <p className="text-sm text-navy-900/75">
          Tu consulta es confidencial. Te respondemos desde {siteConfig.contact.whatsappDisplay}.
        </p>
      </div>

      <div role="status" aria-live="polite" className="min-h-6">
        {message && (
          <p className={status === "sent" ? "font-bold text-navy-900" : "font-bold text-red-800"}>{message}</p>
        )}
      </div>
    </form>
  );
}
