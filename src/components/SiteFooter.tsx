import Link from "next/link";
import { IconCap, IconMail, IconPhone, IconPin } from "./icons";

export function SiteFooter() {
  return (
    <footer id="contacto" className="scroll-mt-18 bg-celeste-deep-2 text-celeste-soft/80">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-celeste-deep">
                <IconCap className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <small className="text-[0.62rem] font-bold tracking-widest text-celeste-soft/70 uppercase">
                  Instituto Superior
                </small>
                <strong className="font-display text-lg">Gaspar Benavento</strong>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm">
              Formación técnica y docente con título oficial y prácticas desde el primer año.
            </p>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">
              Oferta académica
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/#oferta">Enfermería</Link>
              </li>
              <li>
                <Link href="/#oferta">Desarrollo de Software</Link>
              </li>
              <li>
                <Link href="/#oferta">Educación Inicial</Link>
              </li>
              <li>
                <Link href="/#oferta">Administración de Empresas</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">
              Recursos
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/#noticias">Noticias</Link>
              </li>
              <li>
                <Link href="/#blog">Blog</Link>
              </li>
              <li>
                <Link href="/admin">Panel de administración</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">
              Contacto
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li className="flex items-center gap-2">
                <IconPin className="h-3.5 w-3.5 flex-shrink-0" /> Av. San Martín 1450
              </li>
              <li className="flex items-center gap-2">
                <IconPhone className="h-3.5 w-3.5 flex-shrink-0" /> (0261) 555-0199
              </li>
              <li className="flex items-center gap-2">
                <IconMail className="h-3.5 w-3.5 flex-shrink-0" /> info@isgbenavento.edu.ar
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-xs">
          <span>© 2026 Instituto Superior Gaspar Benavento</span>
        </div>
      </div>
    </footer>
  );
}
