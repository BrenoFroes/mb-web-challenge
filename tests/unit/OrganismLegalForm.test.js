import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismLegalForm from '@/components/organisms/OrganismLegalForm.vue'

describe('OrganismLegalForm', () => {
  it('should render corectly', () => {
    const wrapper = mount(OrganismLegalForm, {
      props: { showTitle: true }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.organism-legal-form__title').text()).toBe('Pessoa jurídica')
  })
  
  it('should have all input fields', () => {
    const wrapper = mount(OrganismLegalForm)
    
    expect(wrapper.find('#mbCompanyNameInput').exists()).toBe(true)
    expect(wrapper.find('#mbcnpjInput').exists()).toBe(true)
    expect(wrapper.find('#mbBirthInput').exists()).toBe(true)
    expect(wrapper.find('#mbPhoneInput').exists()).toBe(true)
  })
  
  it('should hide title when stored prop is true', () => {
    const wrapper = mount(OrganismLegalForm, {
      props: { showTitle: false }
    })
    
    expect(wrapper.find('.organism-legal-form__title').exists()).toBe(false)
  })
  
  it('should emit update:valid event', async () => {
    const wrapper = mount(OrganismLegalForm)
    
    await wrapper.find('#mbCompanyNameInput').setValue('Froes Tech LTDA')
    
    expect(wrapper.emitted('update:valid')).toBeTruthy()
  })
  
  it('should fill form with company data', async () => {
    const wrapper = mount(OrganismLegalForm)
    
    await wrapper.find('#mbCompanyNameInput').setValue('Breno Desenvolvimento S.A.')
    await wrapper.find('#mbcnpjInput').setValue('11222333000181')
    await wrapper.find('#mbBirthInput').setValue('2020-03-15')
    await wrapper.find('#mbPhoneInput').setValue('11998877665')
    
    expect(wrapper.find('#mbCompanyNameInput').element.value).toBe('Breno Desenvolvimento S.A.')
    expect(wrapper.find('#mbBirthInput').element.value).toBe('2020-03-15')
  })
})