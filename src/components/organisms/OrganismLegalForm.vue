<template>
    <div class="organism-legal-form">
        <h1 v-if="!stored" class="organism-legal-form__title">Pessoa jurídica</h1>        
        <molecule-input
            id="mbCompanyNameInput"
            label="Razão social"
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
            v-model="formData.companyPhone"
            :error-message="errorMessages.companyPhone"
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
    companyPhone: ''
});

const errorMessages = ref({
    companyName: '',
    cnpj: '',
    foundingDate: '',
    companyPhone: '',
});

const validations = {
    companyName: validateCompanyName,
    cnpj: validateCNPJ,
    foundingDate: validateFoundingDate,
    companyPhone: validatePhone
};

const emit = defineEmits(['update:valid'])

const props = defineProps({
    stored: {
        type: Boolean,
        default: false
    }
});

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
        let cleanKey = newData[key];
        if (key !== 'foundingDate') {
            // permite somente letras, numeros e espacos
            cleanKey = newData[key].replace(/[^a-zA-Z0-9\s]/g, '');
        }
        store.personData[key] = cleanKey;
    });
}, { deep: true });

const feedFieldsFromStore = () => {
    formData.value.companyName = store.personData.companyName || '';
    formData.value.cnpj = store.personData.cnpj || '';
    formData.value.foundingDate = store.personData.foundingDate || '';
    formData.value.companyPhone = store.personData.companyPhone || '';
};

if (props.stored) {
    feedFieldsFromStore();
}

</script>

<style lang="scss" scoped>
.organism-legal-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: auto;

    &__title {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 16px;
    }
}
</style>