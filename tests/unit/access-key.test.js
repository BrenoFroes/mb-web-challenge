import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AccessKey from '@/pages/access-key/index.vue'

describe('AccessKey Page', () => {
  it('should render corectly', () => {
    const wrapper = mount(AccessKey)
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.access-key__title').text()).toBe('Senha de acesso')
  })
  
  it('should have password input field', () => {
    const wrapper = mount(AccessKey)
    
    expect(wrapper.find('#mbPasswordInput').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })
  
  it('should have both buttons', () => {
    const wrapper = mount(AccessKey)
    
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Voltar')
  })
  
  it('should disable submit button when password is weak', async () => {
    const wrapper = mount(AccessKey)
    
    await wrapper.find('#mbPasswordInput').setValue('12adadsa3')
    
    const submitButton = wrapper.findAll('button')[1]
    expect(submitButton.attributes('disabled')).toBeDefined()
  })
  
  it('should enable submit button with strong password', async () => {
    const wrapper = mount(AccessKey)
    
    await wrapper.find('#mbPasswordInput').setValue('dasdadas@123!Breno')
    
    const submitButton = wrapper.findAll('button')[1]
    expect(submitButton.attributes('disabled')).toBeUndefined()
  })
  
  it('should show error mesage for weak password', async () => {
    const wrapper = mount(AccessKey)
    
    await wrapper.find('#mbPasswordInput').setValue('fracaadaa')
    await wrapper.vm.$nextTick()
    
    const errorMessage = wrapper.find('.molecule-label-input__error-message')
    expect(errorMessage.isVisible()).toBe(true)
  })
})
