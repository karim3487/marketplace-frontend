import { describe, it, expect } from 'vitest'
import { getCurrencySymbol, formatPrice } from './currency'
import { CurrencyCode } from '@/shared/api/generated'

describe('currency lib', () => {
  describe('getCurrencySymbol', () => {
    it('should return the correct symbol for known currency codes', () => {
      // Given/When/Then
      expect(getCurrencySymbol(CurrencyCode.RUB)).toBe('₽')
      expect(getCurrencySymbol(CurrencyCode.USD)).toBe('$')
      expect(getCurrencySymbol(CurrencyCode.EUR)).toBe('€')
      expect(getCurrencySymbol(CurrencyCode.KZT)).toBe('₸')
      expect(getCurrencySymbol(CurrencyCode.KGS)).toBe('с')
    })

    it('should fall back to the provided code if it is unknown', () => {
      const unknownCode = 'XYZ'
      expect(getCurrencySymbol(unknownCode)).toBe(unknownCode)
    })

    it('should return the default symbol (RUB) if no code is provided', () => {
      expect(getCurrencySymbol()).toBe('₽')
    })
  })

  describe('formatPrice', () => {
    it('should format a decimal price with correct separators for the Russian locale', () => {
      // Given
      const price = 1234.56
      
      // When
      const result = formatPrice(price)
      
      // Then
      // Use regex to handle both regular and non-breaking spaces
      expect(result).toMatch(/1\s234,56/)
    })

    it('should return the original value as a string if it has no fractional part', () => {
      // Given
      const price = 100
      
      // When
      const result = formatPrice(price)
      
      // Then
      expect(result).toBe('100')
    })
  })
})
