import type { CollectionConfig } from 'payload'

import { esAdmin, esAdminOEditor } from './access'

export const Posteos: CollectionConfig = {
  slug: 'posteos',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'estado', 'autor', 'publicadoEn'],
  },
  access: {
    // Público solo ve publicados; Admin/Editor ven todo (borradores incluidos).
    read: ({ req: { user } }) => {
      if (user?.rol === 'admin' || user?.rol === 'editor') return true
      return { estado: { equals: 'publicado' } }
    },
    create: esAdminOEditor,
    update: esAdminOEditor,
    delete: esAdmin,
  },
  fields: [
    { name: 'titulo', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'extracto',
      type: 'text',
      required: true,
      admin: { description: 'Una línea para la card del blog (no se muestra en la nota).' },
    },
    { name: 'imagenPortada', type: 'upload', relationTo: 'media' },
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
      // Relación muchos-a-muchos: un posteo tiene varias etiquetas,
      // una etiqueta se usa en varios posteos (FK vía relationship en Payload/Postgres).
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    { name: 'carrera', type: 'relationship', relationTo: 'carreras' },
    {
      name: 'estado',
      type: 'select',
      required: true,
      defaultValue: 'borrador',
      options: [
        { label: 'Borrador', value: 'borrador' },
        { label: 'En revisión', value: 'revision' },
        { label: 'Publicado', value: 'publicado' },
      ],
      admin: { position: 'sidebar' },
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
