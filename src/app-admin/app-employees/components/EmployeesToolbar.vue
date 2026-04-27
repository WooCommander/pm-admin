<script setup lang="ts">
import { TirPmSearchInput } from 'tir-components';
import { TirPmButton } from 'tir-pm-button';
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
        label=""
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
      @click="emit('create')"
    >
      <PlusIcon class="employees-toolbar__create-icon" />
    </TirPmButton>
  </div>
</template>

<style lang="scss" scoped>
.employees-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  &__filters {
    display: flex;
    align-items: center;
    gap: 20px;
    min-width: 0;
    flex: 1;
  }

  &__group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;
  }

  &__label {
    color: var(--text-primary);
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
  }

  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
  }

  &__selected-text {
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
  }

  &__chevron {
    width: 16px;
    height: 16px;
    color: var(--text-secondary);
  }

  &__option {
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

  &__option--text {
    font-size: 14px;
    line-height: 20px;
  }

  &__search {
    max-width: 280px;
    min-width: 240px;
    flex: 1 1 280px;
  }

  &__search-icon,
  &__create-icon {
    width: 16px;
    height: 16px;
  }

  &__search-icon {
    color: var(--text-secondary);
  }

  &__create {
    width: 28px;
    min-width: 28px;
    height: 28px;
    min-height: 28px;
    padding: 0;
  }

  :deep(.tir-pm-dropdown) {
    width: auto;
  }

  :deep(.tir-popover_element) {
    min-width: 0;
  }
}

@media (max-width: 980px) {
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

@media (max-width: 720px) {
  .employees-toolbar {
    &__filters {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    &__group {
      justify-content: space-between;
    }
  }
}
</style>
