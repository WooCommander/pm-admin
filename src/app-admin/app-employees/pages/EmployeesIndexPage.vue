<script setup lang="ts">
import { computed, ref } from 'vue'

import { EmployeesTable, EmployeesToolbar } from '../components'
import {
  DEFAULT_EMPLOYEES_FILTERS,
  EMPLOYEES_PAGE_SIZE_OPTIONS,
  type EmployeesFiltersModel,
} from '../models'
import { employeesMockService } from '../services'

const filters = ref<EmployeesFiltersModel>({ ...DEFAULT_EMPLOYEES_FILTERS })
const currentPage = ref(1)
const pageSize = ref(EMPLOYEES_PAGE_SIZE_OPTIONS[1])

const filteredEmployees = computed(() => employeesMockService.getEmployees(filters.value))

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredEmployees.value.total / pageSize.value)),
)

const pagedEmployees = computed(() => {
  const page = Math.min(currentPage.value, totalPages.value)
  const offset = (page - 1) * pageSize.value

  return filteredEmployees.value.items.slice(offset, offset + pageSize.value)
})

const updateFilters = (nextFilters: EmployeesFiltersModel) => {
  filters.value = nextFilters
  currentPage.value = 1
}

const updatePageSize = (nextPageSize: number) => {
  pageSize.value = nextPageSize
  currentPage.value = 1
}

const openCreate = () => {
  // Drawer формы будет добавлен отдельным этапом.
}
</script>

<template>
  <section class="employees-page">
    <div class="employees-page__surface">
      <EmployeesToolbar
        :filters="filters"
        :is-create-disabled="true"
        @update:filters="updateFilters"
        @create="openCreate"
      />

      <EmployeesTable
        :employees="pagedEmployees"
        :current-page="currentPage"
        :total-pages="totalPages"
        :page-size="pageSize"
        :total-items="filteredEmployees.total"
        @update:page="currentPage = $event"
        @update:page-size="updatePageSize"
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
