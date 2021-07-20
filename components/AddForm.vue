<template>
  <form class="flex flex-col gap-2">
    <label class="flex shadow w-3/12 gap-3 p-2">
      <span>Name:</span>
      <input
        v-model="state.name"
        type="text"
        class="bg-transparent outline-none"
      />
    </label>
    <label class="flex justify-between shadow w-3/12 gap-3 p-2">
      <span>Employee type:</span>
      <select
        id="employee_type"
        v-model="state.selectedOption"
        class="bg-transparent"
      >
        <option
          v-for="option in state.options"
          :key="option.type"
          :value="option.type"
          :disabled="option.type !== 'Manager' && !state.isThereMainManager"
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
      @click.prevent="addEmployeeHandler()"
    >
      {{ state.isThereMainManager ? 'Add Employee' : 'Create Department' }}
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@nuxtjs/composition-api'
import { Employee, EmployeeType, Manager } from '~/models'
import {
  EMPLOYEE_TYPES,
  getEmployeesType,
  getEmployeeTypeByType,
} from '~/utils'
import ComponentContext, {
  buildComponentContext,
} from '~/types/componentContex'

interface AddFormState {
  selectedOption: string
  name: string
  options: EmployeeType[]
  isThereMainManager: boolean
  userSelectedToAddEmployee: object | null
}

export default defineComponent({
  setup(_props, _setupContext) {
    const context = buildComponentContext()

    const state: AddFormState = reactive({
      selectedOption: 'Manager',
      name: '',
      options: getEmployeesType(),
      isThereMainManager: computed(() => context.$accessor.isThereMainManager),
      userSelectedToAddEmployee: computed(
        () => context.$accessor.userSelectedToAddEmployee
      ),
    })

    const addEmployeeHandler = () => {
      addEmployee(state, context)
    }

    return {
      state,
      addEmployeeHandler,
    }
  },
})

const addEmployee = (state: AddFormState, context: ComponentContext) => {
  let employeeToAdd

  // Init department with a manager
  if (!context.$accessor.department.manager.name) {
    const manager: Manager = {
      id: 1,
      name: state.name,
      type: getEmployeeTypeByType(state.selectedOption),
      nodes: [],
    }
    context.$accessor.initDepartment(manager)
    return
  }

  if (state.selectedOption === EMPLOYEE_TYPES.MANAGER) {
    employeeToAdd = {
      name: state.name,
      type: getEmployeeTypeByType(state.selectedOption),
      nodes: [],
    } as Manager
  } else {
    employeeToAdd = {
      name: state.name,
      type: getEmployeeTypeByType(state.selectedOption),
    } as Employee
  }

  context.$accessor.addEmployee(employeeToAdd)
}
</script>

<style></style>
