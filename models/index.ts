export interface EmployeeType {
  type: string
  asignment: number
}

export interface Employee {
  id?: number
  name: string
  type: EmployeeType
}

export interface Manager extends Employee {
  nodes: any[]
}
