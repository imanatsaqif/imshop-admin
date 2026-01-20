// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/DashboardHome.vue"),
        meta: { title: "Dashboard Overview" },
      },
      {
        path: "products",
        name: "products",
        component: () => import("@/views/Products.vue"),
        meta: { title: "Products" },
      },
      {
        path: "users",
        name: "users",
        component: () => import("@/views/Users.vue"),
        meta: { title: "Users" },
      },
      {
        path: "stats",
        name: "stats",
        component: () => import("@/views/Stats.vue"),
        meta: { title: "Stats" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
