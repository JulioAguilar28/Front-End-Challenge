import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'
import { Manager } from '~/models'

export const state = () => ({
  department: {
    manager: {} as Manager,
  },
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  initDepartment(state, manager: Manager) {
    state.department.manager = manager
  },
})

export const actions = actionTree({ state, getters, mutations }, {})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
