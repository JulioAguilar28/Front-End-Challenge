<template>
  <div class="container mx-auto mt-16 main w-5/6 bg-gray-50 shadow">
    <AddForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AddForm from '@/components/AddForm.vue'

export default defineComponent({
  components: { AddForm },
  layout: 'main',
  setup() {},
})
</script>

<style scoped>
.main {
  height: 600px;
}
</style>
