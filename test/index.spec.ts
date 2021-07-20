import Vuex from 'vuex'
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
// @ts-ignore
import index from '@/pages/index.vue'
import { EmployeeType } from '~/models'

const localVue = createLocalVue()
localVue.use(Vuex)

const departmentFactory = () => ({
  manager: {
    id: 1,
    name: 'Manager A',
    type: {
      type: 'Manager',
      asignment: 300,
    } as EmployeeType,
    nodes: [
      {
        id: 2,
        name: 'Manager B',
        type: {
          type: 'Manager',
          asignment: 300,
        } as EmployeeType,
        nodes: [
          {
            id: 3,
            name: 'Developer B',
            type: {
              type: 'Developer',
              asignment: 1000,
            } as EmployeeType,
          },
          {
            id: 4,
            name: 'Tester B',
            type: {
              type: 'Tester',
              asignment: 500,
            } as EmployeeType,
          },
        ],
      },
    ],
  },
})

const mockStore = () => ({
  department: departmentFactory(),
  showAddForm: true,
})

describe('index page', () => {
  let wrapper: Wrapper<index>
  let context: any

  beforeAll(() => {
    context = {
      $accessor: mockStore(),
    }
    localVue.prototype.$nuxt = { context }
  })

  test('get the correct amount given a department structure: 2100', async () => {
    // Arrange
    wrapper = shallowMount(index, {
      localVue,
      mocks: {
        $accessor: context.$accessor,
      },
    })

    // Act
    const departmentTotalAccountExpected = 2100
    await wrapper.vm.getAmountHandler()

    // Assert
    expect(wrapper.vm.state.departmentTotalAccount).toBe(
      departmentTotalAccountExpected
    )
  })
})
