<script setup lang="ts">
/**
 * Основной лейаут админки: шапка сверху (56px) + сайдбар слева (224px) + контент.
 * Контент модулей вставляется через <router-view />.
 */
import { TheHeader, TheSidebar } from './components'
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
