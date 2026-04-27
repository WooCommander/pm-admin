<script setup lang="ts">
import {
  TirPmButton,
  TirPmButtonSizeEnum,
  TirPmButtonVariantEnum,
} from 'tir-pm-button'
import { TirPmDrawer, TirPmDrawerPositionEnum } from 'tir-pm-drawer'
import { XMarkIcon } from 'tir-style-system/icons/outline'

import type { EmployeeFormModel } from '../models'
import EmployeeFormFields from './EmployeeFormFields.vue'

defineProps<{
  visible: boolean
  form: EmployeeFormModel
  isSubmitDisabled: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'update:form', value: EmployeeFormModel): void
  (e: 'submit'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <TirPmDrawer
    :visible="visible"
    size="34.5rem"
    :position="TirPmDrawerPositionEnum.Right"
    panel-class="employees-create-drawer-panel"
    @update:visible="emit('update:visible', $event)"
  >
    <template #content>
      <div class="employees-create-drawer">
        <header class="employees-create-drawer__header">
          <h2 class="employees-create-drawer__title">Добавление сотрудника</h2>

          <button
            type="button"
            class="employees-create-drawer__close"
            @click="emit('cancel')"
          >
            <XMarkIcon class="employees-create-drawer__close-icon" />
          </button>
        </header>

        <div class="employees-create-drawer__body">
          <EmployeeFormFields
            :model-value="form"
            @update:model-value="emit('update:form', $event)"
          />
        </div>

        <footer class="employees-create-drawer__footer">
          <TirPmButton
            :variant="TirPmButtonVariantEnum.PrimaryState"
            :size="TirPmButtonSizeEnum.Regular"
            :is-disabled="isSubmitDisabled"
            @click="emit('submit')"
          >
            Добавить
          </TirPmButton>

          <TirPmButton
            :variant="TirPmButtonVariantEnum.SecondaryState"
            :size="TirPmButtonSizeEnum.Regular"
            @click="emit('cancel')"
          >
            Отмена
          </TirPmButton>
        </footer>
      </div>
    </template>
  </TirPmDrawer>
</template>

<style lang="scss" scoped>
.employees-create-drawer {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  height: 100vh;
  background: #ffffff;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem 1.75rem 0.875rem;
    border-bottom: 0.0625rem solid #eceef2;
  }

  &__title {
    margin: 0;
    color: #232931;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75rem;
  }

  &__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: 0;
    background: transparent;
    color: #4b525d;
    cursor: pointer;
  }

  &__close-icon {
    width: 1.125rem;
    height: 1.125rem;
  }

  &__body {
    overflow: auto;
    padding: 1.75rem;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.125rem 1.75rem 1.625rem;
    border-top: 0.0625rem solid #eceef2;
  }
}

@media (max-width: 40rem) {
  .employees-create-drawer {
    &__header {
      padding: 1.125rem 1rem 0.75rem;
    }

    &__body {
      padding: 1.125rem 1rem;
    }

    &__footer {
      padding: 1rem;
      flex-wrap: wrap;
    }
  }
}
</style>
