<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import { notificationAdapter } from '@/shared'

import { appEmployeesService } from '../AppEmployeesService'
import {
  EmployeeConfirmDialog,
  EmployeeProfileDrawer,
  EmployeesCardsList,
  EmployeesCreateDrawer,
  EmployeesTable,
  EmployeesToolbar,
} from '../components'
import {
  createDefaultEmployeeForm,
  createEmployeeFormFromEmployee,
  DEFAULT_EMPLOYEES_FILTERS,
  type EmployeeFormModel,
  type EmployeeListItemModel,
  EMPLOYEES_PAGE_SIZE_OPTIONS,
  type EmployeesFiltersModel,
  getEmployeeFullName,
  isEmployeeFormValid,
} from '../models'

const filters = ref<EmployeesFiltersModel>({ ...DEFAULT_EMPLOYEES_FILTERS })
const currentPage = ref(1)
const pageSize = ref(EMPLOYEES_PAGE_SIZE_OPTIONS[1])
const isCreateDrawerVisible = ref(false)
const isProfileDrawerVisible = ref(false)
const createForm = ref<EmployeeFormModel>(createDefaultEmployeeForm())
const editForm = ref<EmployeeFormModel>(createDefaultEmployeeForm())
const selectedEmployeeId = ref<string | null>(null)
const isDeleteDialogVisible = ref(false)
const isMobileCardsView = ref(false)

const selectedEmployee = computed(() =>
  appEmployeesService.state.employees.find(
    (employee) => employee.id === selectedEmployeeId.value,
  ) ?? null,
)

const teamMembers = computed(() => {
  if (!selectedEmployee.value) return []

  return selectedEmployee.value.teamMemberIds
    .map((teamMemberId) =>
      appEmployeesService.state.employees.find((employee) => employee.id === teamMemberId),
    )
    .filter((employee): employee is EmployeeListItemModel => Boolean(employee))
})

const availableTeamMembers = computed(() => {
  if (!selectedEmployee.value) return []

  const busyIds = new Set(selectedEmployee.value.teamMemberIds)

  return appEmployeesService.state.employees.filter((employee) => {
    if (employee.id === selectedEmployee.value?.id) return false
    return !busyIds.has(employee.id)
  })
})

const filteredEmployees = computed(() => {
  const normalizedSearch = filters.value.search.trim().toLowerCase()
  const items = appEmployeesService.state.employees.filter((employee) => {
    const matchesStatus =
      filters.value.status === 'all' || employee.status === filters.value.status
    const matchesRole =
      filters.value.role === 'all' || employee.role === filters.value.role
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
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredEmployees.value.total / pageSize.value)),
)

const pagedEmployees = computed(() => {
  const page = Math.min(currentPage.value, totalPages.value)
  const offset = (page - 1) * pageSize.value

  return filteredEmployees.value.items.slice(offset, offset + pageSize.value)
})

const isCreateSubmitDisabled = computed(() => !isEmployeeFormValid(createForm.value))
const isEditSubmitDisabled = computed(() => !isEmployeeFormValid(editForm.value))

const resetCreateForm = () => {
  createForm.value = createDefaultEmployeeForm()
}

const updateFilters = (nextFilters: EmployeesFiltersModel) => {
  filters.value = nextFilters
  currentPage.value = 1
}

const updatePageSize = (nextPageSize: number) => {
  pageSize.value = nextPageSize
  currentPage.value = 1
}

const openCreate = () => {
  resetCreateForm()
  isCreateDrawerVisible.value = true
}

const closeCreate = () => {
  isCreateDrawerVisible.value = false
}

const updateCreateDrawerVisibility = (value: boolean) => {
  if (!value) {
    closeCreate()
    return
  }

  isCreateDrawerVisible.value = value
}

const openEdit = (employee: EmployeeListItemModel) => {
  selectedEmployeeId.value = employee.id
  editForm.value = createEmployeeFormFromEmployee(employee)
  isProfileDrawerVisible.value = true
}

const closeEdit = () => {
  isProfileDrawerVisible.value = false
  isDeleteDialogVisible.value = false
  selectedEmployeeId.value = null
}

const updateProfileDrawerVisibility = (value: boolean) => {
  if (!value) {
    closeEdit()
    return
  }

  isProfileDrawerVisible.value = value
}

const submitCreate = async () => {
  if (!isEmployeeFormValid(createForm.value)) return

  try {
    await appEmployeesService.createEmployee(createForm.value)
    closeCreate()
    resetCreateForm()
    currentPage.value = 1
  } catch {
    notificationAdapter.showError('Не удалось создать сотрудника')
  }
}

const submitEdit = async () => {
  if (!selectedEmployeeId.value || !isEmployeeFormValid(editForm.value)) return

  try {
    const isUpdated = await appEmployeesService.updateEmployee(
      selectedEmployeeId.value,
      editForm.value,
    )

    if (!isUpdated) {
      notificationAdapter.showError('Не удалось обновить сотрудника')
      return
    }

    closeEdit()
  } catch {
    notificationAdapter.showError('Не удалось обновить сотрудника')
  }
}

const submitDelete = async () => {
  if (!selectedEmployeeId.value) return

  try {
    const isDeleted = await appEmployeesService.deleteEmployee(selectedEmployeeId.value)
    if (!isDeleted) {
      notificationAdapter.showError('Не удалось удалить сотрудника')
      return
    }

    isDeleteDialogVisible.value = false
    closeEdit()
    currentPage.value = Math.min(currentPage.value, totalPages.value)
  } catch {
    notificationAdapter.showError('Не удалось удалить сотрудника')
  }
}

const requestDeleteEmployee = () => {
  if (!selectedEmployeeId.value) return
  isDeleteDialogVisible.value = true
}

const cancelDeleteEmployee = () => {
  isDeleteDialogVisible.value = false
}

const addTeamMember = async (teamMemberId: string) => {
  if (!selectedEmployeeId.value) return

  try {
    const isAdded = await appEmployeesService.addTeamMember(
      selectedEmployeeId.value,
      teamMemberId,
    )

    if (!isAdded) {
      notificationAdapter.showError('Не удалось добавить сотрудника в команду')
    }
  } catch {
    notificationAdapter.showError('Не удалось добавить сотрудника в команду')
  }
}

const removeTeamMember = async (teamMemberId: string) => {
  if (!selectedEmployeeId.value) return

  try {
    const isRemoved = await appEmployeesService.removeTeamMember(
      selectedEmployeeId.value,
      teamMemberId,
    )

    if (!isRemoved) {
      notificationAdapter.showError('Не удалось удалить сотрудника из команды')
    }
  } catch {
    notificationAdapter.showError('Не удалось удалить сотрудника из команды')
  }
}

const MOBILE_MEDIA_QUERY = '(max-width: 48rem)'
let mobileMediaQuery: MediaQueryList | null = null

const syncMobileCardsView = (event?: MediaQueryList | MediaQueryListEvent) => {
  isMobileCardsView.value = event?.matches ?? false
}

onMounted(() => {
  mobileMediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY)
  syncMobileCardsView(mobileMediaQuery)

  if (typeof mobileMediaQuery.addEventListener === 'function') {
    mobileMediaQuery.addEventListener('change', syncMobileCardsView)
  } else {
    mobileMediaQuery.addListener(syncMobileCardsView)
  }

  void appEmployeesService.loadEmployees().catch(() => {
    notificationAdapter.showError('Не удалось загрузить список сотрудников')
  })
})

