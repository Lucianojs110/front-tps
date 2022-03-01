import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";
import NotFound from "@/views/NotFoundPage.vue";
import store from '../store'
import router from "./router";

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
        component: () => import("../views/Dashboard.vue"),
        meta: { requiresAuth: true}
      },

      {
        path: "/usuarios",
        name: "usuarios",
        component: () => import("../views/Pages/Users/Index.vue"),
        meta: { requiresAuth: true}
      },

      {
        path: "/roles",
        name: "roles",
        component: () => import("../views/Pages/Roles/Index.vue"),
        meta: { requiresAuth: true}
      },

      {
        path: "/clientes",
        name: "clientes",
        component: () => import("../views/Pages/Clientes/Index.vue"),
        meta: { requiresAuth: true}
      },

      {
        path: "/proveedores",
        name: "proveedores",
        component: () => import("../views/Pages/Proveedores/Index.vue"),
        meta: { requiresAuth: true}
      },
      {
        path: "/ingresos",
        name: "ingresos-cala",
        component: () => import("../views/Pages/Ingresos/Index.vue"),
        meta: { requiresAuth: true}
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
          import("../views/Pages/Login.vue")
      },

      { path: "*", component: NotFound }
    ]
  }
];




export default routes;
