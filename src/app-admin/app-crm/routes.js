export const AppCrmRoutes = [
    {
        path: '',
        name: 'crm',
        component: () => import('./pages/CrmIndexPage.vue'),
        meta: { title: 'CRM / Воронка' },
    },
];
