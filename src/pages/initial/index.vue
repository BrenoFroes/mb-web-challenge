<template>
    <div class="first-page">
        <h1 class="first-page__title">Seja bem vindo (a)</h1>
        <label class="first-page__label" for="mb-email-input">Endereço de e-mail</label>
        <input class="first-page__input" id="mb-email-input" type="email" placeholder="Digite seu e-mail" v-model="email" />
    </div>
</template>
<script setup>
import { ref } from 'vue';

const email = ref('');
</script>