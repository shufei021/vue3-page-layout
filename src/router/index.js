import { createRouter, createWebHistory } from "vue-router";
// import routes from "./routes";
import AppContainer from "@/components/layout/AppContainer.vue";
const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/',
      // name: "Home",
      component:  AppContainer,
      children: [
        {
          path: '/',
          name: 'Home',
          component: () =>  import('@/views/Home/index.vue')
        },
        {
          path: '/customTable',
          name: 'CustomTable',
          component: () =>  import('@/views/CustomTable/index.vue')
        }
      ]
    },
    {
      path: "/design",
      name: "StoreDesign",
      component: () => import("../views/StoreDesign/index.vue"),
    },
  ]
});


export default router;
