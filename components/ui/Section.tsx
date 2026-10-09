import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "white" | "ivory";
  children?: ReactNode;
  headingId?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "white",
  children,
  headingId,
}: Props) {
  const hId = headingId ?? `${id ?? "sec"}-title`;
  const bg = tone === "ivory" ? "bg-ivory-50" : "bg-white";
  return (
    <section
      id={id}
      aria-labelledby={hId}
      className={`${bg} scroll-mt-24 py-16 md:py-24`}
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-navy-700">
            {eyebrow}
          </p>
        )}
        <h2 id={hId} className="mt-3 text-3xl leading-tight md:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-900/85">
            {intro}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
