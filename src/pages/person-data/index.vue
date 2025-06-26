<template>
    <div class="person-data">
        <div v-if="store.initial.isLegalPerson" class="person-data__legal">
            <organism-legal-form @update:valid="handleValidationForm"/>
        </div>
        <div v-else class="person-data__physical">
            <organism-physical-form @update:valid="handleValidationForm"/>
        </div>
        <div class="person-data__buttons">
            <atom-button 
                modifier="outline" 
                label="Voltar"
                @click="store.step--" />
            <atom-button 
                :disabled="!isFormValid" 
                @click="store.step++" />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { store } from '@stores/user-info.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import OrganismPhysicalForm from '@/components/organisms/OrganismPhysicalForm.vue';
import OrganismLegalForm from '@/components/organisms/OrganismLegalForm.vue';

const isFormValid = ref(false);

const handleValidationForm = (isValid) => {
    isFormValid.value = isValid;
};

</script>
<style lang="scss" scoped>
.person-data {
    &__legal, &__physical {
        margin-bottom: 12px;
    }

    &__buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 8px
    }
}
</style>