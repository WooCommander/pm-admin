<script setup lang="ts">
import type { MarketingFiltersModel, MarketingPrimaryTab } from '../models'

interface Props {
  filters: MarketingFiltersModel
}

interface Emits {
  (e: 'update:filters', patch: Partial<MarketingFiltersModel>): void
  (e: 'apply'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const TABS: { key: MarketingPrimaryTab; label: string }[] = [
  { key: 'team', label: 'Статистика команды' },
  { key: 'personal', label: 'Моя статистика' },
]

function selectTab(key: MarketingPrimaryTab): void {
  emit('update:filters', { primaryTab: key })
}

function onDateFromInput(e: Event): void {
  emit('update:filters', { dateFrom: (e.target as HTMLInputElement).value || null })
}

function onDateToInput(e: Event): void {
  emit('update:filters', { dateTo: (e.target as HTMLInputElement).value || null })
}
</script>

<template>
  <div class="overlay">
    <!-- Вкладки: Статистика команды / Моя статистика -->
    <div class="overlay__tabs">
      <button
        v-for="tab in TABS"
        :key="tab.key"
        class="overlay__tab"
        :class="{ 'overlay__tab--active': props.filters.primaryTab === tab.key }"
        type="button"
        @click="selectTab(tab.key)"
      >
        {{ tab.label }}
        <span
          v-if="props.filters.primaryTab === tab.key"
          class="overlay__tab-underline"
        />
      </button>
    </div>

    <!-- Строка с датами + кнопкой -->
    <div class="overlay__controls">
      <div class="overlay__date-input">
        <input
          class="overlay__date-field"
          type="text"
          :value="props.filters.dateFrom ?? ''"
          placeholder="Дата и время начала"
          @input="onDateFromInput"
        />
        <span class="overlay__date-icon">
          <!-- calendar icon -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="3" stroke="#686c73" stroke-width="1.5"/>
            <path d="M3 9H21" stroke="#686c73" stroke-width="1.5"/>
            <path d="M8 2V5" stroke="#686c73" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M16 2V5" stroke="#686c73" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </span>
      </div>

      <div class="overlay__date-input">
        <input
          class="overlay__date-field"
          type="text"
          :value="props.filters.dateTo ?? ''"
          placeholder="Дата и время окончания"
          @input="onDateToInput"
        />
        <span class="overlay__date-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="3" stroke="#686c73" stroke-width="1.5"/>
            <path d="M3 9H21" stroke="#686c73" stroke-width="1.5"/>
            <path d="M8 2V5" stroke="#686c73" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M16 2V5" stroke="#686c73" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </span>
      </div>

      <button class="overlay__apply-btn" type="button" @click="emit('apply')">
        Применить
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  background: var(--bg-base, #fff);
  border-radius: 8px 8px 0 0;
  padding: 28px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  // ── Вкладки ───────────────────────────────────────────────────────────────

  &__tabs {
    display: flex;
    gap: 24px;
    border-bottom: 1px solid var(--neutral-30, #bfc0c3);
  }

  &__tab {
    position: relative;
    padding: 0 0 8px;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: var(--text-secondary, #686c73);
    font-weight: 400;
    transition: color 0.15s;

    &--active {
      color: var(--text-primary, #272d37);
      font-weight: 500;
    }

    &:focus-visible {
      outline: 2px solid var(--text-info, #2a77ef);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  &__tab-underline {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--text-info, #2a77ef);
    border-radius: 2px 2px 0 0;
  }

  // ── Строка управления ─────────────────────────────────────────────────────

  &__controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__date-input {
    flex: 1 1 0;
    min-width: 0;
    position: relative;
    display: flex;
    align-items: center;
    background: var(--neutral-10, #eaeaeb);
    border-radius: 8px;
    height: 48px;
  }

  &__date-field {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 12px;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 20px;
    color: var(--text-primary, #272d37);

    &::placeholder {
      color: var(--text-secondary, #686c73);
    }
  }

  &__date-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 100%;
    flex-shrink: 0;
    color: var(--text-secondary, #686c73);
  }

  &__apply-btn {
    height: 48px;
    padding: 0 20px;
    background: var(--neutral-100, #272d37);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    white-space: nowrap;
    flex-shrink: 0;
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.88;
    }

    &:focus-visible {
      outline: 2px solid var(--text-info, #2a77ef);
      outline-offset: 2px;
    }
  }
}
</style>
