import { notFound } from "next/navigation";
import Link from "next/link";
import { obtenerPayload } from "@/lib/payload";
import type { Noticia } from "@/lib/types";
import { formatearFecha, minutosDeLectura } from "@/lib/texto";
import { renderizarMarkdown } from "@/lib/markdown";
import { IconCalendar, IconClock } from "@/components/icons";

const categoriaLabel: Record<Noticia["categoria"], string> = {
  institucionales: "Institucionales",
  academicas: "Académicas",
  ultimo_momento: "Último momento",
};

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await obtenerPayload();

  const { docs } = await payload.find({
    collection: "noticias",
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
  });
  const noticia = docs[0] as unknown as Noticia | undefined;
  if (!noticia) notFound();

  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/#noticias"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-celeste hover:text-celeste-strong"
      >
        ← Volver a noticias
      </Link>
      <span className="mt-6 inline-flex w-fit rounded-full bg-celeste-deep px-3 py-1 text-[0.68rem] font-bold tracking-wide text-white uppercase">
        {categoriaLabel[noticia.categoria]}
      </span>
      <h1 className="mt-3 text-balance font-display text-3xl sm:text-4xl">{noticia.titulo}</h1>
      <p className="mt-4 text-lg text-ink-soft">{noticia.bajada}</p>
      <div className="mt-4 flex gap-4 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5">
          <IconCalendar className="h-3.5 w-3.5" />
          {formatearFecha(noticia.publicadoEn)}
        </span>
        <span className="flex items-center gap-1.5">
          <IconClock className="h-3.5 w-3.5" />
          {minutosDeLectura(noticia.contenido)} min de lectura
        </span>
      </div>

      <div
        className="prose prose-slate mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: renderizarMarkdown(noticia.contenido) }}
      />
    </article>
  );
}
