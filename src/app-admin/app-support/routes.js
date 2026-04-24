export const AppSupportRoutes = [
    {
        path: '',
        name: 'support',
        component: () => import('./pages/SupportIndexPage.vue'),
        meta: { title: 'Техподдержка' },
    },
];
