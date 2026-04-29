<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button'
import { TirPmInput, TirPmInputSizeEnum } from 'tir-pm-input'
import { CalendarDaysIcon } from 'tir-style-system/icons/outline'
import { computed } from 'vue'

import type { MarketingLinkStatsModel } from '../models'
import MarketingStatsCard from './MarketingStatsCard.vue'

const props = defineProps<{
  modelValue: MarketingLinkStatsModel
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: MarketingLinkStatsModel): void
}>()

function patch(partial: Partial<MarketingLinkStatsModel>): void {
  emit('update:modelValue', { ...props.modelValue, ...partial })
}

// --- Бар-чарт (SVG-координаты, единицы условные) ---

const CHART_HEIGHT = 110
const CHART_Y_LABELS = [125, 100, 75, 50, 25, 0]
const BAR_GAP = 2

const chartMax = computed<number>(() => {
  const dataMax = Math.max(0, ...props.modelValue.chartData.map(d => d.clicks))
  return Math.max(dataMax, CHART_Y_LABELS[0])
})

const barWidth = computed<number>(() => {
  const count = props.modelValue.chartData.length
  if (count === 0) return 12
  const totalWidth = 460
  return Math.max(8, Math.floor((totalWidth - BAR_GAP * (count - 1)) / count))
})

const chartWidth = computed<number>(() => {
  const count = props.modelValue.chartData.length
  if (count === 0) return 460
  return count * barWidth.value + (count - 1) * BAR_GAP
})

const viewBox = computed<string>(() => '0 0 ' + chartWidth.value + ' ' + CHART_HEIGHT)

function barHeight(clicks: number): number {
  if (chartMax.value === 0) return 0
  return Math.round((clicks / chartMax.value) * CHART_HEIGHT)
}

function barY(clicks: number): number {
  return CHART_HEIGHT - barHeight(clicks)
}

function gridY(label: number): number {
  return CHART_HEIGHT - Math.round((label / chartMax.value) * CHART_HEIGHT)
}

function gridLineKey(label: number): string {
  return 'grid-' + label
}

// --- Общая статистика ---

function progressPercent(value: number, total: number): number {
  if (total === 0) return 0
  return Math.min(100, (value / total) * 100)
}

function progressPercentDisplay(value: number, total: number): string {
  if (total === 0) return '0%'
  const pct = (value / total) * 100
  if (pct >= 99.95) return '100%'
  return pct.toFixed(1) + '%'
}

function statValueDisplay(stat: { value: number; total: number }): string {
  return stat.value.toString() + ' (' + progressPercentDisplay(stat.value, stat.total) + ')'
}
</script>

