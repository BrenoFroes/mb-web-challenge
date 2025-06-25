<template>
    <div class="organism-legal-form">
        <h1 class="organism-legal-form__title">Pessoa jurídica</h1>        
        <molecule-input
            id="mbCompanyNameInput"
            label="Nome"
            v-model="formData.companyName"
            :error-message="errorMessages.companyName"
        />
        <molecule-input
            id="mbcnpjInput"
            label="CNPJ"
            v-model="formData.cnpj"
            :error-message="errorMessages.cnpj"
        />
        <molecule-input
            id="mbBirthInput"
            label="Data de fundação"
            type="date"
            v-model="formData.foundingDate"
            :error-message="errorMessages.foundingDate"
        />
        <molecule-input
            id="mbPhoneInput"
            label="Telefone"
            v-model="formData.phone"
            :error-message="errorMessages.phone"
        />
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { store } from '@stores/user-info.js';
import MoleculeInput from '@/components/molecules/MoleculeInput.vue';
import { validateCompanyName, validateCNPJ, validateFoundingDate, validatePhone } from '@/assets/utils/validations.js';

const formData = ref({
    companyName: '',
    cnpj: '',
    foundingDate: '',
    phone: ''
});

const errorMessages = ref({
    companyName: '',
    cnpj: '',
    foundingDate: '',
    phone: '',
});

const validations = {
    companyName: validateCompanyName,
    cnpj: validateCNPJ,
    foundingDate: validateFoundingDate,
    phone: validatePhone
};

const emit = defineEmits(['update:valid'])

const isFormValid = computed(() => {
    let allValid = true;
    
    for (const [field, validator] of Object.entries(validations)) {
        const value = formData.value[field];
        const result = validator(value);
        
        errorMessages.value[field] = result.errorMessage;
        
        if (!result.valid || value.length === 0) {
            allValid = false;
        }
    }
    return allValid;
});

watch(isFormValid, (valid) => {
    emit('update:valid', valid);
}, { immediate: true });

watch(formData, (newData) => {
    Object.keys(newData).forEach(key => {
        const cleanKey = key.replace(/\D/g, '');
        store.personData[key] = newData[cleanKey];
    });
}, { deep: true });

</script>

<style lang="scss" scoped>
.organism-legal-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    &__title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 16px;
    }
}
</style>