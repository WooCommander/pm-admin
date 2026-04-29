import type {
  EmployeeFormModel,
  EmployeeListItemModel,
} from '../models'

export interface EmployeesDataSource {
  listEmployees(): Promise<EmployeeListItemModel[]>
  createEmployee(form: EmployeeFormModel): Promise<EmployeeListItemModel>
  getEmployeeById(employeeId: string): Promise<EmployeeListItemModel | null>
  updateEmployee(
    employeeId: string,
    form: EmployeeFormModel,
  ): Promise<EmployeeListItemModel | null>
  addTeamMember(employeeId: string, teamMemberId: string): Promise<EmployeeListItemModel | null>
  removeTeamMember(employeeId: string, teamMemberId: string): Promise<EmployeeListItemModel | null>
  deleteEmployee(employeeId: string): Promise<boolean>
}
