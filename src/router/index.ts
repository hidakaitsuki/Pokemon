import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
 
  // 存在しないパスに遷移すると404ページへ
  {
    path: "/",
    component: () => import("../views/pokemonList.vue"),
  },
  {
    path:"/pokemonDetail/:id",
    component: () => import("../views/pokemonDetail.vue"),
  },
  {
    path: "/:NotFound(.*)",
    component: () => import("../views/page404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
