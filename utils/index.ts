import { EmployeeType } from '~/models'

export const EMPLOYEE_TYPES = {
  MANAGER: 'Manager',
  DEVELOPER: 'Developer',
  TESTER: 'Tester',
}

export function getEmployeesType(): EmployeeType[] {
  return [
    {
      type: EMPLOYEE_TYPES.MANAGER,
      asignment: 300,
    },
    {
      type: EMPLOYEE_TYPES.DEVELOPER,
      asignment: 1000,
    },
    {
      type: EMPLOYEE_TYPES.TESTER,
      asignment: 500,
    },
  ]
}

export function getEmployeeTypeByType(type: string): EmployeeType {
  const types = getEmployeesType()
  return types.filter((employeeType) => employeeType.type === type)[0]
}
