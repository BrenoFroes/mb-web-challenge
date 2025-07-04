<template>
    <div class="organism-physical-form">
        <h1 v-if="showTitle" class="organism-physical-form__title">Pessoa física</h1>
        <molecule-label-input
            id="mbNameInput"
            label="Nome"
            :disabled="disabled"
            v-model="formData.name"
            :error-message="errorMessages.name"
        />
        <molecule-label-input
            id="mbCpfInput"
            label="CPF"
            :disabled="disabled"
            v-model="formData.cpf"
            :error-message="errorMessages.cpf"
        />
        <molecule-label-input
            id="mbBirthInput"
            label="Data de nascimento"
            type="date"
            :disabled="disabled"
            v-model="formData.birthDate"
            :error-message="errorMessages.birthDate"
        />
        <molecule-label-input
            id="mbPhoneInput"
            label="Telefone"
            :disabled="disabled"
            v-model="formData.phone"
            :error-message="errorMessages.phone"
        />
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { store } from '@stores/user-info.js';
import MoleculeLabelInput from '@/components/molecules/MoleculeLabelInput.vue';
import { validateName, validateCPF, validateBirth, validatePhone } from '@/assets/utils/validations.js';

const formData = ref({
    name: '',
    cpf: '',
    birthDate: '',
    phone: ''
});

const errorMessages = ref({
    name: '',
    cpf: '',
    birthDate: '',
    phone: '',
});

const validations = {
    name: validateName,
    cpf: validateCPF,
    birthDate: validateBirth,
    phone: validatePhone
};

const emit = defineEmits(['update:valid'])

defineProps({
    stored: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    showTitle: {
        type: Boolean,
        default: true
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
        if (key !== 'birthDate') {
            cleanKey = newData[key].replace(/[^a-zA-Z0-9\s]/g, '');
        }
        store.personData[key] = cleanKey;
    });
}, { deep: true });

const feedFieldsFromStore = () => {
    formData.value.name = store.personData.name || '';
    formData.value.cpf = store.personData.cpf || '';
    formData.value.birthDate = store.personData.birthDate || '';
    formData.value.phone = store.personData.phone || '';
};

onMounted(() => {
    feedFieldsFromStore();
});
</script>

<style lang="scss" scoped>
.organism-physical-form {
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