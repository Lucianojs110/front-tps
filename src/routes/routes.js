import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";

import NotFound from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Pages/Login.vue")
  },

  {
    path: "/dashboard",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/Dashboard.vue")
      },

      {
        path: "/usuarios",
        name: "usuarios",
        component: () => import("../views/Pages/Users/Index.vue")
      },

      {
        path: "/roles",
        name: "roles",
        component: () => import("../views/Pages/Roles/Index.vue")
      },

      {
        path: "/clientes",
        name: "clientes",
        component: () => import("../views/Pages/Clients/Index.vue")
      }
    ]
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Login.vue")
      },

      { path: "*", component: NotFound }
    ]
  }
];

export default routes;
