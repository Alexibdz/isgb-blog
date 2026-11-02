import { marked } from 'marked'

export function renderizarMarkdown(texto: string): string {
  return marked.parse(texto, { async: false })
}
