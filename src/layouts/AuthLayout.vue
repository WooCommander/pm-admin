<script setup lang="ts">
/**
 * Лейаут для страниц авторизации.
 *
 * Центрированный контейнер на сером фоне `--bg-tertiary`,
 * под модалкой - копирайт из макета 8-1450.
 */
const startYear = 2010
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="auth-layout">
    <main class="auth-layout__content">
      <router-view />
    </main>

    <footer class="auth-layout__footer">
      © {{ startYear }} - {{ currentYear }} TirScript. All rights reserved.
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
  padding: 0 16px 32px;
  background: var(--bg-tertiary);

  &__content {
    display: flex;
    flex: 1 0 auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 0;
    padding: 24px 0;
  }

  &__footer {
    flex: 0 0 auto;
    font-family: 'Roboto', system-ui, sans-serif;
    font-size: 12px;
    line-height: 16px;
    color: var(--text-tertiary);
    text-align: center;
  }
}
</style>
