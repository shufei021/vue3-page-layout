<template>
  <div id="app" :class="{'dark-theme': isDarkTheme}">
    <!-- 顶部导航栏 -->
    <el-header class="sass-header">
      <div class="header-container">
        <div class="logo-section">
          <img src="https://element-plus.org/images/element-plus-logo.svg" alt="Logo" class="logo">
          <h1 class="system-title">SaaS管理系统</h1>
        </div>
        
        <div class="header-actions">
          <el-switch
            v-model="isDarkTheme"
            active-text="深色"
            inactive-text="浅色"
            @change="toggleTheme"
            class="theme-switch"
          />
          
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="36" :src="userAvatar" />
              <span class="username">{{ userName }}</span>
              <el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>账户设置</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          
          <el-button type="primary" class="notification-btn">
            <el-badge :value="3" class="item">
              <el-icon size="20"><bell /></el-icon>
            </el-badge>
          </el-button>
        </div>
      </div>
    </el-header>
    
    <!-- 主容器布局 -->
    <el-container class="main-container">
     <!-- 侧边栏菜单 -->
      <Sidebar 
        :active-menu="activeMenu"
        @menu-select="handleMenuSelect"
      />
      
      <!-- 主内容区 -->
      <el-container>
        <el-main class="sass-main">
          <!-- 路由出口 -->
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
   </el-container>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Bell, ArrowDown, PieChart, User, ShoppingCart,
  Setting, Document, Phone, Money, TrendCharts,
  Refresh, Download, Plus, Edit, Upload
} from '@element-plus/icons-vue'
import Sidebar from './components/layout/Sidebar.vue'
// 主题状态
const isDarkTheme = ref(false)

// 用户信息
const userName = ref('管理员')
const userAvatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')

// 菜单状态
const breadcrumb = ref(['仪表盘', '数据概览'])
const activeMenu = ref('1-1')

// 方法
const toggleTheme = () => {
  document.documentElement.setAttribute('data-theme', isDarkTheme.value ? 'dark' : 'light')
  console.log(`主题已切换为: ${isDarkTheme.value ? '深色' : '浅色'}`)
}

// 初始化
onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('theme') || 'light'
  isDarkTheme.value = savedTheme === 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)
})
const handleMenuSelect = (key) => {
  breadcrumb.value = key.split('-')
  activeMenu.value = key
}
</script>

<style lang="scss" scoped>
// 定义CSS变量
:root {
  --primary-color: #409eff;
  --success-color: #67c23a;
  --warning-color: #e6a23c;
  --danger-color: #f56c6c;
  --info-color: #909399;
  
  // 浅色主题
  --bg-color: #f5f7fa;
  --sidebar-bg: #304156;
  --sidebar-text: #bfcbd9;
  --header-bg: #ffffff;
  --header-text: #303133;
  --card-bg: #ffffff;
  --text-color: #303133;
  --border-color: #e4e7ed;
}

[data-theme="dark"] {
  // 深色主题
  --bg-color: #141414;
  --sidebar-bg: #1f1f1f;
  --sidebar-text: #a0a0a0;
  --header-bg: #1f1f1f;
  --header-text: #e0e0e0;
  --card-bg: #242424;
  --text-color: #e0e0e0;
  --border-color: #434343;
}

// 全局样式
#app {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

// 顶部导航栏
.sass-header {
  height: 60px;
  background-color: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .logo {
      height: 36px;
      width: auto;
    }
    
    .system-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--header-text);
      margin: 0;
    }
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
    
    .theme-switch {
      margin-right: 10px;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      
      .username {
        font-weight: 500;
        color: var(--header-text);
      }
    }
    
    .notification-btn {
      font-size: 20px;
      color: var(--header-text);
    }
  }
}

// 主容器
.main-container {
  min-height: calc(100vh - 100px);
  background: linear-gradient(135deg, rgba(230, 233, 240, 0.8) 0%, rgba(238, 242, 255, 0.9) 25%, rgba(245, 247, 255, 0.85) 50%, rgba(255, 245, 250, 0.9) 75%, rgba(240, 235, 248, 0.8) 100%);
}

// 左侧边栏
.sass-sidebar {
//   background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  transition: all 0.3s;
  background-color: #eee;
  
  .sidebar-menu {
    border-right: none;
    height: 100%;
    
    :deep(.el-sub-menu__title),
    :deep(.el-menu-item) {
      height: 56px;
      line-height: 56px;
    }
    
    :deep(.el-menu-item.is-active) {
      background-color: rgba(64, 158, 255, 0.1);
    }
    :deep(.el-menu-item:hover){
      background-color: #409EFF;
      color: #fff;
    }
    :deep(.el-sub-menu__title:hover){
      background-color: #409EFF ;
      color: #fff;
    }
  }
}

// 主内容区
.sass-main {
  padding: 20px;
  background-color: var(--bg-color);
  
  .breadcrumb {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-color);
      margin: 0;
    }
  }
  
  .content-cards {
    margin-bottom: 24px;
    
    .metric-card {
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background-color: var(--card-bg);
      
      .metric-content {
        display: flex;
        align-items: center;
        
        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          font-size: 20px;
          color: white;
          
          &.revenue {
            background-color: var(--primary-color);
          }
          
          &.users {
            background-color: var(--success-color);
          }
          
          &.orders {
            background-color: var(--warning-color);
          }
          
          &.conversion {
            background-color: var(--danger-color);
          }
        }
        
        .metric-info {
          flex: 1;
          
          .metric-value {
            font-size: 24px;
            font-weight: 600;
            color: var(--text-color);
            margin-bottom: 4px;
          }
          
          .metric-label {
            font-size: 14px;
            color: var(--info-color);
          }
        }
        
        .metric-trend {
          font-size: 14px;
          font-weight: 500;
          
          &.up {
            color: var(--success-color);
          }
          
          &.down {
            color: var(--danger-color);
          }
        }
      }
    }
  }
  
  .main-content-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .pagination-container {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}

// 右侧边栏
.right-sidebar {
  padding: 20px;
  background-color: var(--bg-color);
  border-left: 1px solid var(--border-color);
  
  .quick-actions-card,
  .activity-timeline-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    margin-bottom: 20px;
    
    .card-header {
      font-weight: 600;
      color: var(--text-color);
    }
  }
  
  .quick-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .quick-action-btn {
      width: 100%;
      justify-content: flex-start;
    }
  }
}



// 响应式设计
@media (max-width: 1200px) {
  .sass-sidebar {
    width: 220px !important;
  }
  
  .right-sidebar {
    width: 260px !important;
  }
}

@media (max-width: 992px) {
  .sass-sidebar {
    position: fixed;
    left: -260px;
    top: 60px;
    height: calc(100vh - 60px);
    z-index: 999;
    
    &.mobile-open {
      left: 0;
    }
  }
  
  .right-sidebar {
    display: none;
  }
  
  .content-cards .el-col {
    margin-bottom: 16px;
  }
}

@media (max-width: 768px) {
  .header-actions .theme-switch {
    display: none;
  }
  
  .system-title {
    font-size: 18px !important;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 12px;
    
    .page-actions {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>