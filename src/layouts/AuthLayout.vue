<script setup lang="ts">
/**
 * Лейаут для страниц авторизации.
 *
 * Центрированный контейнер на сером фоне `--bg-tertiary`,
 * под модалкой — копирайт из макета 8-1450.
 */
const startYear = 2010
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="auth-layout">
    <router-view />
    <footer class="auth-layout__footer">
      © {{ startYear }} – {{ currentYear }} TirScript. All rights reserved.
      Images copyright.
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px 16px;
  background: var(--bg-tertiary);

  &__footer {
    font-family: 'Roboto', system-ui, sans-serif;
    font-size: 12px;
    line-height: 16px;
    color: var(--text-tertiary);
    text-align: center;
  }
}
</style>
