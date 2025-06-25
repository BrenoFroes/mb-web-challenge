<template>
    <div class="organism-physical-form">
        <h1 class="organism-physical-form__title">Pessoa jurídica</h1>
        <molecule-input
            id="mbCompanyNameInput"
            label="Nome"
            v-model="formData.companyName"
            :error-message="errorMessages.companyName"
            @update:modelValue="companyName = $event"
        />
        <molecule-input
            id="mbcnpjInput"
            label="CNPJ"
            v-model="formData.cnpj"
            :error-message="errorMessages.cnpj"
            @update:modelValue="cnpj = $event"
        />
        <molecule-input
            id="mbBirthInput"
            label="Data de nascimento"
            type="date"
            v-model="formData.foundingDate"
            :error-message="errorMessages.foundingDate"
            @update:modelValue="foundingDate = $event"
        />
        <molecule-input
            id="mbPhoneInput"
            label="Telefone"
            v-model="formData.phone"
            :error-message="errorMessages.phone"
            @update:modelValue="phone = $event"
        />
    </div>
</template>
<script setup>
import { ref, computed, toRefs, watch } from 'vue';
import MoleculeInput from '@/components/molecules/MoleculeInput.vue';
import { validateCompanyName, validateCNPJ, validateFoundingDate, validatePhone } from '@/assets/utils/validations.js';

const formData = ref({
    companyName: '',
    cnpj: '',
    foundingDate: '',
    phone: ''
});
const { companyName, cnpj, foundingDate, phone } = toRefs(formData);

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

</script>

<style lang="scss" scoped>
.organism-physical-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    &__legal,
    &__physical {
        width: 100%;
        height: auto;
    }

    &__title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 16px;
    }
}
</style>