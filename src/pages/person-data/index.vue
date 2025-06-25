<template>
    <div class="person-data">
        <div v-if="store.isLegalPerson" class="person-data__legal">
            <organism-legal-form @update:valid="handleValidationForm"/>
        </div>
        <div v-else class="person-data__physical">
            <organism-physical-form @update:valid="handleValidationForm"/>
        </div>
        <atom-button :disabled="!isFormValid" @click="nextStep" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { store } from '@stores/current-page.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import OrganismPhysicalForm from '@/components/organisms/OrganismPhysicalForm.vue';
import OrganismLegalForm from '@/components/organisms/OrganismLegalForm.vue';

const isFormValid = ref(false);

const handleValidationForm = (isValid) => {
    isFormValid.value = isValid;
};

const nextStep = () => {
    store.step++;
};

</script>