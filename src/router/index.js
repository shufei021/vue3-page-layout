import { createRouter, createWebHistory } from "vue-router";
// import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home/index.vue"),
    },
    {
      path: "/design",
      name: "StoreDesign",
      component: () => import("../views/StoreDesign/index.vue"),
    },
  ]
});


export default router;
