<template>
  <div>
    <div
      class="flex items-center justify-center bg-indigo-50 shadow p-2 w-60 mb-5"
    >
      <i :class="['fas', employeeIcon, 'mr-4']"></i>
      <span class="text-lg mr-4">{{ employee.name }}</span>
      <span
        >${{ employee.type.asignment }} <i class="fas fa-money-bill"></i
      ></span>
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
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { EmployeeType } from '~/models'
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
    const icons = new Map([
      [EMPLOYEE_TYPES.MANAGER, 'user-tie'],
      [EMPLOYEE_TYPES.DEVELOPER, 'laptop-code'],
      [EMPLOYEE_TYPES.TESTER, 'vials'],
    ])

    const employeeIcon = computed(
      () => `fa-${icons.get(props.employee.type.type)}`
    )

    return { employeeIcon }
  },
})
</script>
