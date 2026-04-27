export type EmployeeStatus = 'active' | 'pending' | 'dismissed'

export interface EmployeeRoleOption {
  value: string
  label: string
}

export interface EmployeeStatusOption {
  value: 'all' | EmployeeStatus
  label: string
}

export interface EmployeeListItemModel {
  id: string
  firstName: string
  lastName: string
  middleName: string
  email: string
  role: string
  status: EmployeeStatus
  avatarColor: string
  avatarUrl?: string
}

export interface EmployeeFormModel {
  firstName: string
  lastName: string
  middleName: string
  email: string
  role: string
  status: EmployeeStatus
  avatarUrl?: string
}

export interface EmployeesFiltersModel {
  search: string
  role: string
  status: 'all' | EmployeeStatus
}

export interface EmployeesListResultModel {
  items: EmployeeListItemModel[]
  total: number
}

export const EMPLOYEE_STATUS_OPTIONS: EmployeeStatusOption[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активный' },
  { value: 'pending', label: 'Ожидает активации' },
  { value: 'dismissed', label: 'Уволен' },
]

export const EMPLOYEE_ROLE_OPTIONS: EmployeeRoleOption[] = [
  { value: 'all', label: 'Все' },
  { value: 'Маркетолог', label: 'Маркетолог' },
  { value: 'Техподдержка', label: 'Техподдержка' },
  { value: 'Аккаунт-менеджер', label: 'Аккаунт-менеджер' },
  { value: 'Бухгалтер', label: 'Бухгалтер' },
  { value: 'Администратор', label: 'Администратор' },
]

export const EMPLOYEES_PAGE_SIZE_OPTIONS = [10, 19, 25, 50]

export const DEFAULT_EMPLOYEES_FILTERS: EmployeesFiltersModel = {
  search: '',
  role: 'all',
  status: 'active',
}

export const getEmployeeFullName = (employee: EmployeeListItemModel): string =>
  `${employee.lastName} ${employee.firstName} ${employee.middleName}`.trim()

export const getEmployeeInitials = (employee: EmployeeListItemModel): string =>
  `${employee.firstName[0] ?? ''}${employee.lastName[0] ?? ''}`.toUpperCase()

export const createDefaultEmployeeForm = (): EmployeeFormModel => ({
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  role: EMPLOYEE_ROLE_OPTIONS[1]?.value ?? '',
  status: 'active',
  avatarUrl: '',
})

export const createEmployeeFormFromEmployee = (
  employee: EmployeeListItemModel,
): EmployeeFormModel => ({
  firstName: employee.firstName,
  lastName: employee.lastName,
  middleName: employee.middleName,
  email: employee.email,
  role: employee.role,
  status: employee.status,
  avatarUrl: employee.avatarUrl ?? '',
})

export const isEmployeeFormValid = (form: EmployeeFormModel): boolean =>
  [form.firstName, form.lastName, form.middleName, form.email, form.role].every(
    (value) => value.trim().length > 0,
  )
