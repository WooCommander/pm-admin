<script setup lang="ts">
/**
 * Лейаут для страниц авторизации.
 * Простой центрированный контейнер + футер с копирайтом.
 * Форма логина / другие auth-страницы вставляются через <router-view />.
 */
const year = new Date().getFullYear()
</script>

<template>
  <div class="auth-layout">
    <router-view />
    <footer class="auth-layout__footer">© {{ year }} pm-admin</footer>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f4f5;

  &__footer {
    position: absolute;
    bottom: 16px;
    font-size: 12px;
    color: #93969b;
  }
}
</style>
