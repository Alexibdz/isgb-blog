import Link from "next/link";
import type { Noticia } from "@/lib/types";
import { formatearFecha, minutosDeLectura } from "@/lib/texto";
import { IconArrow, IconCalendar, IconClock } from "./icons";

const categoriaLabel: Record<Noticia["categoria"], string> = {
  institucionales: "Institucionales",
  academicas: "Académicas",
  ultimo_momento: "Último momento",
};

export function Noticias({ noticias }: { noticias: Noticia[] }) {
  const [destacada, ...resto] = noticias;
  const secundarias = resto.slice(0, 2);

  return (
    <section id="noticias" className="scroll-mt-18 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-celeste">
              <span className="inline-block h-0.5 w-6 bg-celeste" />
              Noticias
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">Actualidad institucional</h2>
          </div>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-celeste hover:text-celeste-strong"
          >
            Ver todas las noticias <IconArrow className="h-3.5 w-3.5" />
          </Link>
        </div>

        {!destacada ? (
          <p className="text-ink-soft">
            Todavía no hay noticias publicadas. Cargalas desde el{" "}
            <Link href="/admin/collections/noticias" className="text-celeste underline">
              panel de administración
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <article className="flex flex-col gap-4">
              <Link
                href={`/noticias/${destacada.slug}`}
                className="foto-institucional relative block aspect-16/10 overflow-hidden rounded-lg"
              >
                <span className="absolute top-3.5 left-3.5 inline-flex rounded-full bg-celeste-deep px-3 py-1 text-[0.68rem] font-bold tracking-wide text-white uppercase">
                  {categoriaLabel[destacada.categoria]}
                </span>
              </Link>
              <h3 className="font-display text-2xl leading-snug sm:text-3xl">
                <Link href={`/noticias/${destacada.slug}`} className="hover:text-celeste-deep">
                  {destacada.titulo}
                </Link>
              </h3>
              <p className="text-ink-soft">{destacada.bajada}</p>
              <div className="flex gap-4 text-xs text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <IconCalendar className="h-3.5 w-3.5" />
                  {formatearFecha(destacada.publicadoEn)}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconClock className="h-3.5 w-3.5" />
                  {minutosDeLectura(destacada.contenido)} min de lectura
                </span>
              </div>
            </article>

            <div className="flex flex-col gap-6">
              {secundarias.map((noticia) => (
                <article key={noticia.id} className="flex gap-4">
                  <Link
                    href={`/noticias/${noticia.slug}`}
                    className="foto-institucional block h-22 w-30 flex-shrink-0 rounded-lg"
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="inline-flex w-fit rounded-full bg-celeste-soft px-2.5 py-0.5 text-[0.65rem] font-bold tracking-wide text-celeste-deep uppercase">
                      {categoriaLabel[noticia.categoria]}
                    </span>
                    <h4 className="font-display text-base leading-snug">
                      <Link href={`/noticias/${noticia.slug}`} className="hover:text-celeste-deep">
                        {noticia.titulo}
                      </Link>
                    </h4>
                    <span className="flex items-center gap-1.5 text-[0.72rem] text-ink-soft">
                      <IconCalendar className="h-3 w-3" />
                      {formatearFecha(noticia.publicadoEn)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
