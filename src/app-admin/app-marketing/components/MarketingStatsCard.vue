<script setup lang="ts">
import type { MarketingStatsCardModel } from '../models'

interface Props {
  card: MarketingStatsCardModel
}

defineProps<Props>()
</script>

<template>
  <div class="stats-card">
    <p class="stats-card__label">{{ card.label }}</p>

    <div class="stats-card__trend" :class="`stats-card__trend--${card.trend}`">
      <!-- positive: chevron-double-up -->
      <svg
        v-if="card.trend === 'positive'"
        class="stats-card__trend-icon"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 10L8 5.5L12.5 10"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.5 13.5L8 9L12.5 13.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <!-- negative: chevron-double-down -->
      <svg
        v-else-if="card.trend === 'negative'"
        class="stats-card__trend-icon"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 6L8 10.5L12.5 6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.5 2.5L8 7L12.5 2.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <!-- neutral: bars-2 (две горизонтальные линии) -->
      <svg
        v-else
        class="stats-card__trend-icon"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5.5H14"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M2 10.5H14"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>

      <span class="stats-card__trend-text">{{ card.hint }}</span>
    </div>

    <p class="stats-card__value">{{ card.value }}</p>
  </div>
</template>

<style lang="scss" scoped>
.stats-card {
  flex: 1 1 0;
  min-width: 0;
  padding: 16px;
  background: var(--bg-secondary, #f8f6f9);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;

  &__label {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: var(--text-secondary, #686c73);
  }

  &__trend {
    display: flex;
    align-items: center;
    gap: 4px;

    &--positive { color: var(--text-positive, #0d9336); }
    &--negative { color: var(--text-negative, #ec2e14); }
    &--neutral  { color: var(--text-secondary, #686c73); }
  }

  &__trend-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  &__trend-text {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  &__value {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 30px;
    font-weight: 600;
    line-height: 36px;
    color: var(--text-primary, #272d37);
  }
}
</style>
