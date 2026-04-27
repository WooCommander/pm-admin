<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button'
import { TirPmInput, TirPmInputSizeEnum } from 'tir-pm-input'
import { CalendarDaysIcon } from 'tir-style-system/icons/outline'
import { ref } from 'vue'

import type { MarketingFiltersModel, MarketingPrimaryTab } from '../models'
import MarketingDatePicker from './MarketingDatePicker.vue'

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

// Попап: null | 'from' | 'to'
const openPicker = ref<null | 'from' | 'to'>(null)

function selectTab(key: MarketingPrimaryTab): void {
  emit('update:filters', { primaryTab: key })
}

function togglePicker(field: 'from' | 'to'): void {
  openPicker.value = openPicker.value === field ? null : field
}

function onPickerApply(): void {
  openPicker.value = null
  emit('apply')
}

function onApply(): void {
  emit('apply')
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

    <!-- Строка: даты + Применить -->
    <div class="overlay__controls">
      <!-- Дата начала -->
      <div class="overlay__date-wrap">
        <TirPmInput
          :model-value="props.filters.dateFrom ?? ''"
          label=""
          placeholder="Дата и время начала"
          :size="TirPmInputSizeEnum.Middle"
          :is-with-hint="false"
          class="overlay__date-input"
          @update:model-value="emit('update:filters', { dateFrom: String($event) || null })"
          @click.stop="togglePicker('from')"
        >
          <template #leftInputAddons>
            <CalendarDaysIcon class="overlay__date-icon" />
          </template>
        </TirPmInput>

        <div
          v-if="openPicker === 'from'"
          class="overlay__picker-popup"
          @click.stop
        >
          <MarketingDatePicker
            :date-from="props.filters.dateFrom"
            :date-to="props.filters.dateTo"
            @update:date-from="emit('update:filters', { dateFrom: $event })"
            @update:date-to="emit('update:filters', { dateTo: $event })"
            @apply="onPickerApply"
          />
        </div>
      </div>

      <!-- Дата окончания -->
      <div class="overlay__date-wrap">
        <TirPmInput
          :model-value="props.filters.dateTo ?? ''"
          label=""
          placeholder="Дата и время окончания"
          :size="TirPmInputSizeEnum.Middle"
          :is-with-hint="false"
          class="overlay__date-input"
          @update:model-value="emit('update:filters', { dateTo: String($event) || null })"
          @click.stop="togglePicker('to')"
        >
          <template #leftInputAddons>
            <CalendarDaysIcon class="overlay__date-icon" />
          </template>
        </TirPmInput>

        <div
          v-if="openPicker === 'to'"
          class="overlay__picker-popup"
          @click.stop
        >
          <MarketingDatePicker
            :date-from="props.filters.dateFrom"
            :date-to="props.filters.dateTo"
            @update:date-from="emit('update:filters', { dateFrom: $event })"
            @update:date-to="emit('update:filters', { dateTo: $event })"
            @apply="onPickerApply"
          />
        </div>
      </div>

      <!-- Применить -->
      <TirPmButton
        class="overlay__apply-btn"
        :variant="TirPmButtonVariantEnum.PrimaryState"
        :size="TirPmButtonSizeEnum.Middle"
        @click="onApply"
      >
        Применить
      </TirPmButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  background: var(--bg-base, #fff);
  padding: 28px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  // Вкладки
  &__tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--neutral-30, #bfc0c3);
  }

  &__tab {
    position: relative;
    padding: 0 4px 8px;
    margin-right: 24px;
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

  // Строка с датами
  &__controls {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  &__date-wrap {
    flex: 1;
    min-width: 0;
    position: relative;
  }

  &__date-input {
    width: 100%;
  }

  &__date-icon {
    width: 20px;
    height: 20px;
    color: var(--text-secondary, #686c73);
  }

  &__picker-popup {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 100;
  }

  &__apply-btn {
    flex-shrink: 0;
    align-self: flex-end;
  }
}
</style>
