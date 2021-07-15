import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'
import { EmployeeType, Manager } from '~/models'

export const state = () => ({
  department: {
    manager: {
      id: '1',
      name: 'Manager A',
      type: {
        type: 'Manager',
        asignment: 300,
      } as EmployeeType,
      nodes: [
        {
          name: 'Manager B',
          type: {
            type: 'Manager',
            asignment: 300,
          } as EmployeeType,
          nodes: [
            {
              id: '2',
              name: 'Developer B',
              type: {
                type: 'Developer',
                asignment: 1000,
              } as EmployeeType,
            },
            {
              id: '3',
              name: 'Tester B',
              type: {
                type: 'Tester',
                asignment: 500,
              } as EmployeeType,
            },
          ],
        },
      ],
    } as Manager,
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
