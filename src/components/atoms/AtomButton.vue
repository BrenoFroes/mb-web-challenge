<template>
    <button 
        class="atom-button" 
        :class="modifiedClass"
        :disabled="isDisabled" 
        @click="emit('click')">
        {{ label }}
    </button>
</template>
<script setup>
import { computed } from 'vue'
const emit = defineEmits(['click'])

const props = defineProps({
    label: {
        type: String,
        default: 'Continuar'
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    modifier: {
        type: String,
        default: ''
    }
})

const { label, isDisabled, modifier } = props

const modifiedClass = computed(() => {
    return modifier ? `atom-button--${modifier}` : ''
})
</script>

<style lang="scss" scoped>
.atom-button {
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
    margin-bottom: 12px;

    &--outline {
        border: 1px solid var(--main-color);
        background-color: transparent;
        color: var(--main-color);
    }

    &:hover {
        background-color:  var(--secondary-color);
    }

    &:hover:not(:disabled) {
        background-color: var(--secondary-color);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}
</style>