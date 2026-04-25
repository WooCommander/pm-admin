<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import { LoginForm, TirScriptLogo } from '../components';

/**
 * Страница входа.
 *
 * Макет: Figma 8-1450.
 *   - модалка 392px, bg `--bg-base`, border-radius 20, паддинги 40
 *   - лого сверху, под ним форма (2 инпута + 2 кнопки)
 *   - обработка «Восстановить доступ» пока заглушкой
 *
 * Поддерживает `?from=/path` — туда `isAuth`-middleware кладёт исходный
 * URL, когда отправляет неавторизованного на логин. После успеха
 * возвращаемся ровно туда; если параметра нет — на `/marketing`.
 */

const router = useRouter();
const route = useRoute();

const onLoginSuccess = (): void => {
  const from = route.query.from;
  const target = typeof from === 'string' && from.startsWith('/') ? from : '/marketing';
  void router.push(target);
};

const onForgotPassword = (): void => {
  // TODO: страница восстановления доступа появится в отдельном этапе.
  console.info('[auth] forgot-password: stub');
};
</script>

<template>
  <section class="login-page" aria-labelledby="login-title">
    <div class="login-page__modal">
      <header class="login-page__header">
        <TirScriptLogo />
      </header>

      <LoginForm @success="onLoginSuccess" @forgot-password="onForgotPassword" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 24px 16px;

  &__modal {
    display: flex;
    flex-direction: column;
    gap: 28px;
    width: 100%;
    max-width: 392px;
    padding: 32px 24px 24px;
    background: var(--bg-base);
    border-radius: 20px;
    box-shadow: 0 1px 2px rgba(39, 45, 55, 0.06);
    box-sizing: border-box;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &__title {
    margin: 0;
    font-family: 'Roboto', system-ui, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: var(--text-primary);
  }

  @media (max-width: 480px) {
    padding-inline: 0;

    &__modal {
      max-width: 100%;
      padding: 24px 16px 20px;
      border-radius: 16px;
    }
  }
}
</style>
