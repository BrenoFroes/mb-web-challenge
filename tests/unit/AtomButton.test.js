import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomButton from '@/components/atoms/AtomButton.vue'

describe('AtomButton', () => {
  it('should render corectly with label', () => {
    const wrapper = mount(AtomButton, {
      props: {
        label: 'Entrar como Breno'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Entrar como Breno')
  })
  
  it('should render with default label when no props', () => {
    const wrapper = mount(AtomButton)
    
    expect(wrapper.text()).toContain('Continuar')
  })
  
  it('should emit click event when cliked', async () => {
    const wrapper = mount(AtomButton, {
      props: {
        label: 'Finalizar Cadastro'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })
  
  it('should be disabled when isDisabled prop is true', () => {
    const wrapper = mount(AtomButton, {
      props: {
        label: 'Salvar Dados',
        isDisabled: true
      }
    })
    
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('atom-button')
  })
  
  it('should apply modifier class when modifier prop is provided', () => {
    const wrapper = mount(AtomButton, {
      props: {
        label: 'Voltar para Login',
        modifier: 'outline'
      }
    })
    
    expect(wrapper.classes()).toContain('atom-button--outline')
  })
  
  it('should not emit click when button is disbled', async () => {
    const wrapper = mount(AtomButton, {
      props: {
        label: 'Confirmar',
        isDisabled: true
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
  
  it('should handle multiple clicks corectly', async () => {
    const wrapper = mount(AtomButton, {
      props: {
        label: 'Enviar Email para bfroes58@gmail.com'
      }
    })
    
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    
    expect(wrapper.emitted().click).toHaveLength(3)
  })
})
