<template>
    <div class="person-data">
        <div v-if="store.isLegalPerson" class="person-data__legal">
            <h1 class="person-data__title">Pessoa jurídica</h1>
        </div>
        <div v-else class="person-data__physical">
            <h1 class="person-data__title">Pessoa física</h1>
            <atom-input
                id="mbNameInput"
                label="Nome"
                v-model="name"
                :error-message="errorMessages.name"
                @update:modelValue="name = $event"
            />
            <atom-input
                id="mbCpfInput"
                label="CPF"
                v-model="cpf"
                :error-message="errorMessages.cpf"
                @update:modelValue="cpf = $event"
            />
            <atom-button
                :disabled="!isValidName(name) || !isValidCpf(cpf) || name.length <= 0 || cpf.length <= 0"
                @click="nextStep()"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { store } from '@stores/current-page.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import AtomInput from '@/components/atoms/AtomInput.vue';
import { validateName, validateCPF } from '@/assets/utils/validation.js';

const name = ref('');
const cpf = ref('');
const errorMessages = ref({
    name: '',
    cpf: '',
});

const isValidName = (name) => {
    const result = validateName(name);
    errorMessages.value.name = result.errorMessage;
    return result.valid;
};

const isValidCpf = (cpf) => {
    const result = validateCPF(cpf);
    errorMessages.value.cpf = result.errorMessage;
    return result.valid;
};

</script>

<style lang="scss" scoped>
.person-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100vh;

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