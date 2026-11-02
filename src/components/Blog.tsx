"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Posteo, Tag } from "@/lib/types";
import { formatearFecha, minutosDeLectura } from "@/lib/texto";
import { Newsletter } from "./Newsletter";

export function Blog({ posteos }: { posteos: Posteo[] }) {
  const [tagActivo, setTagActivo] = useState<string | null>(null);

  const tags = useMemo(() => {
    const vistos = new Map<string, Tag>();
    for (const posteo of posteos) {
      for (const tag of posteo.tags ?? []) {
        vistos.set(tag.slug, tag);
      }
    }
    return Array.from(vistos.values());
  }, [posteos]);

  const visibles = tagActivo
    ? posteos.filter((p) => p.tags?.some((t) => t.slug === tagActivo))
    : posteos;

  return (
    <section id="blog" className="scroll-mt-18 bg-celeste-soft/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-7">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-celeste">
            <span className="inline-block h-0.5 w-6 bg-celeste" />
            Blog
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl">Posteos recientes</h2>
          <p className="mt-2 max-w-xl text-ink-soft">
            Historias de docentes, estudiantes y egresados: la vida del instituto contada por su
            comunidad.
          </p>
        </div>

        {tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setTagActivo(null)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                tagActivo === null
                  ? "border-celeste-deep bg-celeste-deep text-white"
                  : "border-line bg-white text-ink-soft hover:border-celeste hover:text-ink"
              }`}
            >
              Todos
            </button>
            {tags.map((tag) => (
              <button
                key={tag.slug}
                type="button"
                onClick={() => setTagActivo(tag.slug)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  tagActivo === tag.slug
                    ? "border-celeste-deep bg-celeste-deep text-white"
                    : "border-line bg-white text-ink-soft hover:border-celeste hover:text-ink"
                }`}
              >
                {tag.nombre}
              </button>
            ))}
          </div>
        )}

        {visibles.length === 0 ? (
          <p className="text-ink-soft">
            Todavía no hay posteos publicados. Cargalos desde el{" "}
            <Link href="/admin/collections/posteos" className="text-celeste underline">
              panel de administración
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((posteo) => (
              <article
                key={posteo.id}
                className="flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Link href={`/blog/${posteo.slug}`} className="foto-institucional block aspect-16/10" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {(posteo.tags ?? []).map((tag) => (
                      <span
                        key={tag.slug}
                        className="rounded-full bg-celeste-soft px-2.5 py-0.5 text-[0.68rem] font-bold text-celeste-deep uppercase tracking-wide"
                      >
                        {tag.nombre}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-lg leading-snug">
                    <Link href={`/blog/${posteo.slug}`} className="hover:text-celeste-deep">
                      {posteo.titulo}
                    </Link>
                  </h3>
                  <p className="text-sm text-ink-soft">{posteo.extracto}</p>
                  <div className="mt-auto flex items-center gap-2.5 border-t border-line pt-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-celeste-deep text-xs font-bold text-white">
                      {posteo.autor?.nombre
                        ?.split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("") ?? "IS"}
                    </span>
                    <div className="flex flex-col leading-tight">
                      <strong className="text-sm">{posteo.autor?.nombre ?? "Redacción ISGB"}</strong>
                      <span className="text-xs text-ink-soft">
                        {formatearFecha(posteo.publicadoEn)} · {minutosDeLectura(posteo.contenido)}{" "}
                        min de lectura
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <Newsletter />
      </div>
    </section>
  );
}
