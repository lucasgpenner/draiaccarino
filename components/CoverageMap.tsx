import { siteConfig } from "@/lib/site-config";

/**
 * Cobertura sin direcciones. Lista accesible por jurisdicción y zona.
 * Un mapa SVG puede reemplazar este bloque más adelante.
 */
export function CoverageMap() {
  const { caba, gba } = siteConfig.coverage;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <article className="rounded-lg border border-navy-900/10 bg-white p-6">
        <h3 className="text-xl">{caba.label}</h3>
        <p className="mt-2 text-base text-navy-900/85">
          Atendemos casos en toda la Ciudad. Según el fuero, el trámite puede ser nacional o local.
        </p>
      </article>

      <article className="rounded-lg border border-navy-900/10 bg-white p-6">
        <h3 className="text-xl">{gba.label}</h3>
        <p className="mt-2 text-base text-navy-900/85">
          Atendemos en la Provincia de Buenos Aires, por departamento judicial.
        </p>
        <div className="mt-5 space-y-5">
          {gba.zones.map((zone) => (
            <div key={zone.name}>
              <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-700">{zone.name}</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {zone.partidos.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-gold-500/60 bg-ivory-50 px-3 py-1 text-sm text-navy-900"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
