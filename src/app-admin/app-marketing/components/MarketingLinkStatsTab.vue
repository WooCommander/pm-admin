<script setup lang="ts">
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

// --- Бар-чарт ---

const CHART_HEIGHT = 160
const CHART_Y_LABELS = [0, 25, 50, 75, 100, 125]
const BAR_GAP = 4

const chartMax = computed<number>(() => {
  const dataMax = Math.max(0, ...props.modelValue.chartData.map(d => d.clicks))
  const yMax = Math.max(...CHART_Y_LABELS)
  return Math.max(dataMax, yMax)
})

const barWidth = computed<number>(() => {
  const count = props.modelValue.chartData.length
  if (count === 0) return 16
  const totalWidth = 400
  return Math.max(8, Math.floor((totalWidth - BAR_GAP * (count - 1)) / count))
})

const chartWidth = computed<number>(() => {
  const count = props.modelValue.chartData.length
  if (count === 0) return 400
  return count * barWidth.value + (count - 1) * BAR_GAP
})

function barHeight(clicks: number): number {
  if (chartMax.value === 0) return 0
  return Math.round((clicks / chartMax.value) * CHART_HEIGHT)
}

function barY(clicks: number): number {
  return CHART_HEIGHT - barHeight(clicks)
}

// --- Прогресс-бары ---

function progressPercent(value: number, total: number): number {
  if (total === 0) return 0
  return Math.min(100, Math.round((value / total) * 100))
}
</script>

<template>
  <div class="stats-tab">
    <!-- Фильтр по дате -->
    <div class="stats-tab__date-row">
      <div class="stats-tab__date-group">
        <span class="stats-tab__date-label">С</span>
        <input
          type="date"
          class="stats-tab__date-input"
          :value="modelValue.dateFrom ?? ''"
          @change="patch({ dateFrom: ($event.target as HTMLInputElement).value || null })"
        />
      </div>
      <span class="stats-tab__date-sep">—</span>
      <div class="stats-tab__date-group">
        <span class="stats-tab__date-label">По</span>
        <input
          type="date"
          class="stats-tab__date-input"
          :value="modelValue.dateTo ?? ''"
          @change="patch({ dateTo: ($event.target as HTMLInputElement).value || null })"
        />
      </div>
    </div>

    <!-- 4 карточки 2×2 -->
    <div
      v-if="modelValue.cards.length > 0"
      class="stats-tab__cards"
    >
      <MarketingStatsCard
        v-for="card in modelValue.cards"
        :key="card.id"
        :card="card"
        class="stats-tab__card"
      />
    </div>

    <!-- Бар-чарт -->
    <div
      v-if="modelValue.chartData.length > 0"
      class="stats-tab__chart-section"
    >
      <h3 class="stats-tab__section-title">Переходов по дням</h3>
      <div class="stats-tab__chart-wrap">
        <!-- Y-labels -->
        <div class="stats-tab__y-labels">
          <span
            v-for="label in [...CHART_Y_LABELS].reverse()"
            :key="label"
            class="stats-tab__y-label"
          >{{ label }}</span>
        </div>

        <!-- SVG chart -->
        <div class="stats-tab__chart-inner">
          <svg
            :viewBox="`0 0 ${chartWidth} ${CHART_HEIGHT}`"
            class="stats-tab__svg"
            preserveAspectRatio="xMinYMid meet"
          >
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

          <!-- X-labels -->
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

    <!-- Общая статистика (прогресс-бары) -->
    <div
      v-if="modelValue.summaryStats.length > 0"
      class="stats-tab__summary"
    >
      <h3 class="stats-tab__section-title">Общая статистика</h3>
      <div class="stats-tab__summary-list">
        <div
          v-for="stat in modelValue.summaryStats"
          :key="stat.label"
          class="stats-tab__summary-row"
        >
          <div class="stats-tab__summary-header">
            <span class="stats-tab__summary-label">{{ stat.label }}</span>
            <span class="stats-tab__summary-value">{{ stat.value.toLocaleString('ru-RU') }}</span>
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
  gap: 24px;
  padding: 24px;

  &__date-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__date-group {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__date-label {
    font-size: 14px;
    line-height: 20px;
    color: var(--text-secondary, #686c73);
    white-space: nowrap;
  }

  &__date-sep {
    font-size: 14px;
    color: var(--text-secondary, #686c73);
    padding: 0 2px;
  }

  &__date-input {
    height: 32px;
    padding: 0 8px;
    font-size: 13px;
    line-height: 20px;
    color: var(--text-primary, #272d37);
    background: var(--bg-base, #ffffff);
    border: 1px solid var(--neutral-30, #bfc0c3);
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    font-family: inherit;

    &:focus {
      border-color: var(--text-info, #2a77ef);
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  &__card {
    flex: unset;
  }

  &__section-title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: var(--text-primary, #272d37);
  }

  &__chart-wrap {
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }

  &__y-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 160px;
    flex-shrink: 0;
  }

  &__y-label {
    font-size: 11px;
    line-height: 16px;
    color: var(--text-secondary, #686c73);
    text-align: right;
    min-width: 28px;
  }

  &__chart-inner {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__svg {
    width: 100%;
    height: 160px;
    display: block;
    overflow: visible;
  }

  &__bar {
    fill: var(--text-info, #2a77ef);
    opacity: 0.85;

    &:hover {
      opacity: 1;
    }
  }

  &__x-labels {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }

  &__x-label {
    font-size: 10px;
    line-height: 14px;
    color: var(--text-secondary, #686c73);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    text-align: center;
  }

  &__summary-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__summary-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__summary-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &__summary-label {
    font-size: 14px;
    line-height: 20px;
    color: var(--text-primary, #272d37);
  }

  &__summary-value {
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    color: var(--text-primary, #272d37);
    font-family: 'Roboto Mono', monospace;
  }

  &__progress-track {
    width: 100%;
    height: 4px;
    background: var(--neutral-20, #d4d5d7);
    border-radius: 2px;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease;
  }
}
</style>
