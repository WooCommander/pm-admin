<script setup lang="ts">
import type { ITirPmAutocompleteOption } from 'tir-components'
import { TirPmAutocomplete, TirPmSearchInput } from 'tir-components'
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button'
import { PlusIcon, TrashIcon } from 'tir-style-system/icons/outline'
import { computed, ref, watch } from 'vue'

import type { EmployeeListItemModel } from '../models'
import { getEmployeeFullName, getEmployeeInitials } from '../models'
import EmployeeConfirmDialog from './EmployeeConfirmDialog.vue'

const props = defineProps<{
  teamMembers: EmployeeListItemModel[]
  availableTeamMembers: EmployeeListItemModel[]
}>()

const emit = defineEmits<{
  (e: 'add', employeeId: string): void
  (e: 'remove', employeeId: string): void
}>()

type TeamAutocompleteOption = ITirPmAutocompleteOption & {
  employee: EmployeeListItemModel
}

const memberToRemove = ref<EmployeeListItemModel | null>(null)
const searchQuery = ref('')

const sortedTeamMembers = computed(() =>
  [...props.teamMembers].sort((left, right) =>
    getEmployeeFullName(left).localeCompare(getEmployeeFullName(right), 'ru'),
  ),
)

const sortedAvailableMembers = computed(() =>
  [...props.availableTeamMembers].sort((left, right) =>
    getEmployeeFullName(left).localeCompare(getEmployeeFullName(right), 'ru'),
  ),
)

const filteredAvailableMembers = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()
  if (!normalizedQuery) return sortedAvailableMembers.value

  return sortedAvailableMembers.value.filter((employee) => {
    const fullName = getEmployeeFullName(employee).toLowerCase()
    const email = employee.email.toLowerCase()
    const role = employee.role.toLowerCase()

    return (
      fullName.includes(normalizedQuery) ||
      email.includes(normalizedQuery) ||
      role.includes(normalizedQuery)
    )
  })
})

const autocompleteOptions = computed<TeamAutocompleteOption[]>(() =>
  filteredAvailableMembers.value.map((employee) => ({
    Id: employee.id,
    Name: getEmployeeFullName(employee),
    employee,
  })),
)

const isAutocompleteVisible = computed(
  () => searchQuery.value.trim().length > 0 && autocompleteOptions.value.length > 0,
)

watch(
  () => props.availableTeamMembers,
  (members) => {
    if (members.length === 0) {
      searchQuery.value = ''
    }
  },
)

const addEmployee = (employeeId: string) => {
  emit('add', employeeId)
  searchQuery.value = ''
}

const selectAutocompleteOption = (option: TeamAutocompleteOption) => {
  addEmployee(option.employee.id)
}

const requestRemoveEmployee = (employee: EmployeeListItemModel) => {
  memberToRemove.value = employee
}

const cancelRemoveEmployee = () => {
  memberToRemove.value = null
}

const confirmRemoveEmployee = () => {
  if (!memberToRemove.value) return

  emit('remove', memberToRemove.value.id)
  memberToRemove.value = null
}
</script>

