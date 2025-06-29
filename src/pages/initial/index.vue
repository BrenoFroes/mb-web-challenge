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
            <div class="radio-group">
                <input
                    id="mbPhysicalPerson"
                    type="radio"
                    value="physical"
                    v-model="personType"
                    name="personType"
                />
                <label for="mbPhysicalPerson">Pessoa física</label>
            </div>
            <div class="radio-group">
                <input
                    id="mbLegalPerson"
                    type="radio"
                    value="legal"
                    v-model="personType"
                    name="personType"
                />
                <label for="mbLegalPerson">Pessoa jurídica</label>
            </div>
        </div>
        <atom-button
            :disabled="!isValidEmail || !email"
            @click="goToNextPage"
        />
    </div>
</template>
<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { store } from '@stores/user-info.js';
import { useRouter } from '@/composables/useRouter.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeLabelInput from '@/components/molecules/MoleculeLabelInput.vue';
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

const feedFieldsFromStore = () => {
    email.value = store.initial.email || '';
    personType.value = store.initial.isLegalPerson ? 'legal' : 'physical';
};

onMounted(() => {
    feedFieldsFromStore();
});

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

    .radio-group {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        cursor: pointer;
        
        input[type="radio"] {
            margin-right: 8px;
            width: 16px;
            height: 16px;
    
            &:checked {
                accent-color: #000;
            }
        }
        
        label {
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;
        }
    }
}

</style>