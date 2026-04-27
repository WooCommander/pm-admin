import type {
  EmployeeFormModel,
  EmployeeListItemModel,
  EmployeesFiltersModel,
  EmployeesListResultModel,
  EmployeeStatus,
} from '../models'
import {
  getEmployeeFullName,
} from '../models'

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

const MOCK_EMPLOYEES: EmployeeListItemModel[] = EMPLOYEE_NAMES.map((name, index) => {
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
  }
})

export class EmployeesMockService {
  getEmployees(filters: EmployeesFiltersModel): EmployeesListResultModel {
    const normalizedSearch = filters.search.trim().toLowerCase()

    const items = MOCK_EMPLOYEES.filter((employee) => {
      const matchesStatus =
        filters.status === 'all' || employee.status === filters.status

      const matchesRole =
        filters.role === 'all' || employee.role === filters.role

      const matchesSearch =
        normalizedSearch.length === 0 ||
        getEmployeeFullName(employee).toLowerCase().includes(normalizedSearch) ||
        employee.email.toLowerCase().includes(normalizedSearch)

      return matchesStatus && matchesRole && matchesSearch
    })

    return {
      items,
      total: items.length,
    }
  }

  createEmployee(form: EmployeeFormModel): EmployeeListItemModel {
    const employee: EmployeeListItemModel = {
      id: `employee-${MOCK_EMPLOYEES.length + 1}`,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      middleName: form.middleName.trim(),
      email: form.email.trim(),
      role: form.role,
      status: form.status,
      avatarColor: EMPLOYEE_COLORS[MOCK_EMPLOYEES.length % EMPLOYEE_COLORS.length],
      avatarUrl: form.avatarUrl?.trim() || undefined,
    }

    MOCK_EMPLOYEES.unshift(employee)

    return employee
  }

  getEmployeeById(employeeId: string): EmployeeListItemModel | undefined {
    return MOCK_EMPLOYEES.find((employee) => employee.id === employeeId)
  }

  updateEmployee(employeeId: string, form: EmployeeFormModel): EmployeeListItemModel | undefined {
    const employee = this.getEmployeeById(employeeId)

    if (!employee) return undefined

    employee.firstName = form.firstName.trim()
    employee.lastName = form.lastName.trim()
    employee.middleName = form.middleName.trim()
    employee.email = form.email.trim()
    employee.role = form.role
    employee.status = form.status
    employee.avatarUrl = form.avatarUrl?.trim() || undefined

    return employee
  }
}

export const employeesMockService = new EmployeesMockService()
