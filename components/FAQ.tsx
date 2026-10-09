type Item = { question: string; answer: string };

export function FAQ({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-navy-900/15 border-y border-navy-900/15">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-navy-900">
            {item.question}
            <span
              aria-hidden="true"
              className="text-2xl leading-none text-navy-700 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-navy-900/85">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
