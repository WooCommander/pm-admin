<script setup lang="ts">
/**
 * Шапка админки — 56px, тёмно-синий #21324F.
 * Этап 2: placeholder (логотип слева, место под юзер-меню справа).
 * Юзер-меню появится на этапе 4 вместе с AppAdminState.currentUser.
 */
</script>

<template>
  <header class="the-header">
    <div class="the-header__logo">pm-admin</div>
    <div class="the-header__spacer" />
    <div class="the-header__user">
      <!-- Этап 4: currentUser + выход -->
    </div>
  </header>
</template>

<style lang="scss" scoped>
.the-header {
  height: 56px;
  background: #21324f;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
  box-sizing: border-box;

  &__logo {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  &__spacer {
    flex: 1;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    opacity: 0.8;
  }
}
</style>
