export const AppAnalyticsRoutes = [
    {
        path: '',
        name: 'analytics',
        component: () => import('./pages/AnalyticsIndexPage.vue'),
        meta: { title: 'Аналитика' },
    },
];
