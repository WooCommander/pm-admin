import { AppEmployeesState } from './AppEmployeesState'
import type { EmployeeFormModel } from './models'
import { type EmployeesDataSource,employeesMockService } from './services'

export class AppEmployeesService {
  readonly state = new AppEmployeesState()

  constructor(private readonly dataSource: EmployeesDataSource) {}

  async loadEmployees(): Promise<void> {
    this.state.setLoading(true)
    try {
      const employees = await this.dataSource.listEmployees()
      this.state.setEmployees(employees)
    } finally {
      this.state.setLoading(false)
    }
  }

  async createEmployee(form: EmployeeFormModel): Promise<void> {
    await this.dataSource.createEmployee(form)
    await this.loadEmployees()
  }

  async updateEmployee(employeeId: string, form: EmployeeFormModel): Promise<boolean> {
    const employee = await this.dataSource.updateEmployee(employeeId, form)

    if (!employee) return false

    await this.loadEmployees()
    return true
  }

  async deleteEmployee(employeeId: string): Promise<boolean> {
    const isDeleted = await this.dataSource.deleteEmployee(employeeId)

    if (!isDeleted) return false

    await this.loadEmployees()
    return true
  }

  async addTeamMember(employeeId: string, teamMemberId: string): Promise<boolean> {
    const employee = await this.dataSource.addTeamMember(employeeId, teamMemberId)

    if (!employee) return false

    await this.loadEmployees()
    return true
  }

  async removeTeamMember(employeeId: string, teamMemberId: string): Promise<boolean> {
    const employee = await this.dataSource.removeTeamMember(employeeId, teamMemberId)

    if (!employee) return false

    await this.loadEmployees()
    return true
  }
}

export const appEmployeesService = new AppEmployeesService(employeesMockService)
