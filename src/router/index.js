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
      },
       {
        path: '/case1',
        name: 'Case1',
        component: () =>  import('@/views/Case/Case1.vue'),
        meta: { title: '搜索', index :'1-2'  }
      },
       {
        path: '/full',
        name: 'Full',
        component: () =>  import('@/views/Case/Full.vue'),
        meta: { title: '全功能', index :'1-3'  }
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
