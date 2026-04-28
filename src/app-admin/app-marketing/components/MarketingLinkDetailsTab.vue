<script setup lang="ts">
import { TirPmInput, TirPmInputSizeEnum } from 'tir-pm-input'
import { TirPmSelect, TirPmSelectItemElement } from 'tir-pm-select'
import { TirPmStatusBudge } from 'tir-pm-status-budge'
import { TirToggle } from 'tir-pm-toggle-button'

import type { MarketingLinkFormModel, MarketingLinkStatus } from '../models'
import {
  MARKETING_CHANNEL_OPTIONS,
  MARKETING_STATUS_OPTIONS,
} from '../models'

const props = defineProps<{
  modelValue: MarketingLinkFormModel
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: MarketingLinkFormModel): void
}>()

function patch(partial: Partial<MarketingLinkFormModel>): void {
  emit('update:modelValue', { ...props.modelValue, ...partial })
}

function selectedChannelLabel(): string {
  const opt = MARKETING_CHANNEL_OPTIONS.find(o => o.value === props.modelValue.channel)
  return opt?.label ?? ''
}

function statusLabel(): string {
  const opt = MARKETING_STATUS_OPTIONS.find(o => o.value === props.modelValue.status)
  return opt?.label ?? ''
}

function statusColor(status: MarketingLinkStatus): string {
  return status === 'active' ? 'positive' : 'operation'
}

function statusIconType(status: MarketingLinkStatus): string {
  return status === 'active' ? 'positive' : 'operation'
}
</script>

<template>
  <div class="details-tab">
    <TirPmInput
      :model-value="modelValue.campaignName"
      label="Название"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ campaignName: String($event) })"
    />

    <TirPmInput
      :model-value="modelValue.slug"
      label="Слаг ссылки"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ slug: String($event) })"
    />

    <TirPmInput
      :model-value="modelValue.url"
      label="Ссылка"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ url: String($event) })"
    />

    <div class="details-tab__divider" />

    <TirPmSelect
      label="Канал"
      class="details-tab__field"
    >
      <template #selectedContent>
        <span
          v-if="modelValue.channel"
          class="details-tab__select-value"
        >{{ selectedChannelLabel() }}</span>
      </template>
      <template #content="{ close }">
        <TirPmSelectItemElement
          v-for="opt in MARKETING_CHANNEL_OPTIONS"
          :key="opt.value"
          @click="() => { patch({ channel: opt.value }); close() }"
        >
          {{ opt.label }}
        </TirPmSelectItemElement>
      </template>
    </TirPmSelect>

    <TirPmInput
      :model-value="modelValue.utmSource"
      label="utm_source"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ utmSource: String($event) })"
    />

    <TirPmInput
      :model-value="modelValue.utmMedium"
      label="utm_medium"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ utmMedium: String($event) })"
    />

    <TirPmInput
      :model-value="modelValue.utmCampaign"
      label="utm_campaign"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ utmCampaign: String($event) })"
    />

    <TirPmSelect
      label="Статус"
      class="details-tab__field"
    >
      <template #selectedContent>
        <span class="details-tab__status-value">
          <TirPmStatusBudge
            :status-icon-type="statusIconType(modelValue.status)"
            :status-color="statusColor(modelValue.status)"
          />
          <span class="details-tab__status-label">{{ statusLabel() }}</span>
        </span>
      </template>
      <template #content="{ close }">
        <TirPmSelectItemElement
          v-for="opt in MARKETING_STATUS_OPTIONS"
          :key="opt.value"
          @click="() => { patch({ status: opt.value }); close() }"
        >
          <span class="details-tab__status-option">
            <TirPmStatusBudge
              :status-icon-type="statusIconType(opt.value)"
              :status-color="statusColor(opt.value)"
            />
            <span>{{ opt.label }}</span>
          </span>
        </TirPmSelectItemElement>
      </template>
    </TirPmSelect>

    <div class="details-tab__divider" />

    <div class="details-tab__switch-row">
      <TirToggle
        :model-value="modelValue.trackRegistrations"
        class="details-tab__switch-toggle"
        @update:model-value="patch({ trackRegistrations: Boolean($event) })"
      />
      <div class="details-tab__switch-content">
        <span class="details-tab__switch-label">Отслеживать регистрации</span>
        <span class="details-tab__switch-hint">Считать новые аккаунты с этой ссылки</span>
      </div>
    </div>

    <div class="details-tab__switch-row">
      <TirToggle
        :model-value="modelValue.trackCalls"
        class="details-tab__switch-toggle"
        @update:model-value="patch({ trackCalls: Boolean($event) })"
      />
      <div class="details-tab__switch-content">
        <span class="details-tab__switch-label">Отслеживать звонки</span>
        <span class="details-tab__switch-hint">Фиксировать заявки «оставить звонок»</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details-tab {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__field {
    width: 100%;
  }

  &__divider {
    height: 0.0625rem;
    background: var(--neutral-30, #bfc0c3);
    flex-shrink: 0;
  }

  &__select-value {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-primary, #272d37);
  }

  &__status-value {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }

  &__status-label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-primary, #272d37);
  }

  &__status-option {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-primary, #272d37);
  }

  &__switch-row {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  &__switch-toggle {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  &__switch-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
    min-width: 0;
  }

  &__switch-label {
    font-size: 1rem;
    line-height: 1.5rem;
    color: var(--text-primary, #272d37);
  }

  &__switch-hint {
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--text-secondary, #686c73);
  }
}
</style>
