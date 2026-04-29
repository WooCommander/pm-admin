<script setup lang="ts">
import {
  TirPmNotificationEventBus,
  TirPmNotificationGroup,
  type TirPmNotificationModel,
} from 'tir-components'
import { onMounted, onUnmounted } from 'vue'

import { ADMIN_NOTIFICATION_GROUP } from '@/shared'

import { TheHeader, TheSidebar } from './components'

const handleAdminNotification = (event: Event) => {
  const customEvent = event as CustomEvent<TirPmNotificationModel>

  if (!customEvent.detail) return

  TirPmNotificationEventBus.emit('add', customEvent.detail)
}

onMounted(() => {
  document.addEventListener(ADMIN_NOTIFICATION_GROUP, handleAdminNotification as EventListener)
})

onUnmounted(() => {
  document.removeEventListener(
    ADMIN_NOTIFICATION_GROUP,
    handleAdminNotification as EventListener,
  )
})
</script>

<template>
  <div class="main-layout">
    <TheHeader class="main-layout__header" />
    <div class="main-layout__body">
      <TheSidebar class="main-layout__sidebar" />
      <main class="main-layout__content">
        <router-view />
      </main>
    </div>
    <TirPmNotificationGroup
      :group="ADMIN_NOTIFICATION_GROUP"
      position="top-right"
      :z-index="20000"
    />
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f6f9;

  &__header {
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
  }
}
</style>
