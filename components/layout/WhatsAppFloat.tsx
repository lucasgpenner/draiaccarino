import { whatsappUrl } from "@/lib/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl("Hola, quisiera asesorarme sobre mi caso.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp (se abre en una pestaña nueva)"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-navy-900/10 transition-transform hover:scale-105 focus-visible:outline-navy-900 md:bottom-8 md:right-8"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.82 11.82 0 0 0 12.04 0C5.5 0 .17 5.33.17 11.88c0 2.09.55 4.13 1.59 5.93L0 24l6.36-1.67a11.85 11.85 0 0 0 5.68 1.45h.01c6.54 0 11.87-5.33 11.87-11.88 0-3.17-1.24-6.15-3.4-8.42zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.77.99 1.01-3.67-.24-.38a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.98c0 5.45-4.44 9.9-9.86 9.9zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
