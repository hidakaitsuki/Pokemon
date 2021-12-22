import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../views/pokemonList.vue"),
  },
  {
    path: "/pokemonDetail/:id",
    component: () => import("../views/pokemonDetail.vue"),
  },
  {
    // 存在しないパスに遷移すると404ページへ
    path: "/:NotFound(.*)",
    component: () => import("../views/page404.vue"),
  },

  {
    path: "/login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/registerUser",
    component: () => import("../views/registerUser.vue"),
  },
  {
    path: "/logout",
    component: () => import("../views/logout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
