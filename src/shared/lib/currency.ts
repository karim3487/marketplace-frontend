import { CurrencyCode } from '@/shared/api/generated'

const currencySymbols: Record<CurrencyCode, string> = {
  [CurrencyCode.RUB]: '₽',
  [CurrencyCode.USD]: '$',
  [CurrencyCode.EUR]: '€',
  [CurrencyCode.KZT]: '₸',
  [CurrencyCode.KGS]: 'с',
}

export function getCurrencySymbol(code?: string | CurrencyCode): string {
  if (!code) return '₽'
  return currencySymbols[code as CurrencyCode] || code
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}
