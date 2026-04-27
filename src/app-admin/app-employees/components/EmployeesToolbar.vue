<script setup lang="ts">
import { TirPmSearchInput } from 'tir-components';
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button';
import type { ITirPmDropdownOption } from 'tir-pm-dropdown';
import { TirPmDropdown, TirPmDropdownSizeEnum } from 'tir-pm-dropdown';
import { ChevronDownIcon, PlusIcon } from 'tir-style-system/icons/outline';
import { computed } from 'vue';

import {
  EMPLOYEE_ROLE_OPTIONS,
  EMPLOYEE_STATUS_OPTIONS,
  type EmployeesFiltersModel,
} from '../models';
import EmployeeStatusBadge from './EmployeeStatusBadge.vue';

type DropdownOption = ITirPmDropdownOption & {
  value: string;
  label: string;
};

const props = defineProps<{
  filters: EmployeesFiltersModel;
  isCreateDisabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:filters', value: EmployeesFiltersModel): void;
  (e: 'create'): void;
}>();

const updateFilters = (patch: Partial<EmployeesFiltersModel>) => {
  emit('update:filters', {
    ...props.filters,
    ...patch,
  });
};

const statusOptions = computed<DropdownOption[]>(() =>
  EMPLOYEE_STATUS_OPTIONS.map((option) => ({
    Id: option.value,
    value: option.value,
    label: option.label,
  })),
);

const roleOptions = computed<DropdownOption[]>(() =>
  EMPLOYEE_ROLE_OPTIONS.map((option) => ({
    Id: option.value,
    value: option.value,
    label: option.label,
  })),
);

const selectedStatusOption = computed<DropdownOption | undefined>(() =>
  statusOptions.value.find((option) => option.value === props.filters.status),
);

const selectedRoleOption = computed<DropdownOption | undefined>(() =>
  roleOptions.value.find((option) => option.value === props.filters.role),
);
</script>

<template>
  <div class="employees-toolbar">
    <div class="employees-toolbar__filters">
      <div class="employees-toolbar__group">
        <span class="employees-toolbar__label">Статус:</span>

        <TirPmDropdown
          class="employees-toolbar__dropdown"
          :options="statusOptions"
          :selected-option="selectedStatusOption"
          :size="TirPmDropdownSizeEnum.Light"
          :is-hidden-search="true"
          :is-exclude-selected="false"
          width="auto"
          popover-width="14rem"
        >
          <template #target>
            <button type="button" class="employees-toolbar__trigger">
              <span v-if="filters.status === 'all'" class="employees-toolbar__selected-text"
                >Все</span
              >
              <EmployeeStatusBadge v-else :status="filters.status" />
              <ChevronDownIcon class="employees-toolbar__chevron" />
            </button>
          </template>

          <template #optionList="{ option }">
            <button
              type="button"
              class="employees-toolbar__option"
              @click="updateFilters({ status: option.value as EmployeesFiltersModel['status'] })"
            >
              <span v-if="option.value === 'all'">{{ option.label }}</span>
              <EmployeeStatusBadge
                v-else
                :status="option.value as Exclude<EmployeesFiltersModel['status'], 'all'>"
              />
            </button>
          </template>
        </TirPmDropdown>
      </div>

      <div class="employees-toolbar__group">
        <span class="employees-toolbar__label">Роль:</span>

        <TirPmDropdown
          class="employees-toolbar__dropdown"
          :options="roleOptions"
          :selected-option="selectedRoleOption"
          :size="TirPmDropdownSizeEnum.Light"
          :is-hidden-search="true"
          :is-exclude-selected="false"
          width="auto"
          popover-width="13rem"
        >
          <template #target>
            <button type="button" class="employees-toolbar__trigger">
              <span class="employees-toolbar__selected-text">{{ selectedRoleOption?.label }}</span>
              <ChevronDownIcon class="employees-toolbar__chevron" />
            </button>
          </template>

          <template #optionList="{ option }">
            <button
              type="button"
              class="employees-toolbar__option employees-toolbar__option--text"
              @click="updateFilters({ role: option.value })"
            >
              {{ option.label }}
            </button>
          </template>
        </TirPmDropdown>
      </div>

      <TirPmSearchInput
        :model-value="filters.search"
        class="employees-toolbar__search"
        label="Поиск..."
        is-small
        :is-with-popup="false"
        placeholder="Поиск по сотрудникам"
        @update:model-value="updateFilters({ search: String($event) })"
      >
      </TirPmSearchInput>
    </div>

    <TirPmButton
      class="employees-toolbar__create"
      :is-disabled="isCreateDisabled"
      :variant="TirPmButtonVariantEnum.PrimaryState"
      :size="TirPmButtonSizeEnum.Small"
      @click="emit('create')"
    >
      <template #leftSlot>
        <PlusIcon class="employees-toolbar__create-icon" />
      </template>
    </TirPmButton>
  </div>
</template>

<style lang="scss" scoped>
.employees-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  &__filters {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    min-width: 0;
    flex: 1;
  }

  &__group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 0 0 auto;
  }

  &__label {
    color: var(--text-primary);
    font-size: 0.875rem;
    line-height: 1.25rem;
    white-space: nowrap;
  }

  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
  }

  &__selected-text {
    font-size: 0.875rem;
    line-height: 1.25rem;
    white-space: nowrap;
  }

  &__chevron {
    width: 1rem;
    height: 1rem;
    color: var(--text-secondary);
  }

  &__option {
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

  &__option--text {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &__search {
    max-width: 17.5rem;
    min-width: 15rem;
    flex: 1 1 17.5rem;
  }

  &__search-icon,
  &__create-icon {
    width: 1rem;
    height: 1rem;
  }

  &__search-icon {
    color: var(--text-secondary);
  }

  &__create {
    width: 1.75rem;
    min-width: 1.75rem;
    height: 1.75rem;
    min-height: 1.75rem;
    padding: 0;
  }

  :deep(.tir-pm-dropdown) {
    width: auto;
  }

  :deep(.tir-popover_content .inner),
  :deep(.tir-pm-dropdown__popover-content) {
    background: #ffffff;
  }

  :deep(.tir-popover_element) {
    min-width: 0;
  }
}

@media (max-width: 61.25rem) {
  .employees-toolbar {
    flex-direction: column;
    align-items: stretch;

    &__filters {
      flex-wrap: wrap;
    }

    &__search {
      max-width: none;
    }

    &__create {
      align-self: flex-end;
    }
  }
}

@media (max-width: 45rem) {
  .employees-toolbar {
    &__filters {
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
    }

    &__group {
      justify-content: space-between;
    }
  }
}
</style>
