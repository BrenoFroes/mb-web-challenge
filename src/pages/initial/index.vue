<template>
    <div class="initial">
        <h1 class="initial__title">Seja bem vindo(a)</h1>
        <molecule-input
            id="mbEmailInput"
            type="email"
            label="Endereço de e-mail"
            v-model="email"
            :errorMessage="errorMessage"
        />
        <div class="initial__radios">
            <molecule-radio
                id="mbPhysicalPerson"
                type="radio"
                value="physical"
                label="Pessoa física"
                v-model="personType"
                @update="personType = $event"
            />
            <molecule-radio
                id="mbLegalPerson"
                type="radio"
                value="legal"
                label="Pessoa jurídica"
                v-model="personType"
                @update="personType = $event"
            />
        </div>
        <atom-button
            :disabled="!isValidEmail() || !personType || errorMessage.length > 0 || email.length <= 0"
            @click="nextStep()"
        />
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { store } from '@stores/user-info.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeInput from '@/components/molecules/MoleculeInput.vue';
import MoleculeRadio from '@/components/molecules/MoleculeRadio.vue';
import { validateEmail } from '@/assets/utils/validations.js';

const email = ref('');
const personType = ref('');
const errorMessage = ref('');

watch(email, (newValue) => {
    validateEmail(newValue);
    store.initial.email = newValue;
});

watch(personType, (newValue) => {
    store.initial.isLegalPerson = newValue === 'legal';
});

const isValidEmail = () => {
    const result = validateEmail(email.value);
    errorMessage.value = result.errorMessage;
    return result.valid;
};

const nextStep = () => {
    store.step++;
};

</script>
<style lang="scss" scoped>
.initial {
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