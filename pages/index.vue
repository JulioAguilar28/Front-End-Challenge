<template>
  <div class="container mx-auto mt-16 main w-5/6 bg-gray-50 shadow p-5">
    <AddForm v-if="!department.manager.name" class="mb-10" />
    <div v-if="department.manager.name">
      <Employee :employee="department.manager" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'
import AddForm from '@/components/AddForm.vue'
import Employee from '@/components/Employee.vue'
import { accessorType } from '~/store'

export default defineComponent({
  components: { AddForm, Employee },
  layout: 'main',
  setup() {
    const store = useStore<typeof accessorType>()
    const department = ref(store.state.department)

    return {
      department: department.value,
    }
  },
})
</script>

<style scoped>
.main {
  height: 600px;
}
</style>
