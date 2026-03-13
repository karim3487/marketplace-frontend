// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminProductForm from './AdminProductForm.vue'
import { CurrencyCode, type ProductCreate } from '@/shared/api/generated'
import { createProduct } from '@/shared/lib/test-factories'

describe('AdminProductForm', () => {
  it('should render correctly with default values', () => {
    // Given
    const wrapper = mount(AdminProductForm)
    
    // Then
    expect(wrapper.find('input[placeholder="Напр. Смартфон Galaxy S24"]').exists()).toBe(true)
    expect(wrapper.find('select').element.value).toBe(CurrencyCode.RUB)
  })

  it('should render correctly with initial data provided via props', () => {
    // Given
    const initialData = createProduct({
      id: '123',
      name: 'Test Product',
      price: { amount: 100, currency: CurrencyCode.USD }
    })
    
    // When
    const wrapper = mount(AdminProductForm, {
      props: { initialData }
    })
    
    // Then
    const nameInput = wrapper.find('input[type="text"]').element as HTMLInputElement
    expect(nameInput.value).toBe('Test Product')
    expect(wrapper.find('select').element.value).toBe(CurrencyCode.USD)
  })

  it('should emit "submit" event with the correct data when form is submitted', async () => {
    // Given
    const wrapper = mount(AdminProductForm)
    
    // When
    await wrapper.find('input[type="text"]').setValue('New Product')
    await wrapper.find('input[type="number"]').setValue(500)
    await wrapper.find('form').trigger('submit.prevent')
    
    // Then
    const submitEvents = wrapper.emitted('submit')
    expect(submitEvents).toBeTruthy()
    
    const emittedData = submitEvents![0]![0] as ProductCreate
    expect(emittedData.name).toBe('New Product')
    expect(emittedData.price.amount).toBe(500)
  })
})
