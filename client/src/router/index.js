import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);



const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../components/index.vue"),
    },
    {
        path: "/ijazah",
        name: "Ijazah",
        component: () => import("../components/ijazah.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../pages/Register.vue"),
    },
    {
        path: "/email-reset-password",
        name: "EmailResetPassword",
        component: () => import("../pages/EmailResetPassword.vue"),
    },
    {
        path: "/resetpassword",
        name: "ResetPassword",
        component: () => import("../pages/ResetPassword.vue"),
    },
    {
        path: "/verification",
        name: "Verification",
        component: () => import("../pages/Verification.vue"),
    },
    {
        path: "/not-verified",
        name: "NotVerified",
        component: () => import("../pages/NotVerified.vue"),
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("../pages/Profile.vue"),
        beforeEnter: guard
    },
    {
        path: "/profile/edit",
        name: "EditProfile",
        component: () => import("../pages/EditProfile.vue"),
        beforeEnter: guard
    },
    
];

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes,
});

export default router;
