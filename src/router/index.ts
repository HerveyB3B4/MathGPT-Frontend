import { createRouter, createWebHistory } from "vue-router";
import { HomePage } from "../pages";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      title: "首页",
      isAuth: false,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to) => {
  if (to.meta.isAuth && !localStorage.getItem("token")) {
      return { name: "Login" };
  }
});

export default router;