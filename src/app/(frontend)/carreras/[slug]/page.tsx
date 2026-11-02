import { notFound } from "next/navigation";
import Link from "next/link";
import { obtenerPayload } from "@/lib/payload";
import type { Carrera } from "@/lib/types";
import { IconClock, IconFile } from "@/components/icons";

export default async function CarreraPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await obtenerPayload();

  const { docs } = await payload.find({
    collection: "carreras",
    where: { slug: { equals: slug }, activa: { equals: true } },
    limit: 1,
    overrideAccess: false,
  });
  const carrera = docs[0] as unknown as Carrera | undefined;
  if (!carrera) notFound();

  const planEstudios = carrera.planEstudios ?? [];

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/#oferta"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-celeste hover:text-celeste-strong"
      >
        ← Volver a la oferta académica
      </Link>
      <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink-soft">
        <IconClock className="h-4 w-4" />
        {carrera.duracion} · Presencial
      </p>
      <h1 className="mt-2 text-balance font-display text-3xl sm:text-4xl">{carrera.nombre}</h1>
      <p className="mt-6 text-lg text-ink-soft">{carrera.descripcion}</p>

      {planEstudios.length > 0 && (
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl">Plan de estudios</h2>
            {carrera.planEstudioPdf?.url && (
              <a
                href={carrera.planEstudioPdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-celeste hover:text-celeste-strong"
              >
                <IconFile className="h-4 w-4" />
                Ver más detalle
              </a>
            )}
          </div>
          <div
            className="mt-6 grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
          >
            {planEstudios.map((bloque, i) => (
              <div key={bloque.id ?? i} className="rounded-xl border border-line bg-white p-5">
                <h3 className="font-display text-base text-celeste-deep">Año {i + 1}</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {(bloque.materias ?? []).map((materia, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-celeste" />
                      {materia.nombre}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 rounded-xl bg-celeste-soft p-6">
        <p className="text-sm text-ink-soft">
          ¿Te interesa esta carrera?{" "}
          <Link href="/#contacto" className="font-semibold text-celeste-deep">
            Contactanos
          </Link>{" "}
          para conocer fechas de inscripción y requisitos.
        </p>
      </div>
    </article>
  );
}
