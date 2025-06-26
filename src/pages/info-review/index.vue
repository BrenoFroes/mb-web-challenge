<template>
    <div class="info-review">
        <h1 class="info-review__title">Revise suas informações</h1>
        <molecule-label-input
            id="mbEmailInput"
            :disabled="formData.successfull"
            type="email"
            label="Endereço de e-mail"
            v-model="formData.email"
            :errorMessage="errorMessage.email"/>
        <div v-if="store.initial.isLegalPerson" class="info-review__legal">
            <organism-legal-form 
                stored
                :disabled="formData.successfull"
                @update:valid="handleValidationForm"/>
        </div>
        <div v-else class="info-review__physical">
            <organism-physical-form 
                stored
                :disabled="formData.successfull"
                @update:valid="handleValidationForm"/>
        </div>
        <molecule-label-input
            id="mbPasswordInput"
            :disabled="formData.successfull"
            type="text"
            label="Sua senha"
            v-model="formData.password"
            :errorMessage="errorMessage.password"/>
        <span v-if="!formData.successfull" class="info-review__error-message">
            {{ errorMessage.final }}
        </span>
        <span v-else class="info-review__success-message">
            Dados enviados com sucesso!
        </span>
        <div 
            v-if="!formData.successfull"
            class="info-review__buttons">
            <atom-button
                class="info-review__button"
                modifier="outline"
                label="Voltar"
                @click="store.step--"/>
            <atom-button
                class="info-review__button"
                :disabled="!isValidEmail || !isValidPassword || !isFormValid || !formData.email || !formData.password"
                @click="sendData()"/>
        </div>
        <atom-button
            v-else
            class="info-review__button"
            label="Início"
            @click="returnToInitial()"/>
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { store } from '@stores/user-info.js';
import AtomButton from '@/components/atoms/AtomButton.vue';
import MoleculeLabelInput from '@/components/molecules/MoleculeLabelInput.vue';
import { validateEmail, validatePassword } from '@/assets/utils/validations.js';
import OrganismPhysicalForm from '@/components/organisms/OrganismPhysicalForm.vue';
import OrganismLegalForm from '@/components/organisms/OrganismLegalForm.vue';


const formData = ref({
    email: '',
    password: '',
    successfull: false,
});
const errorMessage = ref({
    email: '',
    password: '',
    final: '',
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
    return result.valid;
});

const isValidPassword = computed(() => {
    const result = validatePassword(formData.value.password);
    return result.valid;
});

const updateEmailError = () => {
    const result = validateEmail(formData.value.email);
    errorMessage.value.email = result.errorMessage;
};

const updatePasswordError = () => {
    const result = validatePassword(formData.value.password);
    errorMessage.value.password = result.errorMessage;
};

watch(() => formData.value.email, () => {
    updateEmailError();
}, { immediate: true });

watch(() => formData.value.password, () => {
    updatePasswordError();
}, { immediate: true });

const handleValidationForm = (isValid) => {
    isFormValid.value = isValid;
};

const feedFieldsFromStore = () => {
    formData.value.email = store.initial.email || '';
    formData.value.password = store.acessKey.password || '';
};

feedFieldsFromStore();

const sendData = async() => {
    let personData = {
        email: formData.value.email,
        password: formData.value.password,
        isLegalPerson: store.initial.isLegalPerson,
    };
    if (store.initial.isLegalPerson) {
        personData = {
            ...personData,
            companyName: store.personData.companyName,
            cnpj: store.personData.cnpj,
            foundingDate: store.personData.foundingDate,
            companyPhone: store.personData.companyPhone,
        };
    } else {
        personData = {
            ...personData,
            name: store.personData.name,
            cpf: store.personData.cpf,
            birthDate: store.personData.birthDate,
            phone: store.personData.phone,
        };
    }
    try {
        await fetch('http://localhost:3000/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personData),
        })
        formData.value.successfull = true;
    } catch (error) {
        if (error.response && error.response.status !== 200) {
            console.error('Error ao enviar dados:', error);
            errorMessage.value.final = `Erro ao enviar dados: ${error.statusText}. Por favor, tente novamente.`;
            return;
        }
        return;
    }
    store.initial.email = formData.value.email;
    store.acessKey.password = formData.value.password;
};

const returnToInitial = () => {
    store.step = 1;
    store.initial.email = '';
    store.initial.isLegalPerson = false;
    store.personData = {
        name: '',
        cpf: '',
        birth: '',
        companyName: '',
        cnpj: '',
        foundingDate: '',
        phone: '',
        password: '',
        companyPhone: ''
    };
    store.acessKey.password = '';
    formData.value.successfull = false;
    formData.value.email = '';
    formData.value.password = '';
    errorMessage.value.email = '';
    errorMessage.value.password = '';
    errorMessage.value.final = '';
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
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 16px;
    }

    &__legal,
    &__physical {
        width: 100%;
        height: auto;
    }


    &__buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 8px;
        margin-top: 16px;
    }

    &__error-message {
        color: red;
        font-size: 16px;
        margin: 8px 0 16px 0;
    }

    &__success-message {
        color: green;
        font-size: 16px;
        margin: 8px 0 16px 0;
    }
}
</style>