import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import Dashboard from "../views/dashboard.vue";
import LoginPage from "../views/auth/login.vue";
import ResetPassword from "../views/auth/resetpassword.vue";
import RegistrationPage from "../views/auth/register.vue";
import ForgotPassword from "../views/auth/forgotpassword.vue";
import Notfound from "../components/pages/notfound.vue";
import AppLayout from "../layouts/AppLayout.vue";
import Products from "../components/pages/Products.vue";
import Requestpassword from "../views/auth/requestpassword.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: LoginPage,
    },
    {
        path: "/register",
        name: "Register",
        component: RegistrationPage,
    },
    {
        path: "/forgotpassword",
        name: "ForgotPassword",
        component: ForgotPassword,
    },
    {
        path: "/requestpassword/",
        name: "Requestpassword",
        component: Requestpassword,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: "/resetpassword/:token",
        name: "ResetPassword",
        component: ResetPassword,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: "/app",
        name: "app",
        component: AppLayout,
        // meta: {
        //     requiresAuth: true,
        // },
        children: [
            {
                path: "/dashboard",
                name: "app.dashboard",
                component: Dashboard,
            },
            {
                path: "products",
                name: "app.products",
                component: Products,
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: Notfound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else if (to.meta.requiresGuest && store.state.user.token) {
        next({ name: "app.dashboard" });
    } else {
        next();
    }
});

export default router;
