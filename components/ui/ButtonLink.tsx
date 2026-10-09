import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "onDark";

const variants: Record<Variant, string> = {
  // Dorado con texto navy: contraste 5.7:1 (AA).
  primary:
    "bg-gold-500 text-navy-900 hover:bg-navy-900 hover:text-white focus-visible:outline-navy-900",
  secondary:
    "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
  // Para fondos azul marino.
  onDark:
    "border-2 border-white text-white hover:bg-white hover:text-navy-900 focus-visible:outline-white",
};

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  external = false,
  className = "",
  ariaLabel,
}: Props) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-bold transition-colors";
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
