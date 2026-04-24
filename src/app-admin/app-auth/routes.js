export const AppAuthRoutes = [
    {
        path: '',
        redirect: { name: 'auth-login' },
    },
    {
        path: 'login',
        name: 'auth-login',
        component: () => import('./pages/LoginPage.vue'),
        meta: { title: 'Вход' },
    },
];
