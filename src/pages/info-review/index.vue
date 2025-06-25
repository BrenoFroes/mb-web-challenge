<template>
    <div class="info-review">
        <h1 class="info-review__title">Revise suas informações</h1>
        <molecule-input
            id="mbEmailInput"
            type="email"
            label="Endereço de e-mail"
            v-model="formData.email"
            :errorMessage="errorMessage.email"
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
            v-model="formData.password"
            :errorMessage="errorMessage.password"
        />
        <atom-button
            class="info-review__button"
            :disabled="!isValidEmail || !isValidPassword || !isFormValid"
            @click="nextStep()"
        />
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { store } from '@stores/user-info.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeInput from '@/components/molecules/MoleculeInput.vue';
import { validateEmail, validatePassword } from '@/assets/utils/validations.js';
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
    if (newData.email) {
        store.initial.email = newData.email;
    }
    if (newData.password) {
        store.acessKey.password = newData.password;
    }
}, { deep: true });

const isValidEmail = computed(() => {
    const result = validateEmail(formData.value.email);
    errorMessage.value.email = result.errorMessage;
    return result.valid;
});

const isValidPassword = computed(() => {
    const result = validatePassword(formData.value.password);
    errorMessage.value.password = result.errorMessage;
    return result.valid;
});

const handleValidationForm = (isValid) => {
    isFormValid.value = isValid;
};

const feedFieldsFromStore = () => {
    formData.value.email = store.initial.email || '';
    formData.value.password = store.acessKey.password || '';
};

const nextStep = () => {
    store.step++;
};

feedFieldsFromStore();

</script>
<style lang="scss" scoped>
.info-review {
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

    &__button {
        margin-top: 12px;
    }

    &__legal,
    &__physical {
        width: 100%;
        height: auto;
    }
}
</style>