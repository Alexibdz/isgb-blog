import type { CollectionConfig } from 'payload'

import { esAdmin, esAdminOEditor } from './access'

export const Noticias: CollectionConfig = {
  slug: 'noticias',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'categoria', 'audiencia', 'publicadoEn'],
  },
  access: {
    // General: la ve cualquiera. Alumnado: además ve las marcadas "alumnado".
    read: ({ req: { user } }) => {
      if (user?.rol === 'admin' || user?.rol === 'editor' || user?.rol === 'alumnado') {
        return true
      }
      return { audiencia: { equals: 'general' } }
    },
    create: esAdminOEditor,
    update: esAdminOEditor,
    delete: esAdmin,
  },
  fields: [
    { name: 'titulo', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'bajada', type: 'text', required: true },
    { name: 'imagen', type: 'upload', relationTo: 'media' },
    {
      name: 'contenido',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Markdown: # Título, ## Subtítulo, *cursiva*, **negrita**, - lista, [link](url).',
        components: { Field: '@/components/admin/MarkdownField#MarkdownField' },
      },
    },
    {
      name: 'categoria',
      type: 'select',
      required: true,
      defaultValue: 'institucionales',
      options: [
        { label: 'Institucionales', value: 'institucionales' },
        { label: 'Académicas', value: 'academicas' },
        { label: 'Último momento', value: 'ultimo_momento' },
      ],
    },
    {
      name: 'audiencia',
      type: 'select',
      required: true,
      defaultValue: 'general',
      // Define tanto quién puede leer la noticia como a qué boletín dispara:
      // general -> tabla suscriptores; alumnado -> usuarios con rol = alumnado.
      options: [
        { label: 'General (todos)', value: 'general' },
        { label: 'Solo alumnado', value: 'alumnado' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Define a quién le llega en el boletín por email',
      },
    },
    {
      name: 'autor',
      type: 'relationship',
      relationTo: 'usuarios',
      admin: { position: 'sidebar' },
    },
    { name: 'publicadoEn', type: 'date', admin: { position: 'sidebar' } },
  ],
}
