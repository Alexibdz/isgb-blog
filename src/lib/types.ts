// Tipos mínimos a mano, uno por colección, con lo que consume el front.
//
// Lo ideal es generarlos con `npm run generate:types` (payload-types.ts), pero
// ese comando pega hoy con un bug conocido de tsx + Node 24 en Windows
// (https://github.com/payloadcms/payload/issues/16378). Cuando se corra en
// Linux/CI o se actualice el toolchain, conviene generar los reales y borrar
// este archivo.

export type Media = {
  id: number | string
  url?: string | null
  alt: string
}

export type Usuario = {
  id: number | string
  nombre: string
  email: string
  rol: 'admin' | 'editor' | 'alumnado' | 'usuario'
}

export type Carrera = {
  id: number | string
  nombre: string
  slug: string
  activa?: boolean | null
  duracion: string
  descripcion: string
  imagen?: Media | null
  planEstudios?:
    | {
        id?: string | null
        materias?: { nombre: string }[] | null
      }[]
    | null
  planEstudioPdf?: Media | null
}

export type Tag = {
  id: number | string
  nombre: string
  slug: string
}

export type Posteo = {
  id: number | string
  titulo: string
  slug: string
  extracto: string
  imagenPortada?: Media | null
  contenido: string
  tags?: Tag[] | null
  carrera?: Carrera | null
  estado: 'borrador' | 'revision' | 'publicado'
  autor?: Usuario | null
  publicadoEn?: string | null
}

export type Noticia = {
  id: number | string
  titulo: string
  slug: string
  bajada: string
  imagen?: Media | null
  contenido: string
  categoria: 'institucionales' | 'academicas' | 'ultimo_momento'
  audiencia: 'general' | 'alumnado'
  autor?: Usuario | null
  publicadoEn?: string | null
}
