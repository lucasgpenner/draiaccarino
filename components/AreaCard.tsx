import Link from "next/link";
import type { PracticeArea } from "@/lib/areas";

export function AreaCard({ area }: { area: PracticeArea }) {
  const content = (
    <>
      <h3 className="text-xl leading-snug">{area.title}</h3>
      <p className="mt-2 text-base leading-relaxed text-navy-900/85">{area.summary}</p>
      {area.href && (
        <span className="mt-4 inline-block text-sm font-bold text-navy-700 underline underline-offset-4">
          Ver más
        </span>
      )}
    </>
  );

  const base = `flex h-full flex-col rounded-lg border p-6 ${
    area.featured
      ? "border-gold-500 bg-white ring-2 ring-gold-500/40"
      : "border-navy-900/10 bg-white"
  }`;

  if (area.href) {
    return (
      <Link href={area.href} className={`${base} transition-shadow hover:shadow-md`}>
        {content}
      </Link>
    );
  }

  return <article className={base}>{content}</article>;
}
