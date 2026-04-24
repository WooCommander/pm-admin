export const AppMarketingRoutes = [
    {
        path: '',
        name: 'marketing',
        component: () => import('./pages/MarketingIndexPage.vue'),
        meta: { title: 'Маркетинг' },
    },
];
