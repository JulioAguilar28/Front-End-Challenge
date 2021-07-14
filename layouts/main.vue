<template>
  <div class="bg-gray-100 w-screen h-screen">
    <TheHeader />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TheHeader from '@/components/TheHearder.vue'

export default defineComponent({
  components: { TheHeader },
  setup() {},
})
</script>

<style></style>
