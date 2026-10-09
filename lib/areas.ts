export type PracticeArea = {
  slug: string;
  title: string;
  summary: string;
  /** Ruta propia. Solo se define cuando la página existe. */
  href?: string;
  featured?: boolean;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "derecho-de-familia",
    title: "Derecho de familia",
    summary: "Divorcios, cuota alimentaria y régimen de comunicación.",
    href: "/derecho-de-familia/",
    featured: true,
  },
  {
    slug: "derecho-civil",
    title: "Derecho civil",
    summary: "Contratos, deudas y conflictos entre particulares.",
  },
  {
    slug: "transito",
    title: "Tránsito",
    summary: "Reclamos por accidentes de tránsito, daños y lesiones.",
  },
  {
    slug: "art",
    title: "ART",
    summary: "Accidentes y enfermedades laborales. Comisiones médicas y reclamos.",
  },
  {
    slug: "derecho-laboral",
    title: "Derecho laboral",
    summary: "Despidos, diferencias salariales y registración.",
  },
  {
    slug: "empresarial",
    title: "Empresarial, societario y contratos",
    summary: "Constitución de sociedades, contratos y conflictos entre socios.",
  },
  {
    slug: "consumidor",
    title: "Derecho del consumidor",
    summary: "Reclamos a empresas, servicios y productos.",
  },
  {
    slug: "ejecuciones",
    title: "Ejecuciones",
    summary: "Cobro de deudas y reclamos judiciales.",
  },
  {
    slug: "sucesiones",
    title: "Sucesiones",
    summary: "Herencias, declaratorias y trámites.",
  },
  {
    slug: "guardia-legal",
    title: "Guardia legal permanente",
    summary: "Un canal de asesoramiento legal para tus dudas y tu caso.",
  },
];