<template>
  <div class="stats-tab">
    <!-- Фильтр по дате -->
    <div class="stats-tab__date-row">
      <TirPmInput
        :model-value="modelValue.dateFrom ?? ''"
        label="Дата и время начала"
        :size="TirPmInputSizeEnum.Middle"
        :is-with-hint="false"
        class="stats-tab__date-input"
        @update:model-value="patch({ dateFrom: String($event) || null })"
      >
        <template #rightInputAddons>
          <CalendarDaysIcon class="stats-tab__date-icon" />
        </template>
      </TirPmInput>
      <TirPmInput
        :model-value="modelValue.dateTo ?? ''"
        label="Дата и время окончания"
        :size="TirPmInputSizeEnum.Middle"
        :is-with-hint="false"
        class="stats-tab__date-input"
        @update:model-value="patch({ dateTo: String($event) || null })"
      >
        <template #rightInputAddons>
          <CalendarDaysIcon class="stats-tab__date-icon" />
        </template>
      </TirPmInput>
      <TirPmButton
        :variant="TirPmButtonVariantEnum.PrimaryState"
        :size="TirPmButtonSizeEnum.Middle"
        class="stats-tab__apply-btn"
      >
        Применить
      </TirPmButton>
    </div>

    <!-- 4 карточки 2x2 -->
    <div
      v-if="modelValue.cards.length > 0"
      class="stats-tab__cards"
    >
      <MarketingStatsCard
        v-for="card in modelValue.cards"
        :key="card.id"
        :card="card"
      />
    </div>

    <!-- Бар-чарт -->
    <div
      v-if="modelValue.chartData.length > 0"
      class="stats-tab__chart-section"
    >
      <h3 class="stats-tab__section-title">Переходов по дням</h3>
      <div class="stats-tab__chart-wrap">
        <div class="stats-tab__y-axis">
          <span
            v-for="label in CHART_Y_LABELS"
            :key="label"
            class="stats-tab__y-label"
          >{{ label }}</span>
        </div>
        <div class="stats-tab__chart-inner">
          <svg
            :viewBox="viewBox"
            class="stats-tab__svg"
            preserveAspectRatio="xMinYMid meet"
          >
            <line
              v-for="label in CHART_Y_LABELS"
              :key="gridLineKey(label)"
              x1="0"
              :y1="gridY(label)"
              :x2="chartWidth"
              :y2="gridY(label)"
              class="stats-tab__grid-line"
            />
            <rect
              v-for="(day, i) in modelValue.chartData"
              :key="day.date"
              :x="i * (barWidth + BAR_GAP)"
              :y="barY(day.clicks)"
              :width="barWidth"
              :height="barHeight(day.clicks)"
              rx="3"
              class="stats-tab__bar"
            />
          </svg>
          <div class="stats-tab__x-labels">
            <span
              v-for="day in modelValue.chartData"
              :key="day.date"
              class="stats-tab__x-label"
            >{{ day.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Общая статистика -->
    <div
      v-if="modelValue.summaryStats.length > 0"
      class="stats-tab__summary"
    >
      <h3 class="stats-tab__section-title">Общая статистика</h3>
      <div class="stats-tab__summary-card">
        <div
          v-for="stat in modelValue.summaryStats"
          :key="stat.label"
          class="stats-tab__summary-row"
        >
          <div class="stats-tab__summary-header">
            <span class="stats-tab__summary-label">{{ stat.label }}</span>
            <span class="stats-tab__summary-value">{{ statValueDisplay(stat) }}</span>
          </div>
          <div class="stats-tab__progress-track">
            <div
              class="stats-tab__progress-fill"
              :style="{
                width: progressPercent(stat.value, stat.total) + '%',
                backgroundColor: stat.color,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-tab {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__date-row {
    display: flex;
    align-items: flex-end;
    gap: 0.75rem;
    flex-wrap: wrap;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &__date-input {
    flex: 1;
    min-width: 0;
  }

  &__date-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--text-secondary, #686c73);
    flex-shrink: 0;
  }

  &__apply-btn {
    flex-shrink: 0;
    white-space: nowrap;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;

    @media (max-width: 400px) {
      grid-template-columns: 1fr;
    }
  }

  &__section-title {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
    color: var(--text-primary, #272d37);
  }

  // --- Бар-чарт ---

  &__chart-wrap {
    display: flex;
    border: 0.0625rem solid var(--neutral-20, #d4d5d7);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  &__y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 6.875rem;
    width: 2.5rem;
    flex-shrink: 0;
    border-right: 0.0625rem solid var(--neutral-20, #d4d5d7);
    padding: 0 0.25rem;
    background: var(--bg-base, #fff);
  }

  &__y-label {
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1rem;
    color: var(--text-tertiary, #93969b);
    text-align: right;
    display: block;
  }

  &__chart-inner {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    background: var(--bg-base, #fff);
  }

  &__svg {
    width: 100%;
    height: 6.875rem;
    display: block;
  }

  &__grid-line {
    stroke: var(--neutral-20, #d4d5d7);
    stroke-width: 1;
  }

  &__bar {
    fill: #c9e0ff;

    &:hover {
      fill: #a8c8f0;
    }
  }

  &__x-labels {
    display: flex;
    justify-content: space-between;
    border-top: 0.0625rem solid var(--neutral-20, #d4d5d7);
    padding: 0.125rem 0;
    min-height: 1.25rem;
  }

  &__x-label {
    font-size: 0.625rem;
    line-height: 0.875rem;
    color: var(--text-secondary, #686c73);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    text-align: center;
  }

  // --- Общая статистика ---

  &__summary-card {
    background: var(--bg-base, #ffffff);
    border: 0.0625rem solid var(--neutral-10, #eaeaeb);
    border-radius: 0.5rem;
    padding: 1.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  &__summary-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__summary-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.75rem;
  }

  &__summary-label {
    font-size: 1rem;
    line-height: 1.25rem;
    color: var(--text-primary, #272d37);
    flex: 1;
    min-width: 0;
  }

  &__summary-value {
    font-size: 1rem;
    line-height: 1.25rem;
    color: var(--text-primary, #272d37);
    flex-shrink: 0;
    white-space: nowrap;
  }

  &__progress-track {
    width: 100%;
    height: 0.25rem;
    background: rgba(39, 45, 55, 0.1);
    border-radius: 0.25rem;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    border-radius: 0.25rem;
    transition: width 0.3s ease;
  }
}
</style>
