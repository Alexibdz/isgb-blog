import type { CollectionConfig } from 'payload'

import { esAdmin } from './access'

export const Carreras: CollectionConfig = {
  slug: 'carreras',
  admin: { useAsTitle: 'nombre', defaultColumns: ['nombre', 'duracion'] },
  // Alta de carreras: solo Admin (ver tabla de roles de la propuesta).
  access: {
    read: () => true,
    create: esAdmin,
    update: esAdmin,
    delete: esAdmin,
  },
  fields: [
    { name: 'nombre', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'activa',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Si está desactivada, la carrera no se muestra en el sitio.',
      },
    },
    {
      name: 'duracion',
      type: 'text',
      required: true,
      admin: { description: 'Ej: "3 años"' },
    },
    { name: 'descripcion', type: 'textarea', required: true },
    { name: 'imagen', type: 'upload', relationTo: 'media' },
    {
      name: 'planEstudios',
      type: 'array',
      label: 'Plan de estudios',
      labels: { singular: 'Año', plural: 'Años' },
      admin: {
        description:
          'Un bloque por año, en orden (arrastrá con ⠿ para reordenar). El número de año se toma de la posición.',
      },
      fields: [
        {
          name: 'materias',
          type: 'array',
          label: 'Materias',
          labels: { singular: 'Materia', plural: 'Materias' },
          fields: [{ name: 'nombre', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'planEstudioPdf',
      type: 'upload',
      relationTo: 'media',
      label: 'PDF del plan de estudios',
      admin: { description: 'Se enlaza como "Ver más detalle" en la página de la carrera.' },
    },
  ],
}
