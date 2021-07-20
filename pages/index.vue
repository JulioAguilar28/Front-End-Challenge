<template>
  <div class="mx-auto mt-8 w-5/6 main bg-gray-50 shadow p-5">
    <AddForm v-if="state.showAddForm" class="mb-10" />
    <div v-if="state.department.manager.name">
      <Employee :employee="state.department.manager" />
    </div>

    <div>Total: ${{ state.departmentTotalAccount }}</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  reactive,
  computed,
} from '@nuxtjs/composition-api'
import AddForm from '@/components/AddForm.vue'
import Employee from '@/components/Employee.vue'
import { Manager } from '~/models'
import { buildComponentContext } from '~/types/componentContex'

interface IndexState {
  total: number
  departmentTotalAccount: number
  department: any
}

export default defineComponent({
  components: { AddForm, Employee },
  layout: 'main',
  setup() {
    const context = buildComponentContext()
    const state: IndexState = reactive({
      total: 0,
      departmentTotalAccount: 0,
      department: computed(() => context.$accessor.department),
      showAddForm: computed(() => context.$accessor.showAddForm),
    })

    const getAmountHandler = () => {
      state.departmentTotalAccount = state.department.manager.name
        ? getAmount(state, state.department.manager)
        : 0
    }

    watch(state.department, getAmountHandler)

    return { state, getAmountHandler }
  },
})

const getAmount = (state: IndexState, manager: Manager): number => {
  let amount = 0
  if (manager.nodes) {
    amount = manager.type.asignment
    iterateAmount(state, manager)
    amount += state.total
  }
  state.total = 0
  return amount
}

const iterateAmount = (state: IndexState, manager: Manager) => {
  for (let i = 0; i < manager.nodes.length; i++) {
    state.total += manager.nodes[i].type.asignment
    if (manager.nodes[i].nodes) {
      iterateAmount(state, manager.nodes[i])
    }
  }
}
</script>

<style scoped>
.main {
  min-height: 500px;
}
</style>
