import type { CollectionConfig } from 'payload'

import { esAdminOEditor } from './access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: {
    read: () => true,
    create: esAdminOEditor,
    update: esAdminOEditor,
    delete: esAdminOEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
