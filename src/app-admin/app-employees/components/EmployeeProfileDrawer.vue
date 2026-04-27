<script setup lang="ts">
import {
  TirPmButton,
  TirPmButtonSizeEnum,
  TirPmButtonVariantEnum,
} from 'tir-pm-button'
import { TirPmDrawer, TirPmDrawerPositionEnum } from 'tir-pm-drawer'
import { TirPmTab, TirPmTabs, TirPmTabsVariantEnum } from 'tir-pm-tabs'
import { XMarkIcon } from 'tir-style-system/icons/outline'
import { ref, watch } from 'vue'

import type { EmployeeFormModel } from '../models'
import EmployeeFormFields from './EmployeeFormFields.vue'

const props = defineProps<{
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

type EmployeeProfileTab = 'details' | 'team' | 'access'

const activeTab = ref<EmployeeProfileTab>('details')

watch(
  () => props.visible,
  (visible) => {
    if (visible) activeTab.value = 'details'
  },
)
</script>

<template>
  <TirPmDrawer
    :visible="visible"
    size="552px"
    :position="TirPmDrawerPositionEnum.Right"
    panel-class="employee-profile-drawer-panel"
    @update:visible="emit('update:visible', $event)"
  >
    <template #content>
      <div class="employee-profile-drawer">
        <header class="employee-profile-drawer__header">
          <h2 class="employee-profile-drawer__title">Профиль сотрудника</h2>

          <button
            type="button"
            class="employee-profile-drawer__close"
            @click="emit('cancel')"
          >
            <XMarkIcon class="employee-profile-drawer__close-icon" />
          </button>
        </header>

        <div class="employee-profile-drawer__body">
          <TirPmTabs
            v-model="activeTab"
            :variant="TirPmTabsVariantEnum.Primary"
            width="100%"
            class="employee-profile-drawer__tabs"
          >
            <TirPmTab val="details" label="Детали" />
            <TirPmTab val="team" label="Управление командой" />
            <TirPmTab val="access" label="Доступ в систему" />
          </TirPmTabs>

          <div v-if="activeTab === 'details'" class="employee-profile-drawer__tab-content">
            <EmployeeFormFields
              :model-value="form"
              @update:model-value="emit('update:form', $event)"
            />
          </div>

          <div v-else class="employee-profile-drawer__placeholder">
            <div class="employee-profile-drawer__placeholder-card">
              <p class="employee-profile-drawer__placeholder-title">
                {{ activeTab === 'team' ? 'Управление командой' : 'Доступ в систему' }}
              </p>
              <p class="employee-profile-drawer__placeholder-text">
                Этот блок вынесен в следующий этап, чтобы не смешивать детали профиля
                с командной и access-логикой.
              </p>
            </div>
          </div>
        </div>

        <footer
          v-if="activeTab === 'details'"
          class="employee-profile-drawer__footer"
        >
          <TirPmButton
            :variant="TirPmButtonVariantEnum.PrimaryState"
            :size="TirPmButtonSizeEnum.Regular"
            :is-disabled="isSubmitDisabled"
            @click="emit('submit')"
          >
            Сохранить
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
.employee-profile-drawer {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  height: 100vh;
  background: #ffffff;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 24px 28px 14px;
    border-bottom: 1px solid #eceef2;
  }

  &__title {
    margin: 0;
    color: #232931;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
  }

  &__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    background: transparent;
    color: #4b525d;
    cursor: pointer;
  }

  &__close-icon {
    width: 18px;
    height: 18px;
  }

  &__body {
    overflow: auto;
    padding: 28px;
  }

  &__tabs {
    margin-bottom: 24px;
  }

  &__tab-content {
    min-height: 0;
  }

  &__placeholder {
    display: flex;
    min-height: 320px;
    align-items: flex-start;
  }

  &__placeholder-card {
    width: 100%;
    padding: 18px 20px;
    border: 1px solid #eceef2;
    border-radius: 12px;
    background: #f8f9fc;
  }

  &__placeholder-title {
    margin: 0 0 8px;
    color: #232931;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }

  &__placeholder-text {
    margin: 0;
    color: #6f747d;
    font-size: 14px;
    line-height: 20px;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 28px 26px;
    border-top: 1px solid #eceef2;
  }
}

@media (max-width: 640px) {
  .employee-profile-drawer {
    &__header {
      padding: 18px 16px 12px;
    }

    &__body {
      padding: 18px 16px;
    }

    &__footer {
      padding: 16px;
      flex-wrap: wrap;
    }
  }
}
</style>
