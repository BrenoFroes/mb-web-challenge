<template>
    <div class="acess-key">
        <h1 class="acess-key__title">Senha de acesso</h1>
        <molecule-label-input
            id="mbPasswordInput"
            type="password"
            label="Sua senha"
            v-model="password"
            :errorMessage="errorMessage"
        />
        <atom-button
            :disabled="!isValidPassword"
            @click="nextStep()"
        />
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { store } from '@stores/user-info.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeLabelInput from '@/components/molecules/MoleculeLabelInput.vue';
import { validatePassword } from '@/assets/utils/validations.js';

const password = ref('');
const errorMessage = ref('');

watch(password, (newValue) => {
    validatePassword(newValue);
    store.acessKey.password = newValue;
});

const isValidPassword = computed(() => {
    const result = validatePassword(password.value);
    errorMessage.value = result.errorMessage;
    return result.valid;
});

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
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 16px;
    }
}
</style>