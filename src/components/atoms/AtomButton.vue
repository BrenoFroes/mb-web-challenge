<template>
    <button class="atom-button" :disabled="isDisabled" @click="emit('click')">
        {{ label }}
    </button>
</template>
<script setup>
const emit = defineEmits(['click'])

const props = defineProps({
    label: {
        type: String,
        default: 'Continuar'
    },
    isDisabled: {
        type: Boolean,
        default: false
    }
})

const { label, isDisabled } = props
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