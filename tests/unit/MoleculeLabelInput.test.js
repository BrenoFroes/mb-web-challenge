import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeLabelInput from '@/components/molecules/MoleculeLabelInput.vue'

describe('MoleculeLabelInput', () => {
  it('should render corectly with required props', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'nome-completo',
        label: 'Nome Completo',
        modelValue: 'Breno Froes'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Nome Completo')
    expect(wrapper.find('input').element.value).toBe('Breno Froes')
    expect(wrapper.find('input').attributes('id')).toBe('nome-completo')
  })
  
  it('should emit update:modelValue when user types', async () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'email-usuario',
        label: 'Email',
        modelValue: ''
      }
    })
    
    const input = wrapper.find('input')
    await input.setValue('bfroes58@gmail.com')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['bfroes58@gmail.com'])
  })
  
  it('should show error message when errorMessage prop is provided', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'senha-input',
        label: 'Senha',
        modelValue: '123',
        errorMessage: 'Senha deve ter pelo menos 8 caracteres'
      }
    })
    
    const errorMessage = wrapper.find('.molecule-label-input__error-message')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('Senha deve ter pelo menos 8 caracteres')
    expect(wrapper.find('input').classes()).toContain('molecule-label-input__field--error')
  })
  
  it('should not show error message when errorMessage is empty', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'nome-input',
        label: 'Nome',
        modelValue: 'Breno',
        errorMessage: ''
      }
    })
    
    const errorMessage = wrapper.find('.molecule-label-input__error-message')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.isVisible()).toBe(false)
    expect(wrapper.find('input').classes()).not.toContain('molecule-label-input__field--error')
  })
  
  it('should apply CPF mask corectly', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'cpf-input',
        label: 'CPF',
        modelValue: '11144477735'
      }
    })
    
    expect(wrapper.find('input').element.value).toBe('111.444.777-35')
  })
  
  it('should apply CNPJ mask correctly', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'cnpj-empresa',
        label: 'CNPJ',
        modelValue: '11222333000181'
      }
    })
    
    expect(wrapper.find('input').element.value).toBe('11.222.333/0001-81')
  })
  
  it('should apply phone mask for 10 digits', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'telefone-fixo',
        label: 'Telefone',
        modelValue: '1133445566'
      }
    })
    
    expect(wrapper.find('input').element.value).toBe('(11) 3344-5566')
  })
  
  it('should apply phone mask for 11 digits (celular)', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'celular-breno',
        label: 'Telefone',
        modelValue: '11998877665'
      }
    })
    
    expect(wrapper.find('input').element.value).toBe('(11) 99887-7665')
  })
  
  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'campo-desabilitado',
        label: 'Campo Bloqueado',
        modelValue: 'Valor fixo',
        disabled: true
      }
    })
    
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })
  
  it('should handle diferent input types', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'data-nascimento',
        label: 'Data de Nascimento',
        type: 'date',
        modelValue: '1999-01-29'
      }
    })
    
    expect(wrapper.find('input').attributes('type')).toBe('date')
    expect(wrapper.find('input').element.value).toBe('1999-01-29')
  })
  
  it('should not apply mask when label doesnt match mask types', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'endereco-input',
        label: 'Endereço',
        modelValue: 'Rua das Flores, 123'
      }
    })
    
    expect(wrapper.find('input').element.value).toBe('Rua das Flores, 123')
  })
  
  it('should handle empty modelValue gracefuly', () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'campo-vazio',
        label: 'Campo Opcional',
        modelValue: ''
      }
    })
    
    expect(wrapper.find('input').element.value).toBe('')
  })
  
  it('should emit corect value when typing in CPF field', async () => {
    const wrapper = mount(MoleculeLabelInput, {
      props: {
        id: 'cpf-test',
        label: 'CPF',
        modelValue: ''
      }
    })
    
    const input = wrapper.find('input')
    await input.setValue('11144477735')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['11144477735'])
  })
})
