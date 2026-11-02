import Link from "next/link";
import type { Carrera } from "@/lib/types";
import { CarreraCard } from "./CarreraCard";
import { IconArrow } from "./icons";

export function OfertaAcademica({ carreras }: { carreras: Carrera[] }) {
  return (
    <section id="oferta" className="scroll-mt-18 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-celeste">
              <span className="inline-block h-0.5 w-6 bg-celeste" />
              Oferta académica
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">Elegí tu carrera</h2>
            <p className="mt-2 max-w-xl text-ink-soft">
              Tecnicaturas superiores y profesorados con planes actualizados y prácticas en
              instituciones de la región. Todas nuestras carreras se cursan de forma presencial.
            </p>
          </div>
          <Link
            href="/carreras"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-celeste hover:text-celeste-strong"
          >
            Ver todas las carreras <IconArrow className="h-3.5 w-3.5" />
          </Link>
        </div>

        {carreras.length === 0 ? (
          <p className="text-ink-soft">
            Todavía no hay carreras cargadas. Agregalas desde el{" "}
            <Link href="/admin/collections/carreras" className="text-celeste underline">
              panel de administración
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {carreras.map((carrera) => (
              <CarreraCard key={carrera.id} carrera={carrera} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
