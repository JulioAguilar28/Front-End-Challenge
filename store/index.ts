import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'
import { Manager } from '~/models'

export const state = () => ({
  department: {
    manager: {
      name: '',
    } as Manager,
    total: 0,
  },
  id: 1,
  showAddForm: true,
  userSelectedToAddEmployee: {} as Manager | null,
})

export const getters = getterTree(state, {
  isThereMainManager: (state) => state.department.manager.name !== '',
})

export const mutations = mutationTree(state, {
  setInitDepartment(state, manager: any) {
    state.department.manager = manager
  },
  addEmployee(state, employeeToAdd) {
    if (state.userSelectedToAddEmployee) {
      state.id += 1
      employeeToAdd.id = state.id
      state.userSelectedToAddEmployee.nodes.unshift(employeeToAdd)
      state.userSelectedToAddEmployee = null
      state.showAddForm = false
    }
  },
  setShowAddForm(state, { show, manager }) {
    state.showAddForm = show
    state.userSelectedToAddEmployee = manager
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    initDepartment({ commit }, manager: any) {
      commit('setInitDepartment', manager)
      commit('setShowAddForm', false)
    },
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
