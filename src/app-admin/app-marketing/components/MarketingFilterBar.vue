<script setup lang="ts">
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

function onSearchInput(e: Event): void {
  emit('update:filters', { search: (e.target as HTMLInputElement).value })
}
</script>

<template>
  <div class="filter-bar">
    <div class="filter-bar__group">
      <!-- Пилли статусов -->
      <div class="filter-bar__pills">
        <button
          v-for="tab in STATUS_TABS"
          :key="tab.key"
          class="filter-bar__pill"
          :class="{ 'filter-bar__pill--active': props.filters.statusTab === tab.key }"
          type="button"
          @click="selectStatus(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Селект сотрудника -->
      <div class="filter-bar__select">
        <span class="filter-bar__select-value">По всем сотрудникам</span>
        <span class="filter-bar__select-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="#272d37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>

      <!-- Поиск по ссылкам -->
      <div class="filter-bar__search">
        <span class="filter-bar__search-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.5" cy="10.5" r="6.5" stroke="#686c73" stroke-width="1.5"/>
            <path d="M15.5 15.5L20 20" stroke="#686c73" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </span>
        <input
          class="filter-bar__search-field"
          type="text"
          :value="props.filters.search"
          placeholder="Поиск по ссылкам"
          @input="onSearchInput"
        />
      </div>
    </div>

    <!-- Кнопка добавить -->
    <button class="filter-bar__add-btn" type="button" aria-label="Добавить" @click="emit('add')">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2V14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M2 8H14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px 12px;

  &__group {
    display: flex;
    align-items: center;
    gap: 24px;
    flex: 1;
    min-width: 0;
  }

  // ── Пилли ────────────────────────────────────────────────────────────────

  &__pills {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  &__pill {
    height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid var(--neutral-40, #a9abaf);
    background: var(--bg-base, #fff);
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-primary, #272d37);
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    white-space: nowrap;

    &--active {
      background: var(--neutral-100, #272d37);
      border-color: var(--neutral-100, #272d37);
      color: #fff;
    }

    &:focus-visible {
      outline: 2px solid var(--text-info, #2a77ef);
      outline-offset: 2px;
    }
  }

  // ── Селект ───────────────────────────────────────────────────────────────

  &__select {
    width: 316px;
    height: 32px;
    background: var(--neutral-10, #eaeaeb);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    flex-shrink: 0;
  }

  &__select-value {
    flex: 1;
    min-width: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 20px;
    color: var(--text-primary, #272d37);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__select-arrow {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  // ── Поиск ────────────────────────────────────────────────────────────────

  &__search {
    width: 316px;
    height: 32px;
    background: var(--neutral-10, #eaeaeb);
    border-radius: 8px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  &__search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 100%;
    flex-shrink: 0;
  }

  &__search-field {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 12px 0 0;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 20px;
    color: var(--text-primary, #272d37);

    &::placeholder {
      color: var(--text-tertiary, #93969b);
    }
  }

  // ── Кнопка + ─────────────────────────────────────────────────────────────

  &__add-btn {
    width: 32px;
    height: 32px;
    background: var(--neutral-100, #272d37);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.85;
    }

    &:focus-visible {
      outline: 2px solid var(--text-info, #2a77ef);
      outline-offset: 2px;
    }
  }
}
</style>
