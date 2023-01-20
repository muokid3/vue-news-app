import { createRouter, createWebHistory } from "vue-router";

import NewsList from "./pages/NewsList.vue";

const router = createRouter({
  history: createWebHistory(),
    routes: [
        { path: "/", component: NewsList }
    ],
});

export default router;
