export function minutosDeLectura(contenido: string): number {
  const palabras = contenido.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(palabras / 200))
}

export function formatearFecha(fecha?: string | null): string {
  if (!fecha) return ''
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(fecha))
}
