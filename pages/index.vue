<template>
  <div class="mx-auto mt-8 w-5/6 main bg-gray-50 shadow p-5">
    <AddForm v-if="state.showAddForm" class="mb-10" />
    <div v-if="department.manager.name">
      <Employee :employee="department.manager" />
    </div>

    <div>Total: ${{ departmentTotalAccount }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, ref, watch } from '@nuxtjs/composition-api'
import AddForm from '@/components/AddForm.vue'
import Employee from '@/components/Employee.vue'
import { accessorType } from '~/store'
import { Manager } from '~/models'

export default defineComponent({
  components: { AddForm, Employee },
  layout: 'main',
  setup() {
    const store = useStore<typeof accessorType>()
    const department = ref(store.state.department)
    const total = ref(0)
    const departmentTotalAccount = ref(0)

    const getAmount = (manager: Manager) => {
      let amount = 0
      if (manager.nodes) {
        amount = manager.type.asignment
        iterateAmount(manager)
        amount += total.value
      }
      total.value = 0
      return amount
    }

    const iterateAmount = (manager: Manager) => {
      for (let i = 0; i < manager.nodes.length; i++) {
        total.value += manager.nodes[i].type.asignment
        if (manager.nodes[i].nodes) {
          iterateAmount(manager.nodes[i])
        }
      }
    }

    watch(department.value, () => {
      if (department.value.manager.name) {
        departmentTotalAccount.value = getAmount(department.value.manager)
      } else {
        departmentTotalAccount.value = 0
      }
    })

    return {
      department,
      state: store.state,
      total,
      departmentTotalAccount,
    }
  },
})
</script>

<style scoped>
.main {
  min-height: 500px;
}
</style>
