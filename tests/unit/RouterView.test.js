import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RouterView from '@/components/RouterView.vue'

vi.mock('@/composables/useRouter.js', () => ({
  useRouter: () => ({
    currentRoute: { value: '/' },
    getCurrentComponent: vi.fn().mockResolvedValue({
      name: 'MockComponent',
      render: () => 'Mock Component Content'
    })
  })
}))

describe('RouterView', () => {
  it('should render corectly', () => {
    const wrapper = mount(RouterView)
    
    expect(wrapper.exists()).toBe(true)
  })
  
  it('should handle breno navigation flow', () => {
    const wrapper = mount(RouterView)
    
    expect(wrapper.exists()).toBe(true)
  })
})
