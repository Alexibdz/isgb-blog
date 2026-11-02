import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { seedDatos } from '@/seed'

// Solo para desarrollo local: carga datos de ejemplo (carreras, tags, noticias,
// posteos) vía la Local API, corriendo dentro del propio proceso de Next.
// Alternativa a "npm run seed" cuando ese script standalone no arranca por el
// bug de tsx + Node 24 en Windows (payloadcms/payload#16378).
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'No disponible en producción' }, { status: 403 })
  }

  const payload = await getPayload({ config })
  const resultado = await seedDatos(payload)

  return NextResponse.json({ ok: true, ...resultado })
}
