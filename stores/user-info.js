import { reactive } from 'vue'

const store = reactive({
  initial: {
    email: '',
    isLegalPerson: false,
  },
  personData: {
    name: '',
    cpf: '',
    birthDate: '',
    companyName: '',
    cnpj: '',
    foundingDate: '',
    phone: '',
    password: '',
    companyPhone: ''
  },
  accessKey: {
    password: '',
  }
})

export { store }
export default store