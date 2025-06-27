<template>
    <div class="access-key">
        <h1 class="access-key__title">Senha de acesso</h1>
        <molecule-label-input
            id="mbPasswordInput"
            type="password"
            label="Sua senha"
            v-model="password"
            :errorMessage="errorMessage"
        />
        <div class="access-key__buttons">
            <atom-button
                class="info-review__button"
                modifier="outline"
                label="Voltar"
                @click="goBack"
            />
            <atom-button
                :disabled="!isValidPassword || !password"
                @click="goToNextPage"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { store } from '@stores/user-info.js';
import { useRouter } from '@/composables/useRouter.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeLabelInput from '@/components/molecules/MoleculeLabelInput.vue';
import { validatePassword } from '@/assets/utils/validations.js';

const router = useRouter();
const password = ref('');
const errorMessage = ref('');

const goBack = () => {
    router.push('/person-data');
};

const goToNextPage = () => {
    router.push('/info-review');
};

watch(password, (newValue) => {
    store.accessKey.password = newValue;
    updatePasswordError();
});

const isValidPassword = computed(() => {
    const result = validatePassword(password.value);
    return result.valid;
});

const updatePasswordError = () => {
    const result = validatePassword(password.value);
    errorMessage.value = result.errorMessage;
};

</script>
<style lang="scss" scoped>
.access-key {
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

    &__buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 8px;
        margin-top: 16px;
    }
}
</style>