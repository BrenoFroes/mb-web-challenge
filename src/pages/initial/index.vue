<template>
    <div class="initial">
        <h1 class="initial__title">Seja bem vindo(a)</h1>
        <molecule-label-input
            id="mbEmailInput"
            type="email"
            label="Endereço de e-mail"
            v-model="email"
            :errorMessage="errorMessage"
        />
        <div class="initial__radios">
            <molecule-label-radio
                id="mbPhysicalPerson"
                type="radio"
                value="physical"
                label="Pessoa física"
                v-model="personType"
                @update="personType = $event"
            />
            <molecule-label-radio
                id="mbLegalPerson"
                type="radio"
                value="legal"
                label="Pessoa jurídica"
                v-model="personType"
                @update="personType = $event"
            />
        </div>
        <atom-button
            :disabled="!isValidEmail || !email"
            @click="goToNextPage"
        />
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { store } from '@stores/user-info.js';
import { useRouter } from '@/composables/useRouter.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeLabelInput from '@/components/molecules/MoleculeLabelInput.vue';
import MoleculeLabelRadio from '@/components/molecules/MoleculeLabelRadio.vue';
import { validateEmail } from '@/assets/utils/validations.js';

const router = useRouter();
const email = ref('');
const personType = ref('physical');
const errorMessage = ref('');

const goToNextPage = () => {
    router.push('/person-data');
};

watch(email, (newValue) => {
    store.initial.email = newValue;
    updateEmailError();
});

watch(personType, (newValue) => {
    store.initial.isLegalPerson = newValue === 'legal';
});

const isValidEmail = computed(() => {
    const result = validateEmail(email.value);
    return result.valid;
});

const updateEmailError = () => {
    const result = validateEmail(email.value);
    errorMessage.value = result.errorMessage;
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
        font-size: 30px;
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