import { describe, it, expect } from 'vitest'

describe('Test de ambiente', () => {
  it('debe sumar correctamente', () => {
    expect(2 + 2).toBe(4)
  })

  it('debe confirmar que el ambiente está funcionando', () => {
    expect(true).toBe(true)
  })
})