import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Initial from '@/pages/initial/index.vue'

describe('Initial Page', () => {
  it('should render corectly', () => {
    const wrapper = mount(Initial)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.initial__title').text()).toBe('Seja bem vindo(a)')
  })
  
  it('should have email input field', () => {
    const wrapper = mount(Initial)
    
    expect(wrapper.find('#mbEmailInput').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
  })
  
  it('should have both radio options', () => {
    const wrapper = mount(Initial)
    
    expect(wrapper.find('#mbPhysicalPerson').exists()).toBe(true)
    expect(wrapper.find('#mbLegalPerson').exists()).toBe(true)
    expect(wrapper.find('label[for="mbPhysicalPerson"]').text()).toBe('Pessoa física')
    expect(wrapper.find('label[for="mbLegalPerson"]').text()).toBe('Pessoa jurídica')
  })
  
  it('should disable button when email is invalid', async () => {
    const wrapper = mount(Initial)
    
    await wrapper.find('#mbEmailInput').setValue('email-invalido')
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })
  
  it('should enable button with valid email', async () => {
    const wrapper = mount(Initial)
    await wrapper.find('#mbEmailInput').setValue('bfroes58@gmail.com')
    
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeUndefined()
  })
  
  it('should select pessoa fisica by default', () => {
    const wrapper = mount(Initial)
    
    const physicalRadio = wrapper.find('#mbPhysicalPerson')
    expect(physicalRadio.element.checked).toBe(true)
  })
  
  it('should allow changing to pessoa juridica', async () => {
    const wrapper = mount(Initial)
    const legalRadio = wrapper.find('#mbLegalPerson')
    await legalRadio.setChecked(true)
    
    expect(legalRadio.element.checked).toBe(true)
  })
  
  it('should show error mesage for invalid email', async () => {
    const wrapper = mount(Initial)
    
    await wrapper.find('#mbEmailInput').setValue('breno@')
    await wrapper.vm.$nextTick()
    const errorMessage = wrapper.find('.molecule-label-input__error-message')
    expect(errorMessage.isVisible()).toBe(true)
  })
  
  it('should accept brenos email adress', async () => {
    const wrapper = mount(Initial)
    
    await wrapper.find('#mbEmailInput').setValue('bfroes58@gmail.com')
    expect(wrapper.find('#mbEmailInput').element.value).toBe('bfroes58@gmail.com')
  })
})
