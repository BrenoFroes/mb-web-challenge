<template>
    <div class="info-review">
        <h1 class="info-review__title">Revise suas informações</h1>
        <molecule-input
            id="mbEmailInput"
            type="email"
            label="Endereço de e-mail"
            v-model="store.initial.email"
            :errorMessage="errorMessage"
        />
        <div v-if="store.initial.isLegalPerson" class="info-review__legal">
            <organism-legal-form stored @update:valid="handleValidationForm"/>
        </div>
        <div v-else class="info-review__physical">
            <organism-physical-form stored @update:valid="handleValidationForm"/>
        </div>
        <molecule-input
            id="mbPasswordInput"
            type="text"
            label="Sua senha"
            v-model="store.acessKey.password"
            :errorMessage="errorMessage"
        />
        <atom-button
            :disabled="!isValidEmail || !isValidPassword || !isFormValid"
            @click="nextStep()"
        />
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { store } from '@stores/user-info.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeInput from '@/components/molecules/MoleculeInput.vue';
import { validateEmail } from '@/assets/utils/validations.js';
import OrganismPhysicalForm from '@/components/organisms/OrganismPhysicalForm.vue';
import OrganismLegalForm from '@/components/organisms/OrganismLegalForm.vue';


const formData = ref({
    email: '',
    password: '',
});
const errorMessage = ref({
    email: '',
    password: '',
});
const isFormValid = ref(false);

watch(formData, (newData) => {
    Object.keys(newData).forEach(key => {
        const cleanKey = key.replace(/\D/g, '');
        if (key === 'email') {
            store.initial.email = newData[cleanKey];
        } else if (key === 'password') {
            store.acessKey.password = newData[cleanKey];
        }
    });
}, { deep: true });

const isValidEmail = () => {
    const result = validateEmail(email.value);
    errorMessage.value.email = result.errorMessage;
    return result.valid;
};

const isValidPassword = () => {
    const result = validatePassword(password.value);
    errorMessage.value.password = result.errorMessage;
    return result.valid;
};

const handleValidationForm = (isValid) => {
    isFormValid.value = isValid;
};

const nextStep = () => {
    store.step++;
};

</script>
<style lang="scss" scoped>
.info-review {
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

    &__legal,
    &__physical {
        width: 100%;
        height: auto;
    }
}
</style>