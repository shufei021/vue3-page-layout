<!-- src/components/Sidebar.vue -->
<template>
  <el-aside width="260px" class="sass-sidebar">
    <!-- 菜单 -->
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      :background-color="isDarkTheme ? '#1a1d28' : '#f9fafc'"
      :text-color="isDarkTheme ? '#a0a4b8' : '#6b7280'"
      :active-text-color="isDarkTheme ? '#7c3aed' : '#7c3aed'"
      :unique-opened="true"
    >
      <!-- Page -->
      <el-sub-menu :index="index" v-for="(route,index) in routes">
        <!-- 图标 -->
        <template #title>
          <el-icon><TrendCharts /></el-icon>
          <span>Page组件</span>
        </template>

        <el-menu-item :index="`${index}-${idx}`" @click="navigate(navItem,index,idx)"  v-for="(navItem,idx) in route.children">
          <el-icon><TrendCharts /></el-icon>{{ navItem.meta.title }}
        </el-menu-item>

        <!-- <el-menu-item index="1-1" @click="navigate('/')">
          <el-icon><TrendCharts /></el-icon> Page概览
        </el-menu-item>

        <el-menu-item index="1-2" @click="navigate('/customTable')">
          <el-icon><Setting /></el-icon> Page分析
        </el-menu-item> -->

      </el-sub-menu>

      <!-- <el-sub-menu index="1">
        <template #title>
          <el-icon><TrendCharts /></el-icon>
          <span>Page组件</span>
        </template>
        <el-menu-item index="1-1" @click="navigate('/')">
          <el-icon><TrendCharts /></el-icon> Page概览
        </el-menu-item>
        <el-menu-item index="1-2" @click="navigate('/customTable')">
          <el-icon><Setting /></el-icon> Page分析
        </el-menu-item>
      </el-sub-menu> -->
      
      <!-- 客户管理 -->
      <!-- <el-sub-menu index="2">
        <template #title>
          <el-icon><User /></el-icon>
          <span>客户管理</span>
        </template>
        <el-menu-item index="2-1" @click="navigate('/customer/list')">
          客户列表
          <el-badge :value="12" />
        </el-menu-item>
        <el-menu-item index="2-2" @click="navigate('/customer/group')">
          客户分组
        </el-menu-item>
        <el-menu-item index="2-3" @click="navigate('/customer/follow-up')">
          跟进记录
        </el-menu-item>
      </el-sub-menu>
       -->
      <!-- 产品服务 -->
      <!-- <el-sub-menu index="3">
        <template #title>
          <el-icon><ShoppingCart /></el-icon>
          <span>产品服务</span>
        </template>
        <el-menu-item index="3-1" @click="navigate('/product/catalog')">
          产品目录
        </el-menu-item>
        <el-menu-item index="3-2" @click="navigate('/product/orders')">
          订单管理
          <el-badge :value="8" />
        </el-menu-item>
        <el-menu-item index="3-3" @click="navigate('/product/service')">
          服务记录
        </el-menu-item>
      </el-sub-menu>
       -->
      <!-- 系统设置 -->
      <!-- <el-sub-menu index="4">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </template>
        <el-menu-item index="4-1" @click="navigate('/system/users')">
          用户管理
        </el-menu-item>
        <el-menu-item index="4-2" @click="navigate('/system/roles')">
          角色权限
        </el-menu-item>
        <el-menu-item index="4-3" @click="navigate('/system/logs')">
          系统日志
        </el-menu-item>
      </el-sub-menu>
       -->
      <!-- 其他菜单 -->
      <!-- <el-menu-item index="5" @click="navigate('/documentation')">
        <el-icon><Document /></el-icon>
        <span>文档中心</span>
      </el-menu-item>
       -->
      <!-- <el-menu-item index="6" @click="navigate('/help')">
        <el-icon><Phone /></el-icon>
        <span>帮助支持</span>
        <el-badge is-dot />
      </el-menu-item> -->
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  TrendCharts, User, ShoppingCart, Setting,
  Document, Phone
} from '@element-plus/icons-vue'
import { routes } from '@/router'
const props = defineProps({
  activeMenu: String
})

const emit = defineEmits(['menu-select'])
const router = useRouter()


// 导航到对应路由
const navigate = (nav,index,idx) => {
  router.push(nav.path)
  emit('menu-select', {nav,index,idx})
}

// 检查当前主题
const isDarkTheme = computed(() => {
  return document.documentElement.getAttribute('data-theme') === 'dark'
})
</script>

<style lang="scss" scoped>
.sass-sidebar {
  background: var(--sidebar-bg, #f9fafc);
  border-right: 1px solid var(--sidebar-border, #e5e7eb);
  height: calc(100vh - 60px);
  position: sticky;
  top: 60px;
  
  .sidebar-menu {
    border-right: none;
    height: 100%;
    
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 48px;
      line-height: 48px;
      
      &:hover {
        background-color: var(--sidebar-hover, #f3f4f6);
      }
      
      &.is-active {
        background-color: var(--primary-light, rgba(124, 58, 237, 0.1));
        color: var(--primary-color, #7c3aed);
      }
    }
    
    .el-badge {
      margin-left: auto;
    }
  }
}
</style>