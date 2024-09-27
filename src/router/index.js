import { createRouter, createWebHistory } from "vue-router";
import LoginUser from "@/views/users/LoginUser.vue";
import RegisterUser from "@/views/users/RegisterUser.vue";
import store from "@/store"; // Importa el store para acceder a él
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "",
    name: "home",
    component: HomeView,
    children: [
      { path: "/login", name: "Login", component: LoginUser },
      { path: "/register", name: "Register", component: RegisterUser },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/DashBoard.vue"),
    meta: { requiresAuth: true }, // Ruta protegida
  },
  {
    path: "/create-activity",
    name: "create-activity",
    component: () => import("../views/dashboard/CreateActivity.vue"),
    meta: { requiresAuth: true }, // Ruta protegida
  },
  {
    path: "/ranking",
    name: "ranking",
    component: () => import("../views/dashboard/RankingUser.vue"),
    meta: { requiresAuth: true }, // Ruta protegida
  },
  {
    path: "/ranking/duration",
    name: "rankingDuration",
    component: () => import("../views/dashboard/RankingUser.vue"),
    meta: { requiresAuth: true }, // Ruta protegida
  },
  {
    path: "/ranking/reps",
    name: "rankingReps",
    component: () => import("../views/dashboard/RankingByReps.vue"),
    meta: { requiresAuth: true }, // Ruta protegida
  },
  {
    path: "/ranking/global",
    name: "rankingGlobal",
    component: () => import("../views/dashboard/RankingGlobal.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  //const isAuthenticated = store.getters.getUser.token; // Accede al store correctamente
  if (to.meta.requiresAuth && !store.getters.getUser.token) {
    next({ path: "/login" }); // Redirecciona correctamente a la página de login
  } else {
    next();
  }
});

export default router;
