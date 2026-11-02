// Wrapper para correr el seed como script standalone: npm run seed
// (separado de seed.ts para que ese archivo se pueda importar desde una
// route handler de Next sin ejecutar nada por su cuenta).
import config from '@payload-config'
import { getPayload } from 'payload'

import { seedDatos } from './seed'

const payload = await getPayload({ config })
const resultado = await seedDatos(payload)
payload.logger.info(resultado)
process.exit(0)
