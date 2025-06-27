import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomButton from '@/components/atoms/AtomButton.vue'

describe('AtomButton', () => {
  it('renders properly', () => {
    const wrapper = mount(AtomButton, {
      props: {
        label: 'Test Button'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Button')
  })
  
  it('emits click event when clicked', async () => {
    const wrapper = mount(AtomButton, {
      props: {
        label: 'Click Me'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
