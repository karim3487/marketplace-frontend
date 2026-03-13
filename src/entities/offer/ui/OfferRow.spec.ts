import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OfferRow from './OfferRow.vue'
import { createOffer } from '@/shared/lib/test-factories'
import { CurrencyCode } from '@/shared/api/generated'

describe('OfferRow', () => {
  it('should render seller name and rating correctly', () => {
    // Given
    const offer = createOffer({
      seller: { id: 'S1', name: 'Custom Seller', rating: 4.9 },
    })

    // When
    const wrapper = mount(OfferRow, {
      props: { offer: offer },
    })

    // Then
    expect(wrapper.text()).toContain('Custom Seller')
    expect(wrapper.text()).toContain('4.9')
  })

  it('should format delivery date correctly in the UI', () => {
    // Given
    const offer = createOffer({
      delivery_date: '2026-03-20',
    })

    // When
    const wrapper = mount(OfferRow, {
      props: { offer: offer },
    })

    // Then
    // 2026-03-20 in ru-RU locale with month: 'short' -> expect "20" and "мар"
    const text = wrapper.text().toLowerCase()
    expect(text).toContain('20')
    expect(text).toContain('мар')
  })

  it('should render the price formatted with currency symbol', () => {
    // Given
    const offer = createOffer({
      price: { amount: 1250, currency: CurrencyCode.RUB },
    })

    // When
    const wrapper = mount(OfferRow, {
      props: { offer: offer },
    })

    // Then
    // ru-RU format for 1250 is "1 250" or "1 250 ₽"
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('250')
    expect(wrapper.text()).toContain('₽')
  })

  it('should render the TechIdBadge with the correct offer ID', () => {
    // Given
    const offer = createOffer({ id: 'UNIQUE-OFFER-ID' })

    // When
    const wrapper = mount(OfferRow, {
      props: { offer: offer },
    })

    // Then
    expect(wrapper.text()).toContain('UNIQUE-OFFER-ID')
  })
})
