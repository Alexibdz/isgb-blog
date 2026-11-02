import type { CollectionConfig } from 'payload'

import { esAdmin } from './access'

export const Interacciones: CollectionConfig = {
  slug: 'interacciones',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['usuario', 'posteo', 'tipo'],
  },
  access: {
    // Se registran desde el sitio (corazón / 60s de lectura); no son de lectura pública.
    // Requieren usuario logueado, así que quedan inactivas hasta sumar el login con Google.
    read: esAdmin,
    create: ({ req: { user } }) => Boolean(user),
    update: () => false,
    delete: esAdmin,
  },
  fields: [
    { name: 'usuario', type: 'relationship', relationTo: 'usuarios', required: true },
    { name: 'posteo', type: 'relationship', relationTo: 'posteos', required: true },
    {
      name: 'tipo',
      type: 'select',
      required: true,
      options: [
        { label: 'Me gusta', value: 'me_gusta' },
        { label: 'Vista (60s en pantalla)', value: 'vista' },
      ],
    },
  ],
  indexes: [
    // Único por usuario + posteo + tipo: no se duplican corazones ni vistas.
    { fields: ['usuario', 'posteo', 'tipo'], unique: true },
  ],
}
