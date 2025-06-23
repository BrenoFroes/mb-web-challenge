<template>
  <div class="template">
    <div class="header">
      <span class="header__step">
        Etapa <span class="header__step--number">{{ store.step }}</span>
        de 4
      </span>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store } from '@stores/template-header.js'
defineOptions({
  name: "DefaultLayout",
});
</script>

<style lang="scss" scoped>
.template {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  max-width: 375px;
  margin: 0 auto;
}
.header {
  color: #000;
  &__step {
    &--number {
      color: #ff9900;
    }
  }
}
</style>
