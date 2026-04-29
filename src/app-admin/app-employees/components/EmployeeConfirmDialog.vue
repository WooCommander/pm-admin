<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button'
import { TirPmModal } from 'tir-pm-modal'

withDefaults(defineProps<{
  isVisible: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
}>(), {
  confirmLabel: 'Удалить',
  cancelLabel: 'Отмена',
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <TirPmModal
    :is-visible="isVisible"
    :is-with-back="false"
    :is-close-overlay="true"
    title=""
    @close="emit('cancel')"
  >
    <template #title>
      {{ title }}
    </template>

    <template #content>
      <p class="employee-confirm-dialog__description">
        {{ description }}
      </p>
    </template>

    <template #footer>
      <TirPmButton
        :variant="TirPmButtonVariantEnum.PrimaryState"
        :size="TirPmButtonSizeEnum.Middle"
        @click="emit('confirm')"
      >
        {{ confirmLabel }}
      </TirPmButton>

      <TirPmButton
        :variant="TirPmButtonVariantEnum.TertiaryState"
        :size="TirPmButtonSizeEnum.Middle"
        @click="emit('cancel')"
      >
        {{ cancelLabel }}
      </TirPmButton>
    </template>
  </TirPmModal>
</template>

<style lang="scss" scoped>
.employee-confirm-dialog {
  &__description {
    margin: 0;
    color: #4b525d;
    font-size: 0.9375rem;
    line-height: 1.5rem;
  }
}
</style>
