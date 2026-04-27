<script setup lang="ts">
import { TirPmButton } from 'tir-pm-button'
import { TirPmDropdown, TirPmDropdownSizeEnum } from 'tir-pm-dropdown'
import type { ITirPmDropdownOption } from 'tir-pm-dropdown'
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

const TABLE_COLUMNS = ['52px', 'minmax(440px, 1.9fr)', 'minmax(180px, 0.8fr)', 'minmax(260px, 1fr)']

const props = defineProps<{
  employees: EmployeeListItemModel[]
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
}>()

const emit = defineEmits<{
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
          >
            <TirPmTableTd :is-left-border="false">
              <img
                class="employees-table__avatar"
                src="https://i.pravatar.cc/32?img=12"
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
        class="employees-table__page-size-dropdown"
        :options="pageSizeOptions"
        :selected-option="selectedPageSizeOption"
        :size="TirPmDropdownSizeEnum.Light"
        :is-hidden-search="true"
        :is-exclude-selected="false"
        width="auto"
        popover-width="8rem"
      >
        <template #target="{ isOpened, toOpen, toClose }">
          <button
            type="button"
            class="employees-table__page-size-trigger"
            @click="isOpened ? toClose() : toOpen()"
          >
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
  gap: 16px;

  &__scroller {
    overflow-x: auto;
  }

  &__grid {
    min-width: 940px;
    --tir-pm-table-container__padding: 0;
    --tir-pm-table-grid__gap: 0;
    --tir-pm-table-grid-header__padding: 0;
    --tir-pm-table-grid-tr__padding: 0;
    --tir-pm-table-grid-th__padding: 10px 14px;
    --tir-pm-table-grid-td__padding: 8px 14px;
  }

  &__avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    flex: 0 0 auto;
  }

  &__name-button {
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text-primary);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  &__role {
    color: var(--text-primary);
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
    color: var(--text-secondary);
    cursor: pointer;
  }

  &__copy-icon {
    width: 14px;
    height: 14px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__page-size-trigger {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  &__page-size-label {
    color: var(--text-primary);
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
  }

  &__page-size-chevron {
    width: 14px;
    height: 14px;
    color: var(--text-secondary);
  }

  &__page-size-option {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 32px;
    padding: 6px 10px;
    border: 0;
    background: transparent;
    text-align: left;
    cursor: pointer;
  }

  :deep(.table-grid-tr) {
    min-height: 40px;
  }

  :deep(.tir-pm-dropdown) {
    width: auto;
  }
}

@media (max-width: 900px) {
  .employees-table {
    &__footer {
      flex-direction: column;
      align-items: stretch;
    }
  }
}
</style>
