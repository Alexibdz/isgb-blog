import type { CollectionConfig } from 'payload'

import { esAdmin } from './access'

export const Suscriptores: CollectionConfig = {
  slug: 'suscriptores',
  admin: { useAsTitle: 'email' },
  access: {
    read: esAdmin,
    // Alta pública: cualquiera se suscribe desde el formulario del sitio, sin cuenta.
    create: () => true,
    update: esAdmin,
    delete: esAdmin,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'confirmado', type: 'checkbox', defaultValue: false },
  ],
}
