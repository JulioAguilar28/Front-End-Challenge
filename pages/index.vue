<template>
  <div class="container mx-auto mt-16 main w-5/6 bg-gray-50 shadow">
    <AddForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useStore } from '@nuxtjs/composition-api'
import AddForm from '@/components/AddForm.vue'
import { accessorType } from '~/store'

export default defineComponent({
  components: { AddForm },
  layout: 'main',
  setup() {
    const store = useStore<typeof accessorType>()

    onMounted(() => {
      console.log(store.state.counter)
    })
  },
})
</script>

<style scoped>
.main {
  height: 600px;
}
</style>
