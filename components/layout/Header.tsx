"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Cobertura", href: "/contacto/#cobertura" },
  { label: "Derecho de familia", href: "/derecho-de-familia/" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // Esc cierra y devuelve el foco al botón.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-white/95 backdrop-blur">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight" aria-label={`${siteConfig.name}, inicio`}>
          <span className="font-serif text-lg font-semibold text-navy-900 md:text-xl">
            {siteConfig.name}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700" aria-hidden="true">
            {siteConfig.tagline}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-gold-500 px-3 py-1 text-xs font-bold text-navy-900 sm:inline-block">
            CABA · GBA
          </span>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-bold text-navy-900">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-navy-700 hover:underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/contacto/"
            className="hidden min-h-11 items-center rounded-md bg-gold-500 px-5 text-sm font-bold text-navy-900 hover:bg-navy-900 hover:text-white lg:inline-flex"
          >
            Contactar
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-navy-900/20 text-navy-900 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id={menuId} ref={menuRef} hidden={!open} className="border-t border-navy-900/10 bg-white lg:hidden">
        <nav aria-label="Principal móvil" className="mx-auto w-full max-w-5xl px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-11 py-3 font-bold text-navy-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contacto/"
                onClick={() => setOpen(false)}
                className="mt-2 flex min-h-12 items-center justify-center rounded-md bg-gold-500 font-bold text-navy-900"
              >
                Contactar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
