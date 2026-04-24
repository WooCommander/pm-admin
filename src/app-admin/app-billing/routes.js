export const AppBillingRoutes = [
    {
        path: '',
        name: 'billing',
        component: () => import('./pages/BillingIndexPage.vue'),
        meta: { title: 'Биллинг' },
    },
];
