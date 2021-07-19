import { jest } from '@jest/globals'
import Vuex from 'vuex'
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
// @ts-ignore
import Employee from '@/components/Employee.vue'
import { EMPLOYEE_TYPES } from '~/utils'
import { EmployeeType, Manager } from '~/models'

const localVue = createLocalVue()
localVue.use(Vuex)

const mockStore = () => ({
  state: {},
  setShowAddForm: jest.fn(),
})

describe('Employee Component', () => {
  let wrapper: Wrapper<Employee>
  let context: any

  beforeAll(() => {
    context = {
      $accessor: {},
    }
    context.$accessor = mockStore()
    localVue.prototype.$nuxt = { context }
  })

  test.each([
    [EMPLOYEE_TYPES.MANAGER, 'user-tie'],
    [EMPLOYEE_TYPES.DEVELOPER, 'laptop-code'],
    [EMPLOYEE_TYPES.TESTER, 'vials'],
  ])('show the correct icon for %s type', (userType: string, icon: string) => {
    // Arrange
    wrapper = shallowMount(Employee, {
      propsData: {
        employee: {
          name: 'Manager A',
          type: {
            type: userType,
            asignment: 300,
          } as EmployeeType,
          nodes: [],
        } as Manager,
      },
      localVue,
      mocks: {
        $accessor: context.$accessor,
      },
    })

    // Act - Assert
    expect(wrapper.vm.employeeIcon).toBe(`fa-${icon}`)
  })
})
