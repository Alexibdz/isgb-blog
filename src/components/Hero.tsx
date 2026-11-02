import { IconArrow, IconCalendar, IconCap } from "./icons";

export function Hero() {
  return (
    <header className="bg-gradient-to-br from-celeste-deep to-celeste-deep-2 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-celeste-soft/80">
            <span className="inline-block h-0.5 w-6 bg-white/60" />
            Gestión estatal · Título oficial
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl leading-tight sm:text-5xl">
            Formá tu futuro profesional en el Instituto Superior Gaspar Benavento
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/80">
            Tecnicaturas y profesorados con salida laboral concreta, prácticas
            profesionalizantes desde el primer año y una comunidad que acompaña cada etapa de tu
            formación.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#oferta"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-celeste-deep transition hover:bg-celeste-soft"
            >
              Ver oferta académica <IconArrow className="h-4 w-4" />
            </a>
            <a
              href="#noticias"
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver noticias
            </a>
          </div>
        </div>

        <div className="relative aspect-4/3.1 overflow-hidden rounded-2xl shadow-2xl">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 25% 20%, rgba(255,255,255,.16), transparent 45%), repeating-linear-gradient(115deg, rgba(255,255,255,.07) 0 2px, transparent 2px 26px), linear-gradient(200deg, #3B8CBE 0%, #0E5C8C 60%, #0A3B63 100%)",
            }}
          />
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-celeste-deep shadow-sm">
            <IconCalendar className="h-3.5 w-3.5" /> Inscripción 2026 abierta
          </span>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90">
            <IconCap className="mb-2.5 h-12 w-12" />
            <strong className="font-display text-2xl tracking-wide">ISGB</strong>
            <span className="mt-1 text-xs uppercase tracking-widest text-white/65">
              Instituto Superior
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
