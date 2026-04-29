import type {
  EmployeeFormModel,
  EmployeeListItemModel,
  EmployeeStatus,
} from '../models'
import type { EmployeesDataSource } from './employees.types'

const EMPLOYEE_COLORS = [
  'avatar-blue-pale',
  'avatar-flora-pale',
  'avatar-sea-pale',
  'avatar-violet-pale',
  'avatar-khaki-pale',
  'avatar-bronze-pale',
]

const EMPLOYEE_NAMES = [
  ['Константин', 'Константиновский', 'Константинович'],
  ['Анна', 'Петрова', 'Викторовна'],
  ['Руслан', 'Ахметов', 'Ильдарович'],
  ['Сергей', 'Иванов', 'Александрович'],
  ['Лейла', 'Сафарова', 'Рашидовна'],
  ['Мария', 'Кузнецова', 'Олеговна'],
  ['Хасан', 'Магомедов', 'Алиевич'],
  ['Арман', 'Саркисян', 'Геворгович'],
  ['Гульназ', 'Бикбаева', 'Фанисовна'],
  ['Дмитрий', 'Орлов', 'Павлович'],
  ['Надежда', 'Трофимова', 'Васильевна'],
  ['Виктор', 'Ким', 'Николаевич'],
  ['Ольга', 'Шевченко', 'Игоревна'],
  ['Тимур', 'Юсупов', 'Камильевич'],
  ['Елена', 'Григорьева', 'Сергеевна'],
  ['Ислам', 'Лиянев', 'Муссаевич'],
  ['Михаил', 'Рабинович', 'Львович'],
  ['Сания', 'Доржиева', 'Баировна'],
  ['Айсен', 'Николаев', 'Петрович'],
  ['Екатерина', 'Романова', 'Андреевна'],
  ['Павел', 'Смирнов', 'Игоревич'],
  ['Дарья', 'Лебедева', 'Дмитриевна'],
  ['Илья', 'Мельников', 'Олегович'],
  ['Амина', 'Гаджиева', 'Шамилевна'],
  ['Юлия', 'Власова', 'Николаевна'],
  ['Владимир', 'Ершов', 'Сергеевич'],
  ['Ирина', 'Чернова', 'Павловна'],
]

const ROLE_SEQUENCE = [
  'Маркетолог',
  'Маркетолог',
  'Маркетолог',
  'Техподдержка',
  'Техподдержка',
  'Аккаунт-менеджер',
  'Аккаунт-менеджер',
  'Бухгалтер',
  'Администратор',
]

const STATUS_SEQUENCE: EmployeeStatus[] = [
  'active',
  'active',
  'active',
  'pending',
  'active',
  'dismissed',
]

const createMockEmployees = (): EmployeeListItemModel[] => EMPLOYEE_NAMES.map((name, index) => {
  const [firstName, lastName, middleName] = name
  const role = ROLE_SEQUENCE[index % ROLE_SEQUENCE.length]
  const status = STATUS_SEQUENCE[index % STATUS_SEQUENCE.length]
  const emailBase = `${firstName}.${lastName}`.toLowerCase()

  return {
    id: `employee-${index + 1}`,
    firstName,
    lastName,
    middleName,
    email: `${emailBase}@example.com`,
    role,
    status,
    avatarColor: EMPLOYEE_COLORS[index % EMPLOYEE_COLORS.length],
    teamMemberIds: [],
  }
})

const cloneEmployee = (employee: EmployeeListItemModel): EmployeeListItemModel => ({
  ...employee,
  teamMemberIds: [...employee.teamMemberIds],
})

export class EmployeesMockService implements EmployeesDataSource {
  private employees: EmployeeListItemModel[] = createMockEmployees()

  constructor() {
    this.seedTeams()
  }

  private seedTeams(): void {
    this.assignTeamMembers('employee-1', ['employee-2', 'employee-3', 'employee-4'])
    this.assignTeamMembers('employee-6', ['employee-7', 'employee-8'])
  }

  private assignTeamMembers(employeeId: string, teamMemberIds: string[]): void {
    const employee = this.employees.find((item) => item.id === employeeId)
    if (!employee) return

    employee.teamMemberIds = teamMemberIds.filter(
      (teamMemberId, index, items) =>
        teamMemberId !== employeeId &&
        items.indexOf(teamMemberId) === index &&
        this.employees.some((candidate) => candidate.id === teamMemberId),
    )
  }

  async listEmployees(): Promise<EmployeeListItemModel[]> {
    return this.employees.map(cloneEmployee)
  }

  async createEmployee(form: EmployeeFormModel): Promise<EmployeeListItemModel> {
    const employee: EmployeeListItemModel = {
      id: `employee-${this.employees.length + 1}`,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      middleName: form.middleName.trim(),
      email: form.email.trim(),
      role: form.role,
      status: form.status,
      avatarColor: EMPLOYEE_COLORS[this.employees.length % EMPLOYEE_COLORS.length],
      avatarUrl: form.avatarUrl?.trim() || undefined,
      teamMemberIds: [],
    }

    this.employees.unshift(employee)

    return cloneEmployee(employee)
  }

  async getEmployeeById(employeeId: string): Promise<EmployeeListItemModel | null> {
    const employee = this.employees.find((item) => item.id === employeeId)

    return employee ? cloneEmployee(employee) : null
  }

  async updateEmployee(
    employeeId: string,
    form: EmployeeFormModel,
  ): Promise<EmployeeListItemModel | null> {
    const employee = this.employees.find((item) => item.id === employeeId)

    if (!employee) return null

    employee.firstName = form.firstName.trim()
    employee.lastName = form.lastName.trim()
    employee.middleName = form.middleName.trim()
    employee.email = form.email.trim()
    employee.role = form.role
    employee.status = form.status
    employee.avatarUrl = form.avatarUrl?.trim() || undefined

    return cloneEmployee(employee)
  }

  async addTeamMember(
    employeeId: string,
    teamMemberId: string,
  ): Promise<EmployeeListItemModel | null> {
    const employee = this.employees.find((item) => item.id === employeeId)
    if (!employee || employeeId === teamMemberId) return null

    const teamMemberExists = this.employees.some((item) => item.id === teamMemberId)
    if (!teamMemberExists) return null

    if (!employee.teamMemberIds.includes(teamMemberId)) {
      employee.teamMemberIds = [...employee.teamMemberIds, teamMemberId]
    }

    return cloneEmployee(employee)
  }

  async removeTeamMember(
    employeeId: string,
    teamMemberId: string,
  ): Promise<EmployeeListItemModel | null> {
    const employee = this.employees.find((item) => item.id === employeeId)
    if (!employee) return null

    employee.teamMemberIds = employee.teamMemberIds.filter((item) => item !== teamMemberId)
    return cloneEmployee(employee)
  }

  async deleteEmployee(employeeId: string): Promise<boolean> {
    const nextEmployees = this.employees.filter((employee) => employee.id !== employeeId)

    if (nextEmployees.length === this.employees.length) return false

    this.employees = nextEmployees.map((employee) => ({
      ...employee,
      teamMemberIds: employee.teamMemberIds.filter((teamMemberId) => teamMemberId !== employeeId),
    }))

    return true
  }
}

export const employeesMockService = new EmployeesMockService()
