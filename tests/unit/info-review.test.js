import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoReview from '@/pages/info-review/index.vue'
import { store } from '@stores/user-info.js'

describe('InfoReview Page', () => {
  beforeEach(() => {
    store.initial.isLegalPerson = false
    store.initial.email = 'bfroes58@gmail.com'
    store.personData.name = 'Breno Froes'
    store.personData.cpf = '11144477735'
    store.accessKey.password = 'MinhaSenh@123!'
  })

  it('should render corectly', () => {
    const wrapper = mount(InfoReview)
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.info-review__title').text()).toBe('Revise suas informações')
  })
  
  it('should show physical form for pessoa fisica', () => {
    const wrapper = mount(InfoReview)
    
    expect(wrapper.find('.info-review__physical').exists()).toBe(true)
    expect(wrapper.find('.info-review__legal').exists()).toBe(false)
  })
  
  it('should show legal form for pessoa juridica', () => {
    store.initial.isLegalPerson = true
    const wrapper = mount(InfoReview)
    expect(wrapper.find('.info-review__legal').exists()).toBe(true)
    expect(wrapper.find('.info-review__physical').exists()).toBe(false)
  })
  
  it('should have all input fields', () => {
    const wrapper = mount(InfoReview)
    
    expect(wrapper.find('#mbEmailInput').exists()).toBe(true)
    expect(wrapper.find('#mbPasswordInput').exists()).toBe(true)
    expect(wrapper.find('#mbNameInput').exists()).toBe(true)
  })
  
  it('should pre-fill with brenos data', () => {
    const wrapper = mount(InfoReview)
    expect(wrapper.find('#mbEmailInput').element.value).toBe('bfroes58@gmail.com')
    expect(wrapper.find('#mbNameInput').element.value).toBe('Breno Froes')
  })
  
  it('should have navigation buttons when not submited', () => {
    const wrapper = mount(InfoReview)
    
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(1)
    expect(buttons[0].text()).toBe('Voltar')
  })
  
  it('should disable submit button when form invalid', () => {
    store.initial.email = ''
    const wrapper = mount(InfoReview)
    
    const submitButton = wrapper.findAll('button')[1]
    expect(submitButton.attributes('disabled')).toBeDefined()
  })
  
  it('should show sucess message after submission', async () => {
    const wrapper = mount(InfoReview)
    
    wrapper.vm.formData.successfull = true
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.info-review__success-message').text()).toBe('Dados enviados com sucesso!')
  })
  
  it('should disable all fields after sucess', async () => {
    const wrapper = mount(InfoReview)
    wrapper.vm.formData.successfull = true
    await wrapper.vm.$nextTick()
    
    const inputs = wrapper.findAll('input')
    inputs.forEach(input => {
      expect(input.attributes('disabled')).toBeDefined()
    })
  })
})
