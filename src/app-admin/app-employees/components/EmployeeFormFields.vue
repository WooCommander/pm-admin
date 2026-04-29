<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button'
import type { ITirPmDropdownOption } from 'tir-pm-dropdown'
import { TirPmDropdown, TirPmDropdownSizeEnum } from 'tir-pm-dropdown'
import { TirPmInput, TirPmInputSizeEnum } from 'tir-pm-input'
import {
  ArrowPathIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  PhotoIcon,
  PlusIcon,
} from 'tir-style-system/icons/outline'
import { computed } from 'vue'

import type {
  EmployeeFormModel,
  EmployeeRoleOption,
  EmployeeStatus,
} from '../models'
import {
  EMPLOYEE_ROLE_OPTIONS,
  EMPLOYEE_STATUS_OPTIONS,
} from '../models'
import EmployeeStatusBadge from './EmployeeStatusBadge.vue'

type DropdownOption = ITirPmDropdownOption & {
  value: string
  label: string
}

const DEMO_AVATAR_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='48' fill='%23f2f4f8'/%3E%3Cpath d='M28 62c5-10 15-16 20-16s15 6 20 16' fill='%23232931'/%3E%3Ccircle cx='48' cy='35' r='14' fill='%23f0c39b'/%3E%3Cpath d='M34 32c3-8 9-12 14-12 8 0 16 5 16 15-3-3-7-5-12-5-6 0-12 2-18 6 0-1 0-3 0-4Z' fill='%23555b66'/%3E%3C/svg%3E"

const props = defineProps<{
  modelValue: EmployeeFormModel
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: EmployeeFormModel): void
}>()

const roleOptions = computed<DropdownOption[]>(() =>
  EMPLOYEE_ROLE_OPTIONS.filter((option) => option.value !== 'all').map((option) => ({
    Id: option.value,
    value: option.value,
    label: option.label,
  })),
)

const statusOptions = computed<DropdownOption[]>(() =>
  EMPLOYEE_STATUS_OPTIONS.filter((option) => option.value !== 'all').map((option) => ({
    Id: option.value,
    value: option.value,
    label: option.label,
  })),
)

const selectedRoleOption = computed<DropdownOption | undefined>(() =>
  roleOptions.value.find((option) => option.value === props.modelValue.role),
)

const selectedStatusOption = computed<DropdownOption | undefined>(() =>
  statusOptions.value.find((option) => option.value === props.modelValue.status),
)

const updateForm = (patch: Partial<EmployeeFormModel>) => {
  emit('update:modelValue', {
    ...props.modelValue,
    ...patch,
  })
}

const updateTextField = (field: keyof EmployeeFormModel, value: string | number) => {
  updateForm({ [field]: String(value) } as Partial<EmployeeFormModel>)
}

const copyEmail = async () => {
  if (!props.modelValue.email.trim() || !navigator?.clipboard?.writeText) return
  await navigator.clipboard.writeText(props.modelValue.email.trim())
}

const toggleDemoAvatar = () => {
  updateForm({
    avatarUrl: props.modelValue.avatarUrl ? '' : DEMO_AVATAR_URL,
  })
}

const avatarButtonIcon = computed(() => (props.modelValue.avatarUrl ? ArrowPathIcon : PlusIcon))
</script>

