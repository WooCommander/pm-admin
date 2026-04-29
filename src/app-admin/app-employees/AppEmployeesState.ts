import { reactive } from 'vue'

import type { EmployeeListItemModel } from './models'

export class AppEmployeesState {
  private readonly data = reactive<{
    employees: EmployeeListItemModel[]
    isLoading: boolean
  }>({
    employees: [],
    isLoading: false,
  })

  get employees(): EmployeeListItemModel[] {
    return this.data.employees
  }

  get isLoading(): boolean {
    return this.data.isLoading
  }

  setEmployees(employees: EmployeeListItemModel[]): void {
    this.data.employees = employees
  }

  setLoading(value: boolean): void {
    this.data.isLoading = value
  }
}
