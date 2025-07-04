<template>
    <div class="organism-legal-form">
        <h1 v-if="showTitle" class="organism-legal-form__title">Pessoa jurídica</h1>
        <molecule-label-input
            id="mbCompanyNameInput"
            label="Razão social"
            :disabled="disabled"
            v-model="formData.companyName"
            :error-message="errorMessages.companyName"
        />
        <molecule-label-input
            id="mbcnpjInput"
            label="CNPJ"
            :disabled="disabled"
            v-model="formData.cnpj"
            :error-message="errorMessages.cnpj"
        />
        <molecule-label-input
            id="mbBirthInput"
            label="Data de abertura"
            type="date"
            :disabled="disabled"
            v-model="formData.foundingDate"
            :error-message="errorMessages.foundingDate"
        />
        <molecule-label-input
            id="mbPhoneInput"
            label="Telefone"
            :disabled="disabled"
            v-model="formData.companyPhone"
            :error-message="errorMessages.companyPhone"
        />
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { store } from '@stores/user-info.js';
import MoleculeLabelInput from '@/components/molecules/MoleculeLabelInput.vue';
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

defineProps({
    showTitle: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const validateForm = () => {
    let allValid = true;
    
    for (const [field, validator] of Object.entries(validations)) {
        const value = formData.value[field];
        const result = validator(value);
        
        errorMessages.value[field] = result.errorMessage;
        
        if (!result.valid || value.length === 0) {
            allValid = false;
        }
    }
    
    emit('update:valid', allValid);
    return allValid;
};

watch(formData, () => {
    validateForm();
}, { deep: true, immediate: true });

watch(formData, (newData) => {
    Object.keys(newData).forEach(key => {
        let cleanKey = newData[key];
        if (key !== 'foundingDate') {
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

onMounted(() => {
    feedFieldsFromStore();
});

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