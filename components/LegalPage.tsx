import type { ReactNode } from "react";

type Props = {
  title: string;
  updated: string;
  children: ReactNode;
};

/**
 * Esqueleto legal. Los textos son BORRADOR y deben revisarse
 * con un profesional antes de publicar.
 */
export function LegalPage({ title, updated, children }: Props) {
  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <div
          role="note"
          className="mb-10 rounded-md border-l-4 border-gold-500 bg-ivory-50 p-4 text-sm font-bold text-navy-900"
        >
          BORRADOR. Pendiente de revisión por profesional antes de su publicación.
        </div>
        <h1 className="text-4xl leading-tight">{title}</h1>
        <p className="mt-3 text-sm text-navy-900/75">Última actualización: {updated}</p>
        <div className="mt-10 space-y-8 text-base leading-relaxed text-navy-900/90 [&_h2]:mt-0 [&_h2]:text-2xl [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </main>
  );
}
