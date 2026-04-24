export const AppStatisticsRoutes = [
    {
        path: '',
        name: 'statistics',
        component: () => import('./pages/StatisticsIndexPage.vue'),
        meta: { title: 'Статистика' },
    },
];