<template>
  <div class="employee-team-tab">
    <div class="employee-team-tab__top">
      <div class="employee-team-tab__heading">
        <div>
          <h3 class="employee-team-tab__title">Команда</h3>
          <p class="employee-team-tab__subtitle">
            {{ sortedTeamMembers.length }} сотрудников в команде
          </p>
        </div>
      </div>

      <div class="employee-team-tab__search-block">
        <TirPmAutocomplete
          width="100%"
          height="16rem"
          :options="autocompleteOptions"
          :search-str="searchQuery"
          :visible="isAutocompleteVisible"
          popover-container-classes="employee-team-tab__autocomplete-popover"
          :prevent-mousedown-content="true"
          @select="selectAutocompleteOption"
        >
          <TirPmSearchInput
            :model-value="searchQuery"
            class="employee-team-tab__search"
            label="Добавить сотрудника в команду"
            is-small
            :is-with-popup="false"
            placeholder="Поиск по ФИО, роли или почте"
            :is-disabled="sortedAvailableMembers.length === 0"
            @update:model-value="searchQuery = String($event)"
          />

          <template #option="{ option }">
            <button
              type="button"
              class="employee-team-tab__autocomplete-option"
              @click="selectAutocompleteOption(option)"
            >
              <span
                class="employee-team-tab__avatar"
                :class="`employee-team-tab__avatar--${option.employee.avatarColor}`"
              >
                <img
                  v-if="option.employee.avatarUrl"
                  :src="option.employee.avatarUrl"
                  alt=""
                  class="employee-team-tab__avatar-image"
                >
                <span v-else>{{ getEmployeeInitials(option.employee) }}</span>
              </span>

              <span class="employee-team-tab__info">
                <span class="employee-team-tab__name">
                  {{ getEmployeeFullName(option.employee) }}
                </span>
                <span class="employee-team-tab__role">
                  {{ option.employee.role }} · {{ option.employee.email }}
                </span>
              </span>

              <span class="employee-team-tab__autocomplete-add">
                <PlusIcon class="employee-team-tab__add-icon" />
              </span>
            </button>
          </template>
        </TirPmAutocomplete>
      </div>
    </div>

    <p v-if="sortedAvailableMembers.length === 0" class="employee-team-tab__hint">
      Все доступные сотрудники уже добавлены в команду.
    </p>

    <p
      v-else-if="searchQuery.trim().length > 0 && autocompleteOptions.length === 0"
      class="employee-team-tab__hint"
    >
      По запросу ничего не найдено.
    </p>

    <div v-if="sortedTeamMembers.length > 0" class="employee-team-tab__list-wrap">
      <div class="employee-team-tab__list">
        <div
          v-for="employee in sortedTeamMembers"
          :key="employee.id"
          class="employee-team-tab__item"
        >
          <div class="employee-team-tab__person">
            <span
              class="employee-team-tab__avatar"
              :class="`employee-team-tab__avatar--${employee.avatarColor}`"
            >
              <img
                v-if="employee.avatarUrl"
                :src="employee.avatarUrl"
                alt=""
                class="employee-team-tab__avatar-image"
              >
              <span v-else>{{ getEmployeeInitials(employee) }}</span>
            </span>

            <span class="employee-team-tab__info">
              <span class="employee-team-tab__name">{{ getEmployeeFullName(employee) }}</span>
              <span class="employee-team-tab__role">{{ employee.role }}</span>
            </span>
          </div>

          <TirPmButton
            class="employee-team-tab__remove-button"
            :variant="TirPmButtonVariantEnum.TertiaryState"
            :size="TirPmButtonSizeEnum.Tiny"
            is-rounded
            @click="requestRemoveEmployee(employee)"
          >
            <template #leftSlot>
              <TrashIcon class="employee-team-tab__remove-icon" />
            </template>
          </TirPmButton>
        </div>
      </div>
    </div>

    <div v-else class="employee-team-tab__empty">
      У сотрудника пока нет участников команды.
    </div>

    <EmployeeConfirmDialog
      :is-visible="Boolean(memberToRemove)"
      title="Удалить сотрудника из команды?"
      :description="memberToRemove ? `${getEmployeeFullName(memberToRemove)} будет исключен из команды.` : ''"
      confirm-label="Удалить"
      cancel-label="Отмена"
      @confirm="confirmRemoveEmployee"
      @cancel="cancelRemoveEmployee"
    />
  </div>
</template>

<style lang="scss" scoped>
.employee-team-tab {
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  gap: 1rem;
  height: 100%;
  min-height: 0;
  overflow: hidden;

  &__top {
    display: grid;
    gap: 0.875rem;
  }

  &__heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  &__title {
    margin: 0;
    color: #232931;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
  }

  &__subtitle {
    margin: 0.125rem 0 0;
    color: #6f747d;
    font-size: 0.75rem;
    line-height: 1rem;
  }

  &__search-block {
    position: relative;
  }

  &__search {
    width: 100%;
  }

  &__list-wrap {
    min-height: 0;
    overflow: hidden;
  }

  &__list {
    display: grid;
    gap: 0.625rem;
    max-height: 100%;
    overflow: auto;
    padding-right: 0.25rem;
  }

  &__autocomplete-option,
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 0.875rem;
    border: 0;
    border-radius: 0.75rem;
    background: #f4f5f8;
    text-align: left;
  }

  &__autocomplete-option {
    cursor: pointer;
  }

  &__person {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
    flex: 1;
  }

  &__avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
    flex: 0 0 auto;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }

  &__avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__avatar--avatar-blue-pale {
    background: #4d74ff;
  }

  &__avatar--avatar-flora-pale {
    background: #2da44e;
  }

  &__avatar--avatar-sea-pale {
    background: #0ea5a4;
  }

  &__avatar--avatar-violet-pale {
    background: #7c3aed;
  }

  &__avatar--avatar-khaki-pale {
    background: #ca8a04;
  }

  &__avatar--avatar-bronze-pale {
    background: #b45309;
  }

  &__info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__name {
    overflow: hidden;
    color: #232931;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__role {
    overflow: hidden;
    color: #6f747d;
    font-size: 0.75rem;
    line-height: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__autocomplete-add {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    background: #ffffff;
    color: #4d74ff;
    flex: 0 0 auto;
  }

  &__add-icon,
  &__remove-icon {
    width: 1rem;
    height: 1rem;
  }

  &__hint {
    margin: -0.375rem 0 0;
    color: #6f747d;
    font-size: 0.75rem;
    line-height: 1rem;
    text-align: center;
  }

  &__remove-button {
    flex: 0 0 auto;
  }

  &__empty {
    padding: 1rem;
    border: 0.0625rem solid #eceef2;
    border-radius: 0.75rem;
    background: #f8f9fc;
    color: #6f747d;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
  }

  :deep(.tir-pm-search-input) {
    width: 100%;
  }
}

@media (max-width: 40rem) {
  .employee-team-tab {
    &__top {
      gap: 0.75rem;
    }

    &__list {
      gap: 0.5rem;
    }

    &__autocomplete-option,
    &__item {
      align-items: flex-start;
      padding: 0.75rem;
    }

    &__remove-button {
      margin-top: 0.25rem;
    }
  }
}
</style>
