import { reactive } from 'vue'

const store = reactive({
  step: 1,
  isLegalPerson: false,
})

export { store }
export default store