import type { CollectionConfig } from 'payload'

import { esAdmin, esAdminField } from './access'

export const Usuarios: CollectionConfig = {
  slug: 'usuarios',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['nombre', 'email', 'rol'],
  },
  access: {
    read: () => true,
    create: esAdmin,
    update: esAdmin,
    delete: esAdmin,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'rol',
      type: 'select',
      required: true,
      defaultValue: 'usuario',
      // Admin: gestiona todo. Editor: publica contenido. Alumnado: ve noticias
      // exclusivas y recibe el boletín segmentado. Usuario: público general registrado.
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Alumnado', value: 'alumnado' },
        { label: 'Usuario', value: 'usuario' },
      ],
      access: {
        update: esAdminField,
      },
    },
  ],
}
