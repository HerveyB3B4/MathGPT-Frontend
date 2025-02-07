import { createRouter, createWebHistory } from "vue-router";

import chat from "../views/ChatPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: chat
    }
  ]
});

export default router;
