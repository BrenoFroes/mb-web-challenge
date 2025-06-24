<template>
  <DefaultLayout>
    <component :is="currentPage" />
  </DefaultLayout>
</template>

<script setup>

import { computed } from 'vue'
import DefaultLayout from '@/layouts/default.vue'
import InitialPage from '@/pages/initial/index.vue'
import PersonDataPage from '@/pages/person-data/index.vue'
import InfoReviewPage from '@/pages/info-review/index.vue'
import AcessKey from '@/pages/acess-key/index.vue'
import { store } from '@stores/current-page.js'

const currentPage = computed(() => {
  switch (store.step) {
    case 1:
      return InitialPage;
    case 2:
      return PersonDataPage;
    case 3:
      return AcessKey;
    case 4:
      return InfoReviewPage;
    default:
      return InitialPage;
  }
})
</script>