import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismPhysicalForm from '@/components/organisms/OrganismPhysicalForm.vue'

describe('OrganismPhysicalForm', () => {
  it('should render corectly', () => {
    const wrapper = mount(OrganismPhysicalForm)
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.organism-physical-form__title').text()).toBe('Pessoa física')
  })
  
  it('should have all input fields', () => {
    const wrapper = mount(OrganismPhysicalForm)
    
    expect(wrapper.find('#mbNameInput').exists()).toBe(true)
    expect(wrapper.find('#mbCpfInput').exists()).toBe(true)
    expect(wrapper.find('#mbBirthInput').exists()).toBe(true)
    expect(wrapper.find('#mbPhoneInput').exists()).toBe(true)
  })
  
  it('should hide title when stored prop is true', () => {
    const wrapper = mount(OrganismPhysicalForm, {
      props: { showTitle: false }
    })
    
    expect(wrapper.find('.organism-physical-form__title').exists()).toBe(false)
  })
  
  it('should emit update:valid event', async () => {
    const wrapper = mount(OrganismPhysicalForm)
    
    await wrapper.find('#mbNameInput').setValue('Breno Froes')
    
    expect(wrapper.emitted('update:valid')).toBeTruthy()
  })
  
  it('should fill form with user data', async () => {
    const wrapper = mount(OrganismPhysicalForm)
    
    await wrapper.find('#mbNameInput').setValue('Breno Froes')
    await wrapper.find('#mbCpfInput').setValue('11144477735')
    await wrapper.find('#mbBirthInput').setValue('1999-01-29')
    await wrapper.find('#mbPhoneInput').setValue('11998877665')
    
    expect(wrapper.find('#mbNameInput').element.value).toBe('Breno Froes')
    expect(wrapper.find('#mbBirthInput').element.value).toBe('1999-01-29')
  })
})