import Vuex from 'vuex'
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
// @ts-ignore
import AddForm from '@/components/AddForm.vue'
import { jest } from '@jest/globals'

const localVue = createLocalVue()
localVue.use(Vuex)

const mockStore = () => ({
  isThereMainManager: false,
  userSelectedToAddEmployee: {},
  initDepartment: jest.fn(),
  addEmplote: jest.fn(),
})

describe('AddForm', () => {
  let wrapper: Wrapper<AddForm>
  let context: any

  beforeAll(() => {
    context = {
      $accessor: {},
    }
    context.$accessor = mockStore()
    localVue.prototype.$nuxt = { context }
  })

  test('show create department if there is no main manager', () => {
    // Arrange
    wrapper = shallowMount(AddForm, {
      localVue,
      mocks: {
        $accessor: context.$accessor,
      },
    })
    // Act
    const buttonText = wrapper.find('button').text()

    // Assert
    expect(buttonText).toBe('Create Department')
  })

  test('only show manager option if there is no main manager', () => {
    // Arrange
    wrapper = shallowMount(AddForm, {
      localVue,
      mocks: {
        $accessor: context.$accessor,
      },
    })
    // Act
    const managerOption = wrapper.find('option').attributes()

    // Assert
    expect(managerOption.value).toBe('Manager')
  })
})
