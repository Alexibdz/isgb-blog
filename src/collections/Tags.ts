import type { CollectionConfig } from 'payload'

import { esAdmin, esAdminOEditor } from './access'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'nombre' },
  access: {
    read: () => true,
    create: esAdminOEditor,
    update: esAdminOEditor,
    delete: esAdmin,
  },
  fields: [
    { name: 'nombre', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
  ],
}
