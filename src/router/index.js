import { createRouter, createWebHistory } from "vue-router";
// import routes from "./routes";
import AppContainer from "@/components/layout/AppContainer.vue";
export const routes = [
  {
    path: '/',
    // name: "Home",
    component:  AppContainer,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () =>  import('@/views/Home/index.vue'),
        meta: { title: '首页', index :'1' }
      },
      {
        path: '/customTable',
        name: 'CustomTable',
        component: () =>  import('@/views/CustomTable/index.vue'),
        meta: { title: '自定义表格', index :'1-1'  }
      }
    ]
  },
  // {
  //   path: "/design",
  //   name: "StoreDesign",
  //   component: () => import("../views/StoreDesign/index.vue"),
  // },
]
const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
