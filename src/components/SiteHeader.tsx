"use client";

import Link from "next/link";
import { useState } from "react";
import { IconCap, IconClose, IconMenu } from "./icons";

const enlaces = [
  { href: "/#oferta", label: "Oferta académica" },
  { href: "/#noticias", label: "Noticias" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-ink">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-celeste-deep text-white">
            <IconCap className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <small className="text-[0.62rem] font-bold uppercase tracking-widest text-ink-soft">
              Instituto Superior
            </small>
            <strong className="font-display text-lg">Gaspar Benavento</strong>
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="border-b-2 border-transparent py-1 text-sm font-semibold text-ink-soft hover:border-celeste hover:text-ink"
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-celeste-soft sm:inline-flex"
          >
            Ingresar
          </Link>
          <button
            type="button"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={abierto}
            onClick={() => setAbierto((v) => !v)}
            className="inline-flex p-2 text-ink md:hidden"
          >
            {abierto ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {abierto && (
        <nav className="border-b border-line bg-white shadow-md md:hidden">
          <ul className="flex flex-col">
            {enlaces.map((e) => (
              <li key={e.href} className="border-t border-line first:border-t-0">
                <Link
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="block px-5 py-3.5 text-sm font-semibold text-ink"
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
