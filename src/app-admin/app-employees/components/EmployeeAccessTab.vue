<script setup lang="ts">
import {
  TirPmButton,
  TirPmButtonSizeEnum,
  TirPmButtonVariantEnum,
} from 'tir-pm-button'
import { TirPmSystemMessage } from 'tir-pm-system-message'
import {
  TirPmTooltipElement,
  TirPmTooltipElementPlacementEnum,
} from 'tir-pm-tooltip-element'
import {
  ArrowPathIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from 'tir-style-system/icons/outline'
import { computed, ref, watch } from 'vue'

import type { EmployeeFormModel } from '../models'

const INVITE_LINK = `Ughhfleri(8323kskfdmsdafA;'MF'MSDFDSF:;`
const INVITE_EXPIRES_AT = 'Ссылка активна до 09.07.2024 10:19'

const props = defineProps<{
  modelValue: EmployeeFormModel
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: EmployeeFormModel): void
}>()

const isResetConfirmVisible = ref(false)
const isCopied = ref(false)

const isPendingAccess = computed(() => props.modelValue.status === 'pending')

watch(
  () => props.modelValue.status,
  () => {
    if (isPendingAccess.value) isResetConfirmVisible.value = false
  },
)

const copyInviteLink = async () => {
  if (!navigator?.clipboard?.writeText) return

  await navigator.clipboard.writeText(INVITE_LINK)
  isCopied.value = true

  window.setTimeout(() => {
    isCopied.value = false
  }, 1600)
}

const requestAccessReset = () => {
  if (isPendingAccess.value) return
  isResetConfirmVisible.value = true
}

const cancelResetAccess = () => {
  isResetConfirmVisible.value = false
}

const confirmResetAccess = () => {
  emit('update:modelValue', {
    ...props.modelValue,
    status: 'pending',
  })
  isResetConfirmVisible.value = false
}

const sendInvite = async () => {
  if (!navigator?.clipboard?.writeText) return
  await navigator.clipboard.writeText(`${props.modelValue.email}\n${INVITE_LINK}`)
}
</script>

<template>
  <div class="employee-access-tab">
    <div class="employee-access-tab__top">
      <div class="employee-access-tab__invite-card">
        <div class="employee-access-tab__invite-main">
          <InformationCircleIcon class="employee-access-tab__info-icon" />

          <div class="employee-access-tab__invite-copy">
            <span class="employee-access-tab__invite-label">Пригласительная ссылка</span>
            <span class="employee-access-tab__invite-value">{{ INVITE_LINK }}</span>
          </div>
        </div>

        <span class="employee-access-tab__invite-meta">{{ INVITE_EXPIRES_AT }}</span>
      </div>

      <div class="employee-access-tab__actions">
        <TirPmButton
          class="employee-access-tab__icon-button"
          :size="TirPmButtonSizeEnum.Middle"
          :variant="TirPmButtonVariantEnum.SecondaryState"
          is-rounded
          @click="copyInviteLink"
        >
          <template #leftSlot>
            <ClipboardDocumentIcon class="employee-access-tab__action-icon" />
          </template>
        </TirPmButton>

        <TirPmTooltipElement :position="TirPmTooltipElementPlacementEnum.Top">
          <TirPmButton
            class="employee-access-tab__icon-button"
            :size="TirPmButtonSizeEnum.Middle"
            :variant="TirPmButtonVariantEnum.SecondaryState"
            is-rounded
            :is-disabled="isPendingAccess"
            @click="requestAccessReset"
          >
            <template #leftSlot>
              <ArrowPathIcon class="employee-access-tab__action-icon" />
            </template>
          </TirPmButton>

          <template #content>
            {{ isPendingAccess ? 'Доступ уже ожидает активации' : 'Сброс доступа' }}
          </template>
        </TirPmTooltipElement>
      </div>
    </div>

    <div class="employee-access-tab__messages">
      <div v-if="isResetConfirmVisible" class="employee-access-tab__warning-box">
        <div class="employee-access-tab__warning-content">
          <ExclamationTriangleIcon class="employee-access-tab__warning-icon" />

          <div class="employee-access-tab__warning-text">
            Будет сформирована ссылка для восстановления доступа в систему. Доступ будет
            заблокирован до ее активации. Продолжить?
          </div>
        </div>

        <div class="employee-access-tab__warning-actions">
          <TirPmButton
            :size="TirPmButtonSizeEnum.Tiny"
            :variant="TirPmButtonVariantEnum.SecondaryState"
            @click="cancelResetAccess"
          >
            Нет
          </TirPmButton>

          <TirPmButton
            :size="TirPmButtonSizeEnum.Tiny"
            :variant="TirPmButtonVariantEnum.LinkState"
            @click="confirmResetAccess"
          >
            Да
          </TirPmButton>
        </div>
      </div>

      <div v-else-if="isPendingAccess" class="employee-access-tab__status-box">
        <TirPmSystemMessage class="employee-access-tab__status-message">
          <template #descriptionSlot>
            Статус изменен на "Ожидает активации". Доступ в систему заблокирован до
            активации ссылки. При необходимости для деактивации ссылки измените статус
            на "Уволен"
          </template>
        </TirPmSystemMessage>
      </div>
    </div>

    <div class="employee-access-tab__bottom">
      <TirPmButton
        class="employee-access-tab__invite-button"
        :size="TirPmButtonSizeEnum.Regular"
        :variant="TirPmButtonVariantEnum.PrimaryState"
        @click="sendInvite"
      >
        <template #leftSlot>
          <EnvelopeIcon class="employee-access-tab__invite-button-icon" />
        </template>
        Отправить приглашение на {{ modelValue.email }}
      </TirPmButton>
    </div>

    <span v-if="isCopied" class="employee-access-tab__copy-state">
      Ссылка скопирована
    </span>
  </div>
