// Note: This file is used by the main.js file to load the routes
// !! The Name of the route must be unique !!
export const defaultRoutes = [
    {
        name: 'home',
        path: `/`,
        component: () => import('./routes/home-page.vue'),
    },
    {
        name: 'test1',
        path: `/test1`,
        component: () => import('./routes/test1-page.vue'),
    },
    {
        name: 'test2',
        path: `/test2`,
        component: () => import('./routes/test2-page.vue'),
    },
];
