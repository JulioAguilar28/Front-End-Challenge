<template>
  <form class="flex flex-col gap-2 p-5">
    <label class="flex shadow w-3/12 gap-3 p-2">
      <span>Name:</span>
      <input type="text" class="bg-transparent outline-none" />
    </label>
    <label class="flex justify-between shadow w-3/12 gap-3 p-2">
      <span>Employee type:</span>
      <select
        id="employee_type"
        v-model="selectedOption"
        class="bg-transparent"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
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

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const options = ['Manager', 'QA Tester', 'Developer']
    const selectedOption = ref(options[0])

    const onAddEmployee = () => {}

    return {
      options,
      selectedOption,
      onAddEmployee,
    }
  },
})
</script>

<style></style>
