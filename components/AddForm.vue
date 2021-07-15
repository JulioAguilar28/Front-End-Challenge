<template>
  <form class="flex flex-col gap-2">
    <label class="flex shadow w-3/12 gap-3 p-2">
      <span>Name:</span>
      <input v-model="name" type="text" class="bg-transparent outline-none" />
    </label>
    <label class="flex justify-between shadow w-3/12 gap-3 p-2">
      <span>Employee type:</span>
      <select
        id="employee_type"
        v-model="selectedOption"
        class="bg-transparent"
      >
        <option
          v-for="option in options"
          :key="option.type"
          :value="option.type"
          :disabled="option.type !== 'Manager' && !department.manager.name"
        >
          {{ option.type }}
        </option>
      </select>
    </label>
    <label
      v-show="state.userSelectedToAddEmployee.name"
      class="flex justify-between shadow w-3/12 gap-3 p-2"
    >
      <span> Manager: {{ state.userSelectedToAddEmployee.name }} </span>
    </label>
    <button
      type="button"
      class="w-44 bg-gray-200 p-2 shadow"
      @click.prevent="onAddEmployee()"
    >
      {{ department.manager.name ? 'Add Employee' : 'Create Department' }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import { Employee, Manager } from '~/models'
import { accessorType } from '~/store'
import {
  EMPLOYEE_TYPES,
  getEmployeesType,
  getEmployeeTypeByType,
} from '~/utils'

export default defineComponent({
  setup() {
    const store = useStore<typeof accessorType>()
    const options = getEmployeesType()
    const selectedOption = ref('Manager')
    const name = ref('')

    const onAddEmployee = () => {
      let employeeToAdd

      // Init department with a manager
      if (!store.state.department.manager.name) {
        const manager = {
          id: 1,
          name: name.value,
          type: getEmployeeTypeByType(selectedOption.value),
          nodes: [],
        } as Manager
        store.app.$accessor.initDepartment(manager)
      }

      if (selectedOption.value === EMPLOYEE_TYPES.MANAGER) {
        employeeToAdd = {
          name: name.value,
          type: getEmployeeTypeByType(selectedOption.value),
          nodes: [],
        } as Manager
      } else {
        employeeToAdd = {
          name: name.value,
          type: getEmployeeTypeByType(selectedOption.value),
        } as Employee
      }

      store.app.$accessor.addEmployee(employeeToAdd)
    }

    return {
      options,
      selectedOption,
      onAddEmployee,
      name,
      department: store.state.department,
      state: store.state,
    }
  },
})
</script>

<style></style>
