<template>
  <div>
    <div class="flex gap-7">
      <div
        class="
          flex
          items-center
          justify-center
          bg-indigo-50
          shadow
          p-2
          w-80
          mb-5
        "
      >
        <i :class="['fas', employeeIcon, 'mr-4']"></i>
        <span class="text-lg mr-4">{{ employee.name }}({{ employee.id }})</span>
        <span
          >${{ employee.type.asignment }} <i class="fas fa-money-bill"></i
        ></span>
      </div>
      <i
        v-if="employee.nodes"
        class="fas fa-plus-circle mt-3"
        @click="setShowForm()"
      ></i>
    </div>

    <div v-if="employee.nodes" class="nodes ml-12">
      <Employee
        v-for="employeeNode in employee.nodes"
        :key="employeeNode.id"
        :employee="employeeNode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'
import { EmployeeType } from '~/models'
import { accessorType } from '~/store'
import { EMPLOYEE_TYPES } from '~/utils'

export default defineComponent({
  name: 'Employee',
  props: {
    employee: {
      type: Object,
      default() {
        return {
          name: 'Julio',
          type: {
            type: EMPLOYEE_TYPES.MANAGER,
            asignment: 0,
          } as EmployeeType,
        }
      },
    },
  },
  setup(props: any) {
    const store = useStore<typeof accessorType>()

    const icons = new Map([
      [EMPLOYEE_TYPES.MANAGER, 'user-tie'],
      [EMPLOYEE_TYPES.DEVELOPER, 'laptop-code'],
      [EMPLOYEE_TYPES.TESTER, 'vials'],
    ])

    const employeeIcon = computed(
      () => `fa-${icons.get(props.employee.type.type)}`
    )

    const setShowForm = () => {
      store.app.$accessor.setShowAddForm({
        show: true,
        manager: props.employee,
      })
    }

    return { employeeIcon, setShowForm }
  },
})
</script>
