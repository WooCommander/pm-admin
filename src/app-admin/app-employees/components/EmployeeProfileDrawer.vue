<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button'
import { TirPmDrawer, TirPmDrawerPositionEnum } from 'tir-pm-drawer'
import { TirPmTab, TirPmTabs, TirPmTabsVariantEnum } from 'tir-pm-tabs'
import { XMarkIcon } from 'tir-style-system/icons/outline'
import { ref, watch } from 'vue'

import type { EmployeeFormModel, EmployeeListItemModel } from '../models'
import EmployeeAccessTab from './EmployeeAccessTab.vue'
import EmployeeFormFields from './EmployeeFormFields.vue'
import EmployeeTeamTab from './EmployeeTeamTab.vue'

const props = defineProps<{
  visible: boolean
  form: EmployeeFormModel
  teamMembers: EmployeeListItemModel[]
  availableTeamMembers: EmployeeListItemModel[]
  isSubmitDisabled: boolean
  isDeleteDisabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'update:form', value: EmployeeFormModel): void
  (e: 'submit'): void
  (e: 'delete'): void
  (e: 'add-team-member', employeeId: string): void
  (e: 'remove-team-member', employeeId: string): void
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
    size="34.5rem"
    :position="TirPmDrawerPositionEnum.Right"
    panel-class="employee-profile-drawer-panel"
    @update:visible="emit('update:visible', $event)"
  >
    <template #content>
      <div class="employee-profile-drawer">
        <header class="employee-profile-drawer__header">
          <h2 class="employee-profile-drawer__title">Профиль сотрудника</h2>

          <button type="button" class="employee-profile-drawer__close" @click="emit('cancel')">
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
            <TirPmTab val="details" label="Детали" :current-tab="activeTab" />
            <TirPmTab val="team" label="Управление командой" :current-tab="activeTab" />
            <TirPmTab val="access" label="Доступ в систему" :current-tab="activeTab" />
          </TirPmTabs>

          <div v-if="activeTab === 'details'" class="employee-profile-drawer__tab-content">
            <EmployeeFormFields
              :model-value="form"
              @update:model-value="emit('update:form', $event)"
            />
          </div>

          <EmployeeAccessTab
            v-else-if="activeTab === 'access'"
            :model-value="form"
            class="employee-profile-drawer__tab-content"
            @update:model-value="emit('update:form', $event)"
          />

          <EmployeeTeamTab
            v-else
            :team-members="teamMembers"
            :available-team-members="availableTeamMembers"
            class="employee-profile-drawer__tab-content"
            @add="emit('add-team-member', $event)"
            @remove="emit('remove-team-member', $event)"
          />
        </div>

        <footer v-if="activeTab === 'details'" class="employee-profile-drawer__footer">
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
            :is-disabled="isDeleteDisabled"
            @click="emit('delete')"
          >
            Удалить
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
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    min-height: 0;
    overflow: hidden;
    padding: 1.75rem;
  }

  &__tabs {
    margin-bottom: 1.5rem;
  }

  &__tab-content {
    min-height: 0;
    overflow: auto;
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
  .employee-profile-drawer {
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
