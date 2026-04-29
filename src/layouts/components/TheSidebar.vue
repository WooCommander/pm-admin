<script setup lang="ts">
import { computed } from 'vue'

import { SIDEBAR_MENU } from '@/shared/constants'

const primaryItems = computed(() =>
  SIDEBAR_MENU.filter((item) => item.group === 'primary'),
)

const adminItems = computed(() =>
  SIDEBAR_MENU.filter((item) => item.group === 'admin'),
)
</script>

<template>
  <aside class="the-sidebar">
    <nav class="the-sidebar__group">
      <router-link
        v-for="item in primaryItems"
        :key="item.key"
        :to="item.path"
        class="the-sidebar__item"
        active-class="the-sidebar__item--active"
        :title="item.title"
        :aria-label="item.title"
      >
        <span class="the-sidebar__icon-shell">
          <component :is="item.icon" class="the-sidebar__icon" />
        </span>
        <span class="the-sidebar__label">{{ item.title }}</span>
      </router-link>
    </nav>

    <div v-if="adminItems.length" class="the-sidebar__divider" />

    <nav v-if="adminItems.length" class="the-sidebar__group">
      <router-link
        v-for="item in adminItems"
        :key="item.key"
        :to="item.path"
        class="the-sidebar__item"
        active-class="the-sidebar__item--active"
        :title="item.title"
        :aria-label="item.title"
      >
        <span class="the-sidebar__icon-shell">
          <component :is="item.icon" class="the-sidebar__icon" />
        </span>
        <span class="the-sidebar__label">{{ item.title }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.the-sidebar {
  width: 256px;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 16px;
  background: #f3f4f7;
  border-right: 1px solid #e5e7ec;

  &__group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__divider {
    height: 1px;
    margin: 2px 4px 0;
    background: #cfd3db;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 0 12px;
    border-radius: 10px;
    color: #353b47;
    text-decoration: none;
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover {
      background: rgba(215, 218, 225, 0.52);
    }

    &--active {
      background: #dde0e5;
      color: #303643;
      font-weight: 600;
    }
  }

  &__icon-shell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: inset 0 0 0 1px #eceef2;
  }

  &__icon {
    width: 18px;
    height: 18px;
    color: #7d8391;
  }

  &__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    line-height: 1.2;
  }
}

@media (max-width: 48rem) {
  .the-sidebar {
    width: 72px;
    padding: 16px 10px;
    gap: 12px;

    &__group {
      gap: 8px;
    }

    &__divider {
      margin: 0 6px;
    }

    &__item {
      justify-content: center;
      min-height: 44px;
      padding: 0;
      border-radius: 12px;
    }

    &__icon-shell {
      width: 36px;
      height: 36px;
    }

    &__icon {
      width: 20px;
      height: 20px;
    }

    &__label {
      display: none;
    }
  }
}
</style>
