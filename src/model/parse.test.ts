import { describe, expect, it } from 'vitest'
import { clamp, parseField, parseNumber } from './parse'

describe('parseNumber', () => {
  it('accepts a bare integer', () => {
    expect(parseNumber('85')).toBe(85)
  })
  it('strips a percent sign', () => {
    expect(parseNumber('85%')).toBe(85)
    expect(parseNumber('85 %')).toBe(85)
  })
  it('strips currency symbols and spaces', () => {
    expect(parseNumber('€ 1 234')).toBe(1234)
    expect(parseNumber('£35')).toBe(35)
  })
  it('treats a lone comma as a decimal separator', () => {
    expect(parseNumber('0,85')).toBeCloseTo(0.85, 10)
  })
  it('parses EU grouped form 1.234,56', () => {
    expect(parseNumber('1.234,56')).toBeCloseTo(1234.56, 10)
  })
  it('parses UK/US grouped form 1,234.56', () => {
    expect(parseNumber('1,234.56')).toBeCloseTo(1234.56, 10)
  })
  it('returns NaN for empty / junk', () => {
    expect(Number.isNaN(parseNumber(''))).toBe(true)
    expect(Number.isNaN(parseNumber('abc'))).toBe(true)
  })
})

describe('clamp', () => {
  it('bounds values', () => {
    expect(clamp(-1, 0, 1)).toBe(0)
    expect(clamp(2, 0, 1)).toBe(1)
    expect(clamp(0.5, 0, 1)).toBe(0.5)
  })
})

describe('parseField (per field kind)', () => {
  it('percent field: 85 → 0.85', () => {
    expect(parseField('85', 'percent', [0, 1])).toBeCloseTo(0.85, 10)
  })
  it('percent field: 85% → 0.85', () => {
    expect(parseField('85%', 'percent', [0, 1])).toBeCloseTo(0.85, 10)
  })
  it('percent field clamps above 100%', () => {
    expect(parseField('150', 'percent', [0, 1])).toBe(1)
  })
  it('currency field: keeps the raw number', () => {
    expect(parseField('1.234,56', 'currency', [0, 1e12])).toBeCloseTo(1234.56, 10)
  })
  it('number field: keeps the raw number', () => {
    expect(parseField('2', 'number', [0.01, 1000])).toBe(2)
  })
  it('returns null for unparseable input', () => {
    expect(parseField('', 'currency', [0, 1e12])).toBeNull()
  })
})