<template>
  <div class="employee-form-fields">
    <div class="employee-form-fields__avatar-wrap">
      <div class="employee-form-fields__avatar">
        <img
          v-if="modelValue.avatarUrl"
          :src="modelValue.avatarUrl"
          alt=""
          class="employee-form-fields__avatar-image"
        >
        <div v-else class="employee-form-fields__avatar-placeholder">
          <PhotoIcon class="employee-form-fields__avatar-placeholder-icon" />
        </div>
      </div>

      <TirPmButton
        class="employee-form-fields__avatar-button"
        :size="TirPmButtonSizeEnum.Tiny"
        :variant="TirPmButtonVariantEnum.SecondaryState"
        is-rounded
        @click="toggleDemoAvatar"
      >
        <template #leftSlot>
          <component :is="avatarButtonIcon" class="employee-form-fields__avatar-button-icon" />
        </template>
      </TirPmButton>
    </div>

    <div class="employee-form-fields__grid">
      <TirPmInput
        label="Фамилия"
        :model-value="modelValue.lastName"
        :size="TirPmInputSizeEnum.Regular"
        :is-with-hint="false"
        @update:model-value="updateTextField('lastName', $event)"
      />

      <TirPmInput
        label="Имя"
        :model-value="modelValue.firstName"
        :size="TirPmInputSizeEnum.Regular"
        :is-with-hint="false"
        @update:model-value="updateTextField('firstName', $event)"
      />

      <TirPmInput
        label="Отчество"
        :model-value="modelValue.middleName"
        :size="TirPmInputSizeEnum.Regular"
        :is-with-hint="false"
        @update:model-value="updateTextField('middleName', $event)"
      />

      <div class="employee-form-fields__email-row">
        <TirPmInput
          class="employee-form-fields__email-input"
          label="Почта"
          :model-value="modelValue.email"
          :size="TirPmInputSizeEnum.Regular"
          :is-with-hint="false"
          @update:model-value="updateTextField('email', $event)"
        />

        <TirPmButton
          class="employee-form-fields__copy-button"
          :size="TirPmButtonSizeEnum.Middle"
          :variant="TirPmButtonVariantEnum.SecondaryState"
          is-rounded
          @click="copyEmail"
        >
          <template #leftSlot>
            <ClipboardDocumentIcon class="employee-form-fields__copy-icon" />
          </template>
        </TirPmButton>
      </div>

      <TirPmDropdown
        class="employee-form-fields__dropdown"
        :options="roleOptions"
        :selected-option="selectedRoleOption"
        :size="TirPmDropdownSizeEnum.Light"
        :is-hidden-search="true"
        :is-exclude-selected="false"
        width="100%"
        popover-width="100%"
        popover-container-classes="employee-form-fields__dropdown-popover"
      >
        <template #target>
          <button type="button" class="employee-form-fields__select-trigger">
            <span class="employee-form-fields__select-label">Роль</span>
            <span class="employee-form-fields__select-value">
              {{ selectedRoleOption?.label || 'Выберите роль' }}
            </span>
            <ChevronDownIcon class="employee-form-fields__select-chevron" />
          </button>
        </template>

        <template #optionList="{ option }">
          <button
            type="button"
            class="employee-form-fields__option employee-form-fields__option--text"
            @click="updateForm({ role: option.value as EmployeeRoleOption['value'] })"
          >
            {{ option.label }}
          </button>
        </template>
      </TirPmDropdown>

      <TirPmDropdown
        class="employee-form-fields__dropdown"
        :options="statusOptions"
        :selected-option="selectedStatusOption"
        :size="TirPmDropdownSizeEnum.Light"
        :is-hidden-search="true"
        :is-exclude-selected="false"
        width="100%"
        popover-width="100%"
        popover-container-classes="employee-form-fields__dropdown-popover"
      >
        <template #target>
          <button type="button" class="employee-form-fields__select-trigger">
            <span class="employee-form-fields__select-label">Статус</span>
            <span class="employee-form-fields__select-status">
              <EmployeeStatusBadge :status="modelValue.status as EmployeeStatus" />
            </span>
            <ChevronDownIcon class="employee-form-fields__select-chevron" />
          </button>
        </template>

        <template #optionList="{ option }">
          <button
            type="button"
            class="employee-form-fields__option"
            @click="updateForm({ status: option.value as EmployeeStatus })"
          >
            <EmployeeStatusBadge :status="option.value as EmployeeStatus" />
          </button>
        </template>
      </TirPmDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.employee-form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.375rem;

  &__avatar-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 0.125rem;
  }

  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5.125rem;
    height: 5.125rem;
    border-radius: 50%;
    background: #f7f7fa;
    overflow: hidden;
  }

  &__avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__avatar-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #6f747d;
  }

  &__avatar-placeholder-icon {
    width: 2.625rem;
    height: 2.625rem;
  }

  &__avatar-button {
    position: absolute;
    top: 0;
    left: calc(50% + 0.75rem);
    width: 1.75rem;
    min-width: 1.75rem;
    height: 1.75rem;
    min-height: 1.75rem;
    padding: 0;
  }

  &__avatar-button-icon {
    width: 1rem;
    height: 1rem;
  }

  &__grid {
    display: grid;
    gap: 0.875rem;
  }

  &__email-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 2.5rem;
    gap: 0.5rem;
    align-items: start;
  }

  &__copy-button {
    width: 2.5rem;
    min-width: 2.5rem;
    height: 2.5rem;
    min-height: 2.5rem;
    padding: 0;
    margin-top: 0.125rem;
  }

  &__copy-icon {
    width: 1.125rem;
    height: 1.125rem;
  }

  &__select-trigger {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    width: 100%;
    min-height: 3rem;
    padding: 0.5rem 0.875rem;
    border: 0.0625rem solid #e8e8ee;
    border-radius: 0.5rem;
    background: #f4f5f8;
    text-align: left;
    cursor: pointer;
  }

  &__select-label {
    grid-column: 1;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #7f8693;
  }

  &__select-value,
  &__select-status {
    grid-column: 1;
    margin-top: 0.125rem;
    color: #232931;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &__select-chevron {
    grid-column: 2;
    grid-row: 1 / span 2;
    width: 1.125rem;
    height: 1.125rem;
    color: #6f747d;
  }

  &__option {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 2.375rem;
    padding: 0.5rem 0.75rem;
    border: 0;
    background: transparent;
    text-align: left;
    cursor: pointer;
  }

  &__option--text {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #232931;
  }

  :deep(.tir-pm-dropdown) {
    width: 100%;
  }

  :deep(.tir-popover_content .inner),
  :deep(.tir-pm-dropdown__popover-content) {
    background: #ffffff;
  }

  :deep(.tir-popover_element) {
    width: 100%;
  }
}

@media (max-width: 40rem) {
  .employee-form-fields {
    gap: 1.125rem;

    &__email-row {
      grid-template-columns: minmax(0, 1fr);
    }

    &__copy-button {
      width: 100%;
      min-width: 0;
      margin-top: 0;
    }
  }
}
</style>
