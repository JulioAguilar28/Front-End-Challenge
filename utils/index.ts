import { EmployeeType } from '~/models'

export function getEmployeesType(): EmployeeType[] {
  return [
    {
      type: 'Manager',
      asignment: 300,
    },
    {
      type: 'Developer',
      asignment: 1000,
    },
    {
      type: 'Tester',
      asignment: 500,
    },
  ]
}

export function getEmployeeTypeByType(type: string): EmployeeType {
  const types = getEmployeesType()
  return types.filter((employeeType) => employeeType.type === type)[0]
}
