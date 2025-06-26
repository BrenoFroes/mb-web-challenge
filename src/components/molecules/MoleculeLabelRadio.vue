<template>
    <div class="atom-radio">
        <input
            :id="id"
            class="atom-radio__field"
            type="radio" 
            :value="value" 
            v-model="inputValue"
            @change="emit('update:modelValue', value)"
        />
        <label class="atom-radio__label" :for="id">{{ label }}</label>
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
        default: 'Continuar'
    },
    value: {
        type: String,
        required: true
    },
    modelValue: [String, Number, Boolean]
})

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const { label, id, value } = props
</script>

<style lang="scss" scoped>
.atom-radio {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    cursor: pointer;
    
    input[type="radio"] {
        margin-right: 8px;
        width: 16px;
        height: 16px;

        &:checked {
            accent-color: #000;
        }
    }
    
    label {
        font-size: 18px;
        font-weight: 500;
    }
}
</style>