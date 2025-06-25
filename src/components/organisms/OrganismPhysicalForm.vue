<template>
    <div class="organism-physical-form">
        <h1 class="organism-physical-form__title">Pessoa física</h1>
        <molecule-input
            id="mbNameInput"
            label="Nome"
            v-model="formData.name"
            :error-message="errorMessages.name"
            @update:modelValue="name = $event"
            
        />
        <molecule-input
            id="mbCpfInput"
            label="CPF"
            v-model="formData.cpf"
            :error-message="errorMessages.cpf"
            @update:modelValue="cpf = $event"
        />
        <molecule-input
            id="mbBirthInput"
            label="Data de nascimento"
            type="date"
            v-model="formData.birthDate"
            :error-message="errorMessages.birthDate"
            @update:modelValue="birthDate = $event"
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