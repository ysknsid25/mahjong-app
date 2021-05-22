import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/Main",
        name: "Main",
        component: () => import("./pages/main.vue"),
        children: [
            {
                path: "/",
                name: "Dashboard",
                component: () => import("./pages/Dashboard.vue"),
            },
            {
                path: "/RecordScore",
                name: "RecordScore",
                component: () => import("./pages/RecordScore.vue"),
            },
            {
                path: "/Profile",
                name: "Profile",
                component: () => import("./pages/Profile.vue"),
            },
            {
                path: "/Feedback",
                name: "Feedback",
                component: () => import("./pages/Feedback.vue"),
            },
            {
                path: "/Logout",
                name: "Logout",
                component: () => import("./pages/Top.vue"),
                /*
        meta: { isPublic: true },
        beforeEnter: function (to, from, next) {
          localStorage.removeItem("vue_token");
          Store.commit("logined");
          Store.commit("crearState");
          next({ path: '/login' });
        }
        */
            },
        ],
    },
    {
        path: "/Top",
        name: "Top",
        component: () => import("./pages/Top.vue"),
        //meta: { isPublic: true }
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

/*
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.isPublic) && !Store.state.logined) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});
*/

export default router;
