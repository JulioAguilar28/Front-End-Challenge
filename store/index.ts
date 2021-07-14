import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'

export const state = () => ({
  employees: [] as any[],
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  addEmployee(state, employee: any) {
    state.employees = [...state.employees, employee]
  },
})

export const actions = actionTree({ state, getters, mutations }, {})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
