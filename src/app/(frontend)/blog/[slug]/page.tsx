import { notFound } from "next/navigation";
import Link from "next/link";
import { obtenerPayload } from "@/lib/payload";
import type { Posteo } from "@/lib/types";
import { formatearFecha, minutosDeLectura } from "@/lib/texto";
import { renderizarMarkdown } from "@/lib/markdown";
import { IconCalendar, IconClock } from "@/components/icons";

export default async function PosteoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await obtenerPayload();

  const { docs } = await payload.find({
    collection: "posteos",
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
  });
  const posteo = docs[0] as unknown as Posteo | undefined;
  if (!posteo) notFound();

  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-celeste hover:text-celeste-strong"
      >
        ← Volver al blog
      </Link>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {(posteo.tags ?? []).map((tag) => (
          <span
            key={tag.slug}
            className="rounded-full bg-celeste-soft px-2.5 py-0.5 text-[0.68rem] font-bold tracking-wide text-celeste-deep uppercase"
          >
            {tag.nombre}
          </span>
        ))}
      </div>

      <h1 className="mt-3 text-balance font-display text-3xl sm:text-4xl">{posteo.titulo}</h1>

      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-celeste-deep text-xs font-bold text-white">
          {posteo.autor?.nombre
            ?.split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("") ?? "IS"}
        </span>
        <div className="flex flex-col leading-tight">
          <strong className="text-sm">{posteo.autor?.nombre ?? "Redacción ISGB"}</strong>
          <span className="flex items-center gap-3 text-xs text-ink-soft">
            <span className="flex items-center gap-1">
              <IconCalendar className="h-3 w-3" />
              {formatearFecha(posteo.publicadoEn)}
            </span>
            <span className="flex items-center gap-1">
              <IconClock className="h-3 w-3" />
              {minutosDeLectura(posteo.contenido)} min de lectura
            </span>
          </span>
        </div>
      </div>

      <div
        className="prose prose-slate mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: renderizarMarkdown(posteo.contenido) }}
      />
    </article>
  );
}
