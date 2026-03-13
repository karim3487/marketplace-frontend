import { CurrencyCode, type ProductResponse, type OfferResponse } from '@/shared/api/generated'

export const createProduct = (overrides: Partial<ProductResponse> = {}): ProductResponse => ({
  id: 'P-' + Math.random().toString(36).substring(2, 9),
  name: 'Test Product',
  price: {
    amount: 1000,
    currency: CurrencyCode.RUB
  },
  stock: 10,
  attributes: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides
})

export const createOffer = (overrides: Partial<OfferResponse> = {}): OfferResponse => ({
  id: 'OFFER-' + Math.random().toString(36).substring(2, 9),
  price: {
    amount: 500,
    currency: CurrencyCode.RUB
  },
  seller: {
    id: 'S-1',
    name: 'Top Seller',
    rating: 4.5
  },
  delivery_date: '2026-03-20',
  ...overrides
})
