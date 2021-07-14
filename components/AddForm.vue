<template>
  <form class="flex flex-col gap-2 p-5">
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
        >
          {{ option.type }}
        </option>
      </select>
    </label>
    <button
      type="button"
      class="w-32 bg-gray-200 p-2 shadow"
      @click.prevent="onAddEmployee()"
    >
      Add
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import { Employee, Manager } from '~/models'
import { accessorType } from '~/store'
import { getEmployeesType, getEmployeeTypeByType } from '~/utils'

export default defineComponent({
  setup() {
    const store = useStore<typeof accessorType>()
    const options = getEmployeesType()
    const selectedOption = ref('')
    const name = ref('')

    const onAddEmployee = () => {
      let employeeToAdd

      if (selectedOption.value === 'Manager') {
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

      store.commit('addEmployee', employeeToAdd)
    }

    return {
      options,
      selectedOption,
      onAddEmployee,
      name,
    }
  },
})
</script>

<style></style>
