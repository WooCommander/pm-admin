<script setup lang="ts">
import { TirPmStatusBudge } from 'tir-pm-status-budge'
import { computed } from 'vue'

import type { EmployeeStatus } from '../models'

const props = defineProps<{
  status: EmployeeStatus
}>()

const label = computed(() => {
  if (props.status === 'active') return 'Активный'
  if (props.status === 'pending') return 'Ожидает активации'
  return 'Уволен'
})

const budgeColor = computed(() => {
  if (props.status === 'active') return 'positive'
  if (props.status === 'pending') return 'operation'
  return 'negative'
})

const budgeIconType = computed(() => {
  if (props.status === 'active') return 'positive'
  if (props.status === 'pending') return 'operation'
  return 'negative'
})
</script>

<template>
  <span class="employee-status-badge" :class="`employee-status-badge--${status}`">
    <TirPmStatusBudge :status-icon-type="budgeIconType" :status-color="budgeColor" />
    <span class="employee-status-badge__label">{{ label }}</span>
  </span>
</template>

<style lang="scss" scoped>
.employee-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;

  &__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    text-transform: uppercase;
  }

  &--active &__label {
    color: #1d9b47;
  }

  &--pending &__label {
    color: #cc7a00;
  }

  &--dismissed &__label {
    color: #d14343;
  }
}
</style>
