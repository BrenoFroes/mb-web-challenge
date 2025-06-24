<template>
    <div class="person-data">
        <div v-if="store.isLegalPerson">
            <h1 class="person-data__title">Pessoa jurídica</h1>
        </div>
        <div v-else>
            <h1 class="person-data__title">Pessoa física</h1>
        </div>
        <atom-input
            id="email"
            type="email"
            label="E-mail"
            v-model="email"
            @update:modelValue="email = $event"
        />
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { store } from '@stores/current-page.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import AtomInput from '@/components/atoms/AtomInput.vue';

const email = ref('');
</script>

<style lang="scss" scoped>
.person-data {
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