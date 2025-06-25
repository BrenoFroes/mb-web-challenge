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
import { store } from '@stores/user-info.js';

defineOptions({
  name: "DefaultLayout",
});
</script>

<style lang="scss" scoped>
.template {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  max-width: 351px;
  max-height: 667px;
  margin: 0 auto;
  padding: 12px;
  border-radius: 4px;
}
.header {
  color: #000;
  margin: 0 auto 12px 0;
  &__step {
    &--number {
      color: var(--main-color);
    }
  }
}
</style>
