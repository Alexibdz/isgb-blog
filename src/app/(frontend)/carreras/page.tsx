import Link from "next/link";
import { obtenerPayload } from "@/lib/payload";
import type { Carrera } from "@/lib/types";
import { CarreraCard } from "@/components/CarreraCard";

export default async function CarrerasPage() {
  const payload = await obtenerPayload();

  const { docs } = await payload.find({
    collection: "carreras",
    where: { activa: { equals: true } },
    sort: "nombre",
    limit: 100,
    overrideAccess: false,
  });
  const carreras = docs as unknown as Carrera[];

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-celeste hover:text-celeste-strong"
      >
        ← Volver al inicio
      </Link>
      <p className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-celeste">
        <span className="inline-block h-0.5 w-6 bg-celeste" />
        Oferta académica
      </p>
      <h1 className="mt-2 text-balance font-display text-3xl sm:text-4xl">Nuestras carreras</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Tecnicaturas superiores y profesorados con planes actualizados y prácticas en
        instituciones de la región. Todas nuestras carreras se cursan de forma presencial.
      </p>

      {carreras.length === 0 ? (
        <p className="mt-10 text-ink-soft">
          Todavía no hay carreras activas cargadas. Agregalas o activalas desde el{" "}
          <Link href="/admin/collections/carreras" className="text-celeste underline">
            panel de administración
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {carreras.map((carrera) => (
            <CarreraCard key={carrera.id} carrera={carrera} />
          ))}
        </div>
      )}
    </div>
  );
}
