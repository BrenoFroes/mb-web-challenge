<template>
    <div class="acess-key">
        <h1 class="acess-key__title">Senha de acesso</h1>
        <molecule-input
            id="mbPasswordInput"
            type="password"
            label="Sua senha"
            v-model="password"
            :errorMessage="errorMessage"
        />
        <atom-button
            :disabled="!isValidEmail(email) || !personType || errorMessage.length > 0 || email.length <= 0"
            @click="nextStep()"
        />
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { store } from '@stores/current-page.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeInput from '@/components/molecules/MoleculeInput.vue';
import { validateEmail } from '@/assets/utils/validations.js';

const password = ref('');

watch(email, (newValue) => {
    validateEmail(newValue);
});

const isValidEmail = (email) => {
    const result = validateEmail(email);
    errorMessage.value = result.errorMessage;
    return result.valid;
};

const nextStep = () => {
    store.step++;
};

</script>
<style lang="scss" scoped>
.acess-key {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100vh;

    &__title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 16px;
    }

    &__label {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
    }

    &__input {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #000;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 4px;

        &:focus {
            outline: none;
        }

        &--error {
            border-color: red;
            outline: none;
        }
    }

    &__error-message {
        color: red;
        font-size: 12px;
        margin-bottom: 0;
    }

    &__person-type {
        width: 100%;
        
        &-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
        }
    }

    &__radios {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 16px;
        width: 100%;
        margin: 16px 0;
    }
}
</style>