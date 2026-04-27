import 'tir-style-system';
import './style/index.scss';

import { createApp } from 'vue';

import App from './App.vue';
import { appAdminService } from './app-admin';
import { router } from './router';
import { initStyleVars } from './shared/config/initStyleVars';

// initStyleVars() из tir-components сюда не подключаем:
// общий barrel в этих пакетах уже давал проблемы с реэкспортами.
// Поэтому держим локальный явный initStyleVars с прямыми импортами нужных пакетов.
initStyleVars();

appAdminService.restoreFromCookie();
createApp(App).use(router).mount('#app');
