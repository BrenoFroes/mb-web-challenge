<template>
    <div class="first-page">
        <h1 class="first-page__title">Seja bem vindo(a)</h1>
        <label class="first-page__label" for="mb-email-input">Endereço de e-mail</label>
        <input 
            :class="{ 'first-page__input--error': !isValidEmail(email) }"
            class="first-page__input" id="mb-email-input" type="email" v-model="email" />
        <span v-show="shouldShowError" class="first-page__error-message">
            {{ errorMessage }}
        </span>
        <div class="first-page__radios">
            <div class="first-page__radio-group">
                <input 
                    type="radio" 
                    id="mb-physical-person" 
                    name="person-type" 
                    value="physical" 
                    v-model="personType"
                />
                <label for="mb-physical-person">Pessoa física</label>
            </div>
            
            <div class="first-page__radio-group">
                <input 
                    type="radio" 
                    id="mb-legal-person" 
                    name="person-type" 
                    value="legal" 
                    v-model="personType"
                />
                <label for="mb-legal-person">Pessoa jurídica</label>
            </div>
        </div>
        <button class="first-page__button" @click="$router.push('/person-data')">
            Continuar
        </button>
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { store } from '@stores/current-page.js';

const email = ref('');
const personType = ref('');
const errorMessage = ref('');

watch(personType, (newValue) => {
    store.isLegalPerson = newValue === 'juridica';
});

const isValidEmail = (email) => {
    if (!email || email.trim() === '') return true;

    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(( email.length < 5 || email.length > 50) && email !== null) {
        errorMessage.value = 'O e-mail deve ter entre 5 e 50 caracteres';
        return false;
    }
    if (!isValidFormat) {
        errorMessage.value = 'Formato de e-mail inválido';
        return false;
    }
    return true;
};

const shouldShowError = computed(() => {
    return email.value && email.value.trim() !== '' && !isValidEmail(email.value);
});

</script>
<style lang="scss" scoped>
.first-page {
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
        margin-top: 16px;
    }

    &__radio-group {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        
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

    &__button {
        width: 100%;
        padding: 12px;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        background-color: var(--main-color);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color:  var(--secondary-color);
        }
    }
}
</style>