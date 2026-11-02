import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Usuarios } from './collections/Usuarios'
import { Media } from './collections/Media'
import { Carreras } from './collections/Carreras'
import { Tags } from './collections/Tags'
import { Posteos } from './collections/Posteos'
import { Noticias } from './collections/Noticias'
import { Interacciones } from './collections/Interacciones'
import { Suscriptores } from './collections/Suscriptores'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Usuarios.slug,
    meta: {
      titleSuffix: '- Instituto Superior Gaspar Benavento',
    },
  },
  collections: [Usuarios, Media, Carreras, Tags, Posteos, Noticias, Interacciones, Suscriptores],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Local por ahora: SQLite, un archivo en la raíz del proyecto, sin infraestructura.
  // Para pasar a Supabase/Postgres más adelante: cambiar este adaptador por
  // @payloadcms/db-postgres (ya instalado) apuntando a DATABASE_URI y correr las
  // migraciones de nuevo — las colecciones no cambian.
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./isgb.db',
    },
  }),
})
