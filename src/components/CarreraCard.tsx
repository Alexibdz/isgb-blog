import Link from "next/link";
import type { Carrera } from "@/lib/types";
import { IconArrow, IconClock } from "./icons";

export function CarreraCard({ carrera }: { carrera: Carrera }) {
  return (
    <article className="flex flex-col gap-3.5 rounded-xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
      <h3 className="font-display text-lg">{carrera.nombre}</h3>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
        <IconClock className="h-3.5 w-3.5" />
        {carrera.duracion}
      </div>
      <p className="text-sm text-ink-soft">{carrera.descripcion}</p>
      <Link
        href={`/carreras/${carrera.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-celeste hover:text-celeste-strong"
      >
        Ver plan de estudios <IconArrow className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}
