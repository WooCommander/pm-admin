export const AppEmployeesRoutes = [
    {
        path: '',
        name: 'employees',
        component: () => import('./pages/EmployeesIndexPage.vue'),
        meta: { title: 'Сотрудники' },
    },
];
