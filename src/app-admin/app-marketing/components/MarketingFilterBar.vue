<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button'
import { TirPmInput, TirPmInputSizeEnum } from 'tir-pm-input'
import { MagnifyingGlassIcon, PlusIcon } from 'tir-style-system/icons/outline'

import type { MarketingFiltersModel, MarketingStatusTab } from '../models'

interface Props {
  filters: MarketingFiltersModel
}

interface Emits {
  (e: 'update:filters', patch: Partial<MarketingFiltersModel>): void
  (e: 'add'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const STATUS_TABS: { key: MarketingStatusTab; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'paused', label: 'На паузе' },
]

function selectStatus(key: MarketingStatusTab): void {
  emit('update:filters', { statusTab: key })
}
</script>

<template>
  <div class="filter-bar">
    <div class="filter-bar__left">
      <!-- Вкладки статуса -->
      <div class="filter-bar__tabs">
        <button
          v-for="tab in STATUS_TABS"
          :key="tab.key"
          class="filter-bar__tab"
          :class="{ 'filter-bar__tab--active': props.filters.statusTab === tab.key }"
          type="button"
          @click="selectStatus(tab.key)"
        >
          {{ tab.label }}
          <span
            v-if="props.filters.statusTab === tab.key"
            class="filter-bar__tab-underline"
          />
        </button>
      </div>

      <!-- Поиск -->
      <TirPmInput
        :model-value="props.filters.search"
        label=""
        placeholder="Поиск по ссылкам"
        :size="TirPmInputSizeEnum.Small"
        :is-with-hint="false"
        class="filter-bar__search"
        @update:model-value="emit('update:filters', { search: String($event) })"
      >
        <template #leftInputAddons>
          <MagnifyingGlassIcon class="filter-bar__search-icon" />
        </template>
      </TirPmInput>
    </div>

    <!-- Кнопка добавить -->
    <TirPmButton
      class="filter-bar__add-btn"
      :variant="TirPmButtonVariantEnum.PrimaryState"
      :size="TirPmButtonSizeEnum.Small"
      aria-label="Добавить"
      @click="emit('add')"
    >
      <PlusIcon class="filter-bar__add-icon" />
    </TirPmButton>
  </div>
</template>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.75rem 0.75rem;
  gap: 0.75rem;

  &__left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex: 1;
    min-width: 0;
  }

  // Вкладки статуса
  &__tabs {
    display: flex;
    align-items: center;
    gap: 0;
    width: 16.5rem;
    flex-shrink: 0;
    border-bottom: 0.0625rem solid var(--neutral-30, #bfc0c3);
  }

  &__tab {
    position: relative;
    padding: 0 0.75rem 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-secondary, #686c73);
    font-weight: 400;
    white-space: nowrap;
    transition: color 0.15s;

    &--active {
      color: var(--text-primary, #272d37);
      font-weight: 500;
    }

    &:focus-visible {
      outline: 0.125rem solid var(--text-info, #2a77ef);
      outline-offset: 0.125rem;
      border-radius: 0.125rem;
    }
  }

  &__tab-underline {
    position: absolute;
    bottom: -0.0625rem;
    left: 0;
    right: 0;
    height: 0.125rem;
    background: var(--text-info, #2a77ef);
    border-radius: 0.125rem 0.125rem 0 0;
  }

  // Поиск
  &__search {
    width: 19.75rem;
    flex-shrink: 0;
  }

  &__search-icon {
    width: 1rem;
    height: 1rem;
    color: var(--text-secondary, #686c73);
  }

  // Кнопка +
  &__add-btn {
    width: 2rem;
    height: 2rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__add-icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>
