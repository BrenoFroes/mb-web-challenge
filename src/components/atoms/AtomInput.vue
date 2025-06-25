<template>
    <div class="atom-input">
        <label class="atom-input__label" :for="id">{{ label }}</label>
        <input
            :id="id"
            class="atom-input__field"
            :class="{ 'atom-input__field--error': hasError }"
            :type="type" 
            :value="maskValue(modelValue)" 
            @input="handleInput"
        />
        <span v-show="hasError" class="atom-input__error-message">
            {{ errorMessage }}
        </span>
    </div>
</template>
<script setup>
import { computed } from 'vue'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text'
    },
    errorMessage: {
        type: String,
        default: ''
    },
    modelValue: [String, Number, Boolean]
})

const handleInput = (event) => {
    emit('update:modelValue', event.target.value)
}

const hasError = computed(() => props.errorMessage && props.errorMessage.length > 0)

const maskValue = (value) => {
    if (props.label === 'CPF') {
        const cleanCPF = value.replace(/\D/g, '');
        return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
}

</script>

<style lang="scss" scoped>
.atom-input {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__label {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
    }

    &__field {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #000;
        border-radius: 4px;
        box-sizing: border-box;
    
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
        margin-top: 4px;
    }
}
</style>