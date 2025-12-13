import { createRouter, createWebHistory } from 'vue-router'
import TestFetch from "@/views/TestFetch.vue";
import SignupView from "@/views/SignupView.vue";
import LoginView from "@/views/LoginView.vue";
import auth from "@/router/auth";

const routes = [
    {
     path: "/",
     name:"AllPostsView",
     component: () => import("@/views/AllPostsView.vue"),

     beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
     }


    },
    {
    path: "/add-post",
    name: "AddPostView",
    component: () => import("@/views/AddPostView.vue"),

    beforeEnter: async (to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) next("/login");
        else next();
    }
    },
    {
    path: "/post/:id",
    name: "SinglePostView",
    component: () => import("@/views/SinglePostView.vue"),

    beforeEnter: async (to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) next("/login");
        else next();
    }
    },
    {
        path: "/signup",
        name: "signupView",
        component: SignupView,
    },
    {
        path: "/login",
        name: "loginView",
        component: LoginView,
    },
    {
        path:"/test",
        name: "TestFetch",
        component: TestFetch,

    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;