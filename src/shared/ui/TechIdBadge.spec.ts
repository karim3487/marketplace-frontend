import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TechIdBadge from './TechIdBadge.vue'

describe('TechIdBadge', () => {
  it('should display the provided ID', () => {
    // Given
    const testId = 'PROD-123'
    
    // When
    const wrapper = mount(TechIdBadge, {
      props: { id: testId }
    })
    
    // Then
    expect(wrapper.text()).toContain(testId)
  })

  describe('icon visibility', () => {
    it('should show the icon by default', () => {
      // When
      const wrapper = mount(TechIdBadge, {
        props: { id: 'TEST-ID' }
      })
      
      // Then
      expect(wrapper.find('svg').exists()).toBe(true)
    })

    it('should hide the icon when showIcon is false', () => {
      // When
      const wrapper = mount(TechIdBadge, {
        props: { id: 'TEST-ID', showIcon: false }
      })
      
      // Then
      expect(wrapper.find('svg').exists()).toBe(false)
    })
  })

  it('should stop click event propagation', async () => {
    // Given
    const parentClicked = { value: false }
    const Parent = {
      template: '<div @click="clicked.value = true"><slot /></div>',
      props: ['clicked']
    }
    
    const wrapper = mount(Parent, {
      props: { clicked: parentClicked },
      slots: {
        default: '<tech-id-badge id="TEST-ID" />'
      },
      global: {
        components: { TechIdBadge },
        renderStubDefaultSlot: true
      }
    })

    // When
    const badge = wrapper.findComponent(TechIdBadge)
    await badge.trigger('click')
    
    // Then
    expect(parentClicked.value).toBe(false)
  })
})
