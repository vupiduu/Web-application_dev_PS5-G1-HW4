import { createRouter, createWebHistory } from 'vue-router'
import TestFetch from "@/views/TestFetch.vue";
const routes = [{
    path: '/',
    name: 'TestFetch',
    component: () =>
        import ("../views/TestFetch.vue")
},
    {
        path: "/test",
        name: "TestFetch",
        component: TestFetch,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;