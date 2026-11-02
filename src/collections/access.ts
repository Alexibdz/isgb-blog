import type { Access, FieldAccess } from 'payload'

export const esAdmin: Access = ({ req: { user } }) => user?.rol === 'admin'

export const esAdminOEditor: Access = ({ req: { user } }) =>
  user?.rol === 'admin' || user?.rol === 'editor'

export const esAdminField: FieldAccess = ({ req: { user } }) => user?.rol === 'admin'
