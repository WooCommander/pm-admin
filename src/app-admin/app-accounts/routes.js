export const AppAccountsRoutes = [
    {
        path: '',
        name: 'accounts',
        component: () => import('./pages/AccountsIndexPage.vue'),
        meta: { title: 'Управление аккаунтами' },
    },
];
