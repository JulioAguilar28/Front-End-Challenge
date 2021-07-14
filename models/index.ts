export interface EmployeeType {
  type: string
  asignment: number
}

export interface Employee {
  id?: string
  name: string
  type: EmployeeType
}

export interface Manager extends Employee {
  nodes: []
}