</template>

<style lang="scss" scoped>
.employee-access-tab {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 190px);

  &__top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: start;
  }

  &__invite-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__invite-main {
    display: grid;
    grid-template-columns: 16px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    min-height: 40px;
    padding: 10px 12px;
    border-radius: 8px;
    background: #f4f5f8;
  }

  &__info-icon {
    width: 16px;
    height: 16px;
    color: #232931;
  }

  &__invite-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__invite-label {
    color: #8a9099;
    font-size: 12px;
    line-height: 16px;
  }

  &__invite-value {
    overflow: hidden;
    color: #3b414b;
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__invite-meta {
    color: #8a9099;
    font-size: 12px;
    line-height: 16px;
  }

  &__actions {
    display: flex;
    gap: 10px;
  }

  &__icon-button {
    width: 40px;
    min-width: 40px;
    height: 40px;
    min-height: 40px;
    padding: 0;
  }

  &__action-icon {
    width: 18px;
    height: 18px;
  }

  &__messages {
    margin-top: 18px;
  }

  &__warning-box {
    padding: 14px 14px 12px;
    border: 1px solid #f1a23c;
    border-radius: 12px;
    background: #fff4e6;
  }

  &__warning-content {
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
  }

  &__warning-icon {
    width: 18px;
    height: 18px;
    color: #ec8b11;
  }

  &__warning-text {
    color: #3b414b;
    font-size: 13px;
    line-height: 20px;
  }

  &__warning-actions {
    display: flex;
    gap: 10px;
    margin-top: 14px;
    margin-left: 28px;
  }

  &__status-box {
    padding: 14px;
    border-radius: 12px;
    background: #f7f7fb;
  }

  &__status-message {
    --tir-pm-system-message__width: 100%;
    --tir-pm-system-message__text-align: left;
    --tir-pm-system-message-more-desc__margin-bottom: 0;
    --tir-pm-system-message-more-desc__font-size: 13px;
    --tir-pm-system-message-more-desc__color: #3b414b;
  }

  &__bottom {
    margin-top: auto;
    padding-top: 28px;
  }

  &__invite-button {
    width: 100%;
    justify-content: center;
  }

  &__invite-button-icon {
    width: 18px;
    height: 18px;
  }

  &__copy-state {
    margin-top: 12px;
    color: #1d9b47;
    font-size: 12px;
    line-height: 16px;
  }
}

@media (max-width: 640px) {
  .employee-access-tab {
    min-height: auto;

    &__top {
      grid-template-columns: 1fr;
    }

    &__actions {
      justify-content: flex-end;
    }

    &__warning-actions {
      margin-left: 0;
    }
  }
}
</style>
