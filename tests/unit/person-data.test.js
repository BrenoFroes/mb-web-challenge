import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PersonData from '@/pages/person-data/index.vue'
import { store } from '@stores/user-info.js'

describe('PersonData Page', () => {
  beforeEach(() => {
    store.initial.isLegalPerson = false
  })

  it('should render corectly', () => {
    const wrapper = mount(PersonData)
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.person-data').exists()).toBe(true)
  })
  
  it('should show physical form for person fisica', () => {
    store.initial.isLegalPerson = false
    const wrapper = mount(PersonData)
    
    expect(wrapper.find('.person-data__physical').exists()).toBe(true)
    expect(wrapper.find('.person-data__legal').exists()).toBe(false)
  })
  
  it('should show legal form for person juridica', () => {
    store.initial.isLegalPerson = true
    const wrapper = mount(PersonData)
    
    expect(wrapper.find('.person-data__legal').exists()).toBe(true)
    expect(wrapper.find('.person-data__physical').exists()).toBe(false)
  })
  
  it('should have both navigation buttons', () => {
    const wrapper = mount(PersonData)
    
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Voltar')
  })
  
  it('should disable continue button when form is invalid', () => {
    const wrapper = mount(PersonData)
    
    const continueButton = wrapper.findAll('button')[1]
    expect(continueButton.attributes('disabled')).toBeDefined()
  })
  
  it('should enable continue button when form becomes valid', async () => {
    const wrapper = mount(PersonData)
    
    await wrapper.vm.handleValidationForm(true)
    await wrapper.vm.$nextTick()
    
    const continueButton = wrapper.findAll('button')[1]
    expect(continueButton.attributes('disabled')).toBeUndefined()
  })
  
  it('should fill physical form with breno data', async () => {
    store.initial.isLegalPerson = false
    const wrapper = mount(PersonData)
    
    const nameInput = wrapper.find('#mbNameInput')
    const cpfInput = wrapper.find('#mbCpfInput')
    
    await nameInput.setValue('Breno Froes')
    await cpfInput.setValue('11144477735')
    
    expect(nameInput.element.value).toBe('Breno Froes')
  })
})
