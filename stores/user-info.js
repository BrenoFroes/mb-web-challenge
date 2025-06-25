import { reactive } from 'vue'

const store = reactive({
  step: 1,
  initial: {
    email: '',
    isLegalPerson: false,
  },
  personData: {
    name: '',
    cpf: '',
    birth: '',
    companyName: '',
    cnpj: '',
    foundingDate: '',
    phone: '',
    password: '',
    companyPhone: ''
  },
  acessKey: {
    password: '',
  }
})

export { store }
export default store