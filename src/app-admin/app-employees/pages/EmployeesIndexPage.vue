<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  EmployeeProfileDrawer,
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
  isEmployeeFormValid,
} from '../models'
import { employeesMockService } from '../services'

const filters = ref<EmployeesFiltersModel>({ ...DEFAULT_EMPLOYEES_FILTERS })
const currentPage = ref(1)
const pageSize = ref(EMPLOYEES_PAGE_SIZE_OPTIONS[1])
const isCreateDrawerVisible = ref(false)
const isProfileDrawerVisible = ref(false)
const createForm = ref<EmployeeFormModel>(createDefaultEmployeeForm())
const editForm = ref<EmployeeFormModel>(createDefaultEmployeeForm())
const selectedEmployeeId = ref<string | null>(null)

const filteredEmployees = computed(() => employeesMockService.getEmployees(filters.value))

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
  selectedEmployeeId.value = null
}

const updateProfileDrawerVisibility = (value: boolean) => {
  if (!value) {
    closeEdit()
    return
  }

  isProfileDrawerVisible.value = value
}

const submitCreate = () => {
  if (!isEmployeeFormValid(createForm.value)) return

  employeesMockService.createEmployee(createForm.value)
  closeCreate()
  resetCreateForm()
  currentPage.value = 1
}

const submitEdit = () => {
  if (!selectedEmployeeId.value || !isEmployeeFormValid(editForm.value)) return

  employeesMockService.updateEmployee(selectedEmployeeId.value, editForm.value)
  closeEdit()
}
</script>

<template>
  <section class="employees-page">
    <div class="employees-page__surface">
      <EmployeesToolbar
        :filters="filters"
        @update:filters="updateFilters"
        @create="openCreate"
      />

      <EmployeesTable
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
        :is-submit-disabled="isEditSubmitDisabled"
        @update:visible="updateProfileDrawerVisibility"
        @update:form="editForm = $event"
        @submit="submitEdit"
        @cancel="closeEdit"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.employees-page {
  padding: 22px;

  &__surface {
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-height: calc(100vh - 100px);
    padding: 22px;
    border: 1px solid #eceef2;
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
  }
}

@media (max-width: 900px) {
  .employees-page {
    padding: 16px;

    &__surface {
      padding: 16px;
      border-radius: 14px;
    }
  }
}
</style>
