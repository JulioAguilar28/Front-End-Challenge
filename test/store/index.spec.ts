import { createLocalVue } from '@vue/test-utils'
import { useAccessor } from 'typed-vuex'
import Vuex from 'vuex'
import { Employee, Manager } from '~/models'
import { state, mutations, actions, getters } from '~/store'
import { EMPLOYEE_TYPES } from '~/utils'

const pattern = {
  state,
  mutations,
  actions,
  getters,
}

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(pattern)
const accessor = useAccessor(store, pattern)

store.app = {
  $accessor: accessor,
}

describe('Index Store', () => {
  describe('when add a new employee', () => {
    let userSelectedToAddEmployee: Manager
    let employeeToAdd: Employee

    beforeAll(() => {
      userSelectedToAddEmployee = {
        id: 1,
        name: 'Manager A',
        type: {
          type: EMPLOYEE_TYPES.MANAGER,
          asignment: 300,
        },
        nodes: [],
      }

      employeeToAdd = {
        id: 2,
        name: 'Developer A',
        type: {
          type: EMPLOYEE_TYPES.DEVELOPER,
          asignment: 1000,
        },
      }
      accessor.setInitDepartment(userSelectedToAddEmployee)
      accessor.setShowAddForm({
        show: true,
        manager: userSelectedToAddEmployee,
      })
      accessor.addEmployee(employeeToAdd)
    })

    test('should be added to user selected to add employee', () => {
      expect(userSelectedToAddEmployee?.nodes).toHaveLength(1)
    })

    test('should user selected to add employee be null', () => {
      expect(accessor.userSelectedToAddEmployee).toBeNull()
    })

    test('should add new employee form disappear', () => {
      expect(accessor.showAddForm).toBeFalsy()
    })
  })
})
