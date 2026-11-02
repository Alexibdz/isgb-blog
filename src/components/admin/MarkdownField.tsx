'use client'

import React, { useMemo, useState } from 'react'
import { useField } from '@payloadcms/ui'
import type { TextareaFieldClientComponent, Validate } from 'payload'
import { renderizarMarkdown } from '@/lib/markdown'

const cajaEstilo: React.CSSProperties = {
  border: '1px solid var(--theme-border-color)',
  borderRadius: 'var(--style-radius-m)',
  background: 'var(--theme-input-bg)',
}

export const MarkdownField: TextareaFieldClientComponent = (props) => {
  const { field, path: pathFromProps, validate, readOnly } = props
  const {
    value,
    setValue,
    disabled,
    showError,
    customComponents: { Error: ErrorComponent } = {},
  } = useField<string>({ potentiallyStalePath: pathFromProps, validate: validate as Validate | undefined })
  const [editando, setEditando] = useState(false)

  const label = typeof field.label === 'string' ? field.label : field.name
  const texto = value ?? ''
  const html = useMemo(() => renderizarMarkdown(texto), [texto])

  return (
    <div style={{ marginBottom: 'calc(var(--base) * 1.5)' }}>
      <label style={{ display: 'block', marginBottom: 'calc(var(--base) / 4)', fontWeight: 600 }}>
        {label}
        {field.required && <span style={{ color: 'var(--theme-error-500)' }}> *</span>}
      </label>

      {!editando ? (
        <button
          type="button"
          disabled={readOnly || disabled}
          onClick={() => setEditando(true)}
          style={{
            ...cajaEstilo,
            position: 'relative',
            width: '100%',
            padding: 'var(--base)',
            textAlign: 'left',
            cursor: readOnly || disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 10,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--theme-success-500)',
            }}
          >
            Editar ✎
          </span>
          <div
            style={{ opacity: texto ? 1 : 0.5, maxWidth: '90%' }}
            dangerouslySetInnerHTML={{
              __html: texto ? html : 'Sin contenido todavía. Tocá para escribir.',
            }}
          />
        </button>
      ) : (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--base)',
            }}
          >
            <textarea
              autoFocus
              value={texto}
              onChange={(e) => setValue(e.target.value)}
              readOnly={readOnly || disabled}
              rows={16}
              placeholder={'# Título\n\nTexto en *cursiva* o **negrita**, - listas, [links](url)...'}
              style={{
                ...cajaEstilo,
                padding: 'var(--base)',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                lineHeight: 1.5,
                width: '100%',
                resize: 'vertical',
              }}
            />
            <div
              style={{ ...cajaEstilo, padding: 'var(--base)', overflow: 'auto' }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div
            style={{
              marginTop: 'calc(var(--base) / 2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: 12, color: 'var(--theme-elevation-500)', margin: 0 }}>
              Markdown: # Título · ## Subtítulo · *cursiva* · **negrita** · - lista · [texto](url)
            </p>
            <button
              type="button"
              onClick={() => setEditando(false)}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--style-radius-s)',
                border: '1px solid var(--theme-border-color)',
                background: 'var(--theme-elevation-0)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Listo
            </button>
          </div>
        </div>
      )}

      {showError && ErrorComponent}
    </div>
  )
}
