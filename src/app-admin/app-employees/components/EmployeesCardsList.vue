<script setup lang="ts">
import type { ITirPmDropdownOption } from 'tir-pm-dropdown'
import { TirPmDropdown, TirPmDropdownSizeEnum } from 'tir-pm-dropdown'
import { TirPmPagination } from 'tir-pm-pagination'
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
  <div class="employees-cards-list">
    <div v-if="employees.length > 0" class="employees-cards-list__grid">
      <article
        v-for="employee in employees"
        :key="employee.id"
        class="employees-cards-list__card"
        @click="emit('edit', employee)"
      >
        <div class="employees-cards-list__top">
          <img
            class="employees-cards-list__avatar"
            :src="employee.avatarUrl || 'https://i.pravatar.cc/64?img=12'"
            alt=""
          >

          <div class="employees-cards-list__identity">
            <button
              type="button"
              class="employees-cards-list__name-button"
              @click.stop="emit('edit', employee)"
            >
              {{ getEmployeeFullName(employee) }}
            </button>
            <span class="employees-cards-list__role">{{ employee.role }}</span>
          </div>
        </div>

        <div class="employees-cards-list__email-row">
          <a
            :href="`mailto:${employee.email}`"
            class="employees-cards-list__email-link"
            @click.stop
          >
            {{ employee.email }}
          </a>

          <button
            type="button"
            class="employees-cards-list__copy-button"
            @click.stop="copyEmail(employee.email)"
          >
            <ClipboardDocumentIcon class="employees-cards-list__copy-icon" />
          </button>
        </div>
      </article>
    </div>

    <div v-else class="employees-cards-list__empty">
      По текущим фильтрам сотрудники не найдены.
    </div>

    <div class="employees-cards-list__footer">
      <span class="employees-cards-list__meta">
        {{ totalItems }} сотрудников
      </span>

      <div class="employees-cards-list__controls">
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
            <button type="button" class="employees-cards-list__page-size-trigger">
              <span class="employees-cards-list__page-size-label">По {{ pageSize }}</span>
              <ChevronDownIcon class="employees-cards-list__page-size-chevron" />
            </button>
          </template>

          <template #optionList="{ option }">
            <button
              type="button"
              class="employees-cards-list__page-size-option"
              @click="emit('update:pageSize', option.value)"
            >
              {{ option.label }}
            </button>
          </template>
        </TirPmDropdown>

        <TirPmPagination
          :model-value="currentPage"
          :pages="totalPages"
          :range-size="1"
          @update:model-value="emit('update:page', $event)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.employees-cards-list {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 1rem;
  min-height: 0;
  height: 100%;
  overflow: hidden;

  &__grid {
    display: grid;
    gap: 0.875rem;
    min-height: 0;
    align-content: start;
    overflow: auto;
    padding-right: 0.25rem;
  }

  &__card {
    display: grid;
    align-self: start;
    gap: 0.875rem;
    padding: 1rem;
    border: 0.0625rem solid #eceef2;
    border-radius: 1rem;
    background: #ffffff;
    box-shadow: 0 0.0625rem 0.125rem rgba(16, 24, 40, 0.04);
    cursor: pointer;
  }

  &__top {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
  }

  &__avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    flex: 0 0 auto;
  }

  &__identity {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__name-button {
    overflow: hidden;
    padding: 0;
    border: 0;
    background: transparent;
    color: #232931;
    font: inherit;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.375rem;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  &__role {
    overflow: hidden;
    color: #6f747d;
    font-size: 0.75rem;
    line-height: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__email-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    min-width: 0;
  }

  &__email-link {
    overflow: hidden;
    color: #4d74ff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__copy-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #f4f5f8;
    color: #6f747d;
    cursor: pointer;
    flex: 0 0 auto;
  }

  &__copy-icon {
    width: 0.875rem;
    height: 0.875rem;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 0.0625rem solid #eceef2;
    border-radius: 0.875rem;
    background: #f8f9fc;
    color: #6f747d;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.25rem;
    border-top: 0.0625rem solid #eceef2;
  }

  &__meta {
    color: #6f747d;
    font-size: 0.75rem;
    line-height: 1rem;
  }

  &__controls {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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

  :deep(.tir-popover_content .inner),
  :deep(.tir-pm-dropdown__popover-content) {
    background: #ffffff;
  }

  :deep(.tir-pm-dropdown) {
    width: auto;
  }
}
</style>
