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
            :disabled="!isValidPassword(password)"
            @click="nextStep()"
        />
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { store } from '@stores/user-info.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeInput from '@/components/molecules/MoleculeInput.vue';
import { validatePassword } from '@/assets/utils/validations.js';

const password = ref('');
const errorMessage = ref('');

watch(password, (newValue) => {
    isValidPassword(newValue);
    store.acessKey.password = newValue;
});

const isValidPassword = (password) => {
    const result = validatePassword(password);
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
}
</style>