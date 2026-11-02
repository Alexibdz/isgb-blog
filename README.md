# Instituto Superior Gaspar Benavento — sitio + blog

Next.js (App Router) + [Payload CMS](https://payloadcms.com) embebido. Local por ahora con
SQLite, sin ninguna infraestructura cloud — ver la sección **Pasar a producción** para el
cambio a Postgres/Supabase cuando corresponda.

## Arrancar en local

```bash
npm install
cp .env.example .env   # y completar PAYLOAD_SECRET
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) para el sitio público y
[http://localhost:3000/admin](http://localhost:3000/admin) para el panel de administración.

La primera vez no hay usuarios ni contenido. Dos formas de cargar datos de ejemplo (carreras,
tags, noticias, posteos) y un usuario admin:

- Con el servidor corriendo: `curl -X POST http://localhost:3000/api/dev-seed`
  (crea el admin `admin@isgbenavento.edu.ar` / `CambiarPassword123!` — cambiala después;
  el endpoint devuelve 403 en producción)
- O crear el primer usuario a mano desde `/admin` y cargar el resto del contenido ahí mismo.

> `npm run seed` (el script standalone) hoy no arranca en Windows por un bug conocido de la
> herramienta `tsx` con Node 24 al cargar `payload.config.ts`
> ([payloadcms/payload#16378](https://github.com/payloadcms/payload/issues/16378)). El endpoint
> `/api/dev-seed` hace exactamente lo mismo pero corre dentro del propio proceso de Next, que no
> tiene ese problema. Por la misma razón, `npm run generate:types` tampoco genera
> `payload-types.ts` en esta máquina — mientras tanto los tipos de cada colección están a mano en
> `src/lib/types.ts`. Ninguno de los dos bugs afecta a `next dev` / `next build`, que son los que
> importan para correr el sitio.

## Qué hay armado

- **Colecciones** (`src/collections/`): Usuarios (roles admin/editor/alumnado/usuario), Media,
  Carreras, Tags, Posteos (blog), Noticias, Interacciones (corazón/vista) y Suscriptores
  (newsletter). El modelo completo está documentado en la propuesta de diseño.
- **Sitio público** (`src/app/(frontend)/`): home con hero, oferta académica, noticias
  (3 bloques), blog con filtro por etiqueta y newsletter; listado de carreras (`/carreras`,
  solo las marcadas como activas) y detalle de carrera/noticia/posteo. Las cards del blog
  muestran fecha y minutos de lectura estimados (`src/lib/texto.ts`).
- **Carreras**: cada carrera tiene un check `activa` (si se desactiva desaparece del sitio sin
  borrarla), un **plan de estudios** cargado como bloques por año con su lista de materias
  (el número de año sale del orden; se reordena arrastrando) y un PDF opcional del plan que
  se enlaza como "Ver más detalle".
- **Contenido en Markdown**: noticias y posteos se escriben en Markdown en vez del editor
  rich text. En el admin, el campo usa un componente propio
  (`src/components/admin/MarkdownField.tsx`) que muestra la vista previa renderizada y pasa
  a modo edición con "Editar ✎". El mismo renderizador (`marked`, en `src/lib/markdown.ts`)
  se usa en el admin y en el sitio, así lo que se ve en la vista previa es lo que se publica.
- **Roles**: Admin y Editor pueden publicar. Alumnado ve además las noticias marcadas
  `audiencia: alumnado` (probalo: `/noticias/cambios-mesas-finales-agosto` da 404 para un
  visitante anónimo, a propósito). Usuario es el público general registrado.
- **Newsletter**: `POST /api/newsletter` da de alta un email en `suscriptores`. Noticias
  `audiencia: general` van al boletín general (tabla `suscriptores`); noticias
  `audiencia: alumnado` van a los usuarios con `rol: alumnado` — el envío en sí (Brevo/Resend)
  todavía no está conectado, solo el modelo de datos y el alta pública.
- **Interacciones** (corazón / vista con 60s de permanencia): la colección y el índice único
  (`usuario + posteo + tipo`) ya están, pero la UI para reaccionar se deja para cuando exista
  login real — reaccionar sin saber quién sos no tiene sentido.

## Pendiente a propósito (por orden de la conversación)

1. **Login con Google** (NextAuth o Supabase Auth) — recién cuando el resto esté firme.
   Una vez armado, la UI de reacciones y el boletín segmentado se activan solos porque ya
   usan `usuarios.rol` y `interacciones`.
2. **Imágenes reales**: `Media` usa almacenamiento local en disco por ahora
   (`@payloadcms/db-postgres` ya está instalado pero sin usar; lo mismo va a pasar con un
   adaptador de storage cuando haya hosting real).

## Pasar a producción (Postgres/Supabase + Vercel + DonWeb)

Cuando el sitio esté probado en local:

1. Crear el proyecto en Supabase y copiar la connection string de Postgres.
2. En `src/payload.config.ts`, cambiar `sqliteAdapter` por `postgresAdapter` (el paquete
   `@payloadcms/db-postgres` ya está en `package.json`, solo falta usarlo):

   ```ts
   import { postgresAdapter } from '@payloadcms/db-postgres'
   // ...
   db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),
   ```

3. Setear `DATABASE_URI` con la connection string de Supabase y un `PAYLOAD_SECRET` nuevo en
   las env vars de Vercel (no reusar el de local).
4. Deploy del repo en Vercel. El dominio y el correo institucional (`@isgbenavento.edu.ar`)
   quedan en DonWeb, aparte del hosting de la app.
5. Las colecciones no cambian nada en esta migración — es solo el adaptador de base de datos.

## Notas

- `/` se pre-renderiza como página estática en el build. Si el contenido cambia seguido y no
  querés esperar a un nuevo deploy, agregar `export const revalidate = <segundos>` en
  `src/app/page.tsx`.
- El archivo `isgb.db` (SQLite local), `.env` y `src/payload-types.ts` están en `.gitignore`
  — no se versionan.
- `src/app/(payload)/admin/importMap.js` **sí** se versiona: lo importa el layout del admin
  y registra el componente `MarkdownField`. Si se agrega otro componente custom al admin hay
  que sumarlo ahí (o regenerarlo con `npm run generate:importmap` donde ese comando funcione).