onUnmounted(() => {
  if (!mobileMediaQuery) return

  if (typeof mobileMediaQuery.removeEventListener === 'function') {
    mobileMediaQuery.removeEventListener('change', syncMobileCardsView)
  } else {
    mobileMediaQuery.removeListener(syncMobileCardsView)
  }
})
</script>

<template>
  <section class="employees-page">
    <div class="employees-page__surface">
      <EmployeesToolbar
        :filters="filters"
        @update:filters="updateFilters"
        @create="openCreate"
      />

      <EmployeesCardsList
        v-if="isMobileCardsView"
        :employees="pagedEmployees"
        :current-page="currentPage"
        :total-pages="totalPages"
        :page-size="pageSize"
        :total-items="filteredEmployees.total"
        @edit="openEdit"
        @update:page="currentPage = $event"
        @update:page-size="updatePageSize"
      />

      <EmployeesTable
        v-else
        :employees="pagedEmployees"
        :current-page="currentPage"
        :total-pages="totalPages"
        :page-size="pageSize"
        :total-items="filteredEmployees.total"
        @edit="openEdit"
        @update:page="currentPage = $event"
        @update:page-size="updatePageSize"
      />

      <EmployeesCreateDrawer
        :visible="isCreateDrawerVisible"
        :form="createForm"
        :is-submit-disabled="isCreateSubmitDisabled"
        @update:visible="updateCreateDrawerVisibility"
        @update:form="createForm = $event"
        @submit="submitCreate"
        @cancel="closeCreate"
      />

      <EmployeeProfileDrawer
        :visible="isProfileDrawerVisible"
        :form="editForm"
        :team-members="teamMembers"
        :available-team-members="availableTeamMembers"
        :is-submit-disabled="isEditSubmitDisabled"
        :is-delete-disabled="!selectedEmployeeId"
        @update:visible="updateProfileDrawerVisibility"
        @update:form="editForm = $event"
        @submit="submitEdit"
        @delete="requestDeleteEmployee"
        @add-team-member="addTeamMember"
        @remove-team-member="removeTeamMember"
        @cancel="closeEdit"
      />

      <EmployeeConfirmDialog
        :is-visible="isDeleteDialogVisible"
        title="Удалить сотрудника?"
        :description="selectedEmployee ? `${getEmployeeFullName(selectedEmployee)} будет удален из списка сотрудников.` : ''"
        confirm-label="Удалить"
        cancel-label="Отмена"
        @confirm="submitDelete"
        @cancel="cancelDeleteEmployee"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.employees-page {
  padding: 1.375rem;

  &__surface {
    display: flex;
    flex-direction: column;
    gap: 1.125rem;
    min-height: calc(100vh - 6.25rem);
    padding: 1.375rem;
    border: 0.0625rem solid #eceef2;
    border-radius: 1.125rem;
    background: #ffffff;
    box-shadow: 0 0.0625rem 0.125rem rgba(16, 24, 40, 0.04);
  }
}

@media (max-width: 56.25rem) {
  .employees-page {
    padding: 1rem;

    &__surface {
      padding: 1rem;
      border-radius: 0.875rem;
    }
  }
}
</style>
