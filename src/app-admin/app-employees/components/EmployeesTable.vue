<script setup lang="ts">
import type { ITirPmDropdownOption } from 'tir-pm-dropdown'
import { TirPmDropdown, TirPmDropdownSizeEnum } from 'tir-pm-dropdown'
import { TirPmPagination } from 'tir-pm-pagination'
import { TirPmTable, TirPmTableTd, TirPmTableTh, TirPmTableTr } from 'tir-pm-table'
import { ChevronDownIcon, ClipboardDocumentIcon } from 'tir-style-system/icons/outline'
import { computed } from 'vue'

import type { EmployeeListItemModel } from '../models'
import {
  EMPLOYEES_PAGE_SIZE_OPTIONS,
  getEmployeeFullName,
} from '../models'

type PageSizeOption = ITirPmDropdownOption & {
  value: number
  label: string
}

const TABLE_COLUMNS = ['3.25rem', 'minmax(27.5rem, 1.9fr)', 'minmax(11.25rem, 0.8fr)', 'minmax(16.25rem, 1fr)']

const props = defineProps<{
  employees: EmployeeListItemModel[]
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
}>()

const emit = defineEmits<{
  (e: 'edit', employee: EmployeeListItemModel): void
  (e: 'update:page', value: number): void
  (e: 'update:pageSize', value: number): void
}>()

const pageSizeOptions = computed<PageSizeOption[]>(() =>
  EMPLOYEES_PAGE_SIZE_OPTIONS.map((option) => ({
    Id: option,
    value: option,
    label: String(option),
  })),
)

const selectedPageSizeOption = computed<PageSizeOption | undefined>(() =>
  pageSizeOptions.value.find((option) => option.value === props.pageSize),
)

const copyEmail = async (email: string) => {
  if (!navigator?.clipboard?.writeText) return
  await navigator.clipboard.writeText(email)
}
</script>

<template>
  <div class="employees-table">
    <div class="employees-table__scroller">
      <TirPmTable
        :columns="TABLE_COLUMNS"
        :data="employees"
        :is-bordered="true"
        class="employees-table__grid"
      >
        <template #tableHead>
          <TirPmTableTh :is-left-border="false">Фото</TirPmTableTh>
          <TirPmTableTh>ФИО</TirPmTableTh>
          <TirPmTableTh>Роль</TirPmTableTh>
          <TirPmTableTh>Почта</TirPmTableTh>
        </template>

        <template #tableBody>
          <TirPmTableTr
            v-for="employee in employees"
            :key="employee.id"
            :columns="TABLE_COLUMNS"
            class="employees-table__row"
            @dblclick="emit('edit', employee)"
          >
            <TirPmTableTd :is-left-border="false">
              <img
                class="employees-table__avatar"
                :src="employee.avatarUrl || 'https://i.pravatar.cc/32?img=12'"
                alt=""
              >
            </TirPmTableTd>

            <TirPmTableTd>
              <button type="button" class="employees-table__name-button">
                {{ getEmployeeFullName(employee) }}
              </button>
            </TirPmTableTd>

            <TirPmTableTd>
              <span class="employees-table__role">{{ employee.role }}</span>
            </TirPmTableTd>

            <TirPmTableTd>
              <a :href="`mailto:${employee.email}`" class="employees-table__email-link">
                {{ employee.email }}
              </a>

              <button
                type="button"
                class="employees-table__copy-button"
                @click="copyEmail(employee.email)"
              >
                <ClipboardDocumentIcon class="employees-table__copy-icon" />
              </button>
            </TirPmTableTd>
          </TirPmTableTr>
        </template>
      </TirPmTable>
    </div>

    <div class="employees-table__footer">
      <TirPmDropdown
        :options="pageSizeOptions"
        :selected-option="selectedPageSizeOption"
        :size="TirPmDropdownSizeEnum.Light"
        :is-hidden-search="true"
        :is-exclude-selected="false"
        width="auto"
        popover-width="8rem"
      >
        <template #target>
          <button type="button" class="employees-table__page-size-trigger">
            <span class="employees-table__page-size-label">Показывать по {{ pageSize }}</span>
            <ChevronDownIcon class="employees-table__page-size-chevron" />
          </button>
        </template>

        <template #optionList="{ option }">
          <button
            type="button"
            class="employees-table__page-size-option"
            @click="emit('update:pageSize', option.value)"
          >
            {{ option.label }}
          </button>
        </template>
      </TirPmDropdown>

      <TirPmPagination
        :model-value="currentPage"
        :pages="totalPages"
        :range-size="2"
        @update:model-value="emit('update:page', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.employees-table {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &__scroller {
    overflow-x: auto;
  }

  &__grid {
    min-width: 58.75rem;
    --tir-pm-table-container__padding: 0;
    --tir-pm-table-grid__gap: 0;
    --tir-pm-table-grid-header__padding: 0;
    --tir-pm-table-grid-tr__padding: 0;
    --tir-pm-table-grid-th__padding: 0.625rem 0.875rem;
    --tir-pm-table-grid-td__padding: 0.25rem 0.875rem;
  }

  &__avatar {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    object-fit: cover;
    flex: 0 0 auto;
  }

  &__name-button {
    padding: 0;
    border: 0;
    background: transparent;
    color: #232931;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  &__row {
    cursor: pointer;
  }

  &__role {
    color: #232931;
  }

  &__email-link {
    overflow: hidden;
    color: #4d74ff;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__copy-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
    color: #6f747d;
    cursor: pointer;
  }

  &__copy-icon {
    width: 0.875rem;
    height: 0.875rem;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &__page-size-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  &__page-size-label {
    color: #232931;
    font-size: 0.875rem;
    line-height: 1.25rem;
    white-space: nowrap;
  }

  &__page-size-chevron {
    width: 0.875rem;
    height: 0.875rem;
    color: #6f747d;
  }

  &__page-size-option {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 2rem;
    padding: 0.375rem 0.625rem;
    border: 0;
    background: transparent;
    text-align: left;
    cursor: pointer;
  }

  :deep(.table-grid-tr) {
    min-height: 2.5rem;
    height: 2.5rem;
  }

  :deep(.table-grid-td),
  :deep(.table-grid-th) {
    display: flex;
    align-items: center;
  }

  :deep(.tir-popover_content .inner),
  :deep(.tir-pm-dropdown__popover-content) {
    background: #ffffff;
  }

  :deep(.tir-pm-dropdown) {
    width: auto;
  }
}

@media (max-width: 56.25rem) {
  .employees-table {
    &__footer {
      flex-direction: column;
      align-items: stretch;
    }
  }
}
</style>
