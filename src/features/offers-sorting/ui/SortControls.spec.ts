import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SortControls from './SortControls.vue'

describe('SortControls', () => {
  it('should render sort buttons with correct labels', () => {
    // Given
    const wrapper = mount(SortControls, {
      props: { modelValue: 'price' }
    })
    
    // Then
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]!.text()).toBe('По цене')
    expect(buttons[1]!.text()).toBe('По доставке')
  })

  it('should highlight the active sort option based on modelValue', () => {
    // Given
    const wrapper = mount(SortControls, {
      props: { modelValue: 'delivery_date' }
    })
    
    // Then
    const buttons = wrapper.findAll('button')
    // Active button has bg-white class
    expect(buttons[0]!.classes()).not.toContain('bg-white')
    expect(buttons[1]!.classes()).toContain('bg-white')
  })

  it('should emit "update:modelValue" when an inactive button is clicked', async () => {
    // Given
    const wrapper = mount(SortControls, {
      props: { modelValue: 'price' }
    })
    
    // When
    const buttons = wrapper.findAll('button')
    await buttons[1]!.trigger('click')
    
    // Then
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['delivery_date'])
  })
})
