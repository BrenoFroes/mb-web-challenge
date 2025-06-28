import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from '@/layouts/default.vue'

vi.mock('@/composables/useRouter.js', () => ({
  useRouter: () => ({
    currentRoute: { value: '/' }
  })
}))

describe('DefaultLayout', () => {
  it('should render corectly', () => {
    const wrapper = mount(DefaultLayout)
    
    expect(wrapper.exists()).toBe(true)
  })
  
  it('should render slot content', () => {
    const wrapper = mount(DefaultLayout, {
      slots: {
        default: '<div class="test-content">Breno Layout Test</div>'
      }
    })
    
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Breno Layout Test')
  })
})
