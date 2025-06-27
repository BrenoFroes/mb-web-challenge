<template>
  <component :is="currentComponent" v-if="currentComponent" />
  <div v-else class="router-loading">
    Carregando...
  </div>
</template>

<script setup>
import { shallowRef, watch, onMounted } from 'vue'
import { useRouter } from '@/composables/useRouter.js'

const router = useRouter()
const currentComponent = shallowRef(null)

const loadCurrentComponent = async () => {
  try {
    currentComponent.value = await router.getCurrentComponent()
  } catch (error) {
    console.error('Erro ao carregar esse componente', error)
    currentComponent.value = null
  }
}

watch(() => router.currentRoute.value, () => {
  loadCurrentComponent()
}, { immediate: true })

onMounted(() => {
  loadCurrentComponent()
})
</script>

<style scoped>
.router-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666;
}
</style>
