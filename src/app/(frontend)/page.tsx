import { obtenerPayload } from "@/lib/payload";
import type { Carrera, Noticia, Posteo } from "@/lib/types";
import { Hero } from "@/components/Hero";
import { OfertaAcademica } from "@/components/OfertaAcademica";
import { Noticias } from "@/components/Noticias";
import { Blog } from "@/components/Blog";

export default async function Home() {
  const payload = await obtenerPayload();

  const [carreras, noticias, posteos] = await Promise.all([
    payload.find({
      collection: "carreras",
      where: { activa: { equals: true } },
      sort: "nombre",
      limit: 6,
      overrideAccess: false,
    }),
    payload.find({
      collection: "noticias",
      sort: "-publicadoEn",
      limit: 3,
      overrideAccess: false,
    }),
    payload.find({
      collection: "posteos",
      sort: "-publicadoEn",
      limit: 9,
      overrideAccess: false,
    }),
  ]);

  return (
    <>
      <Hero />
      <OfertaAcademica carreras={carreras.docs as unknown as Carrera[]} />
      <Noticias noticias={noticias.docs as unknown as Noticia[]} />
      <Blog posteos={posteos.docs as unknown as Posteo[]} />
    </>
  );
}
