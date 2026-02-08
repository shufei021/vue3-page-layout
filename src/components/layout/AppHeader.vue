<template>
    <el-header class="sass-header">
      <div class="header-container">
        <div class="logo-section">
          <!-- <img src="https://element-plus.org/images/element-plus-logo.svg" alt="Logo" class="logo"> -->
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
          
          
          <el-button link class="notification-btn">
              <el-badge :value="3" class="item">
                  <el-icon size="20"><bell /></el-icon>
                </el-badge>
            </el-button>
            <el-dropdown placement="bottom-end">
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
        </div>
      </div>
    </el-header>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import {
  Bell, ArrowDown, PieChart, User, ShoppingCart,
  Setting, Document, Phone, Money, TrendCharts,
  Refresh, Download, Plus, Edit, Upload
} from '@element-plus/icons-vue'
// 主题状态
const isDarkTheme = ref(false)

// 用户信息
const userName = ref('管理员')
const userAvatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')


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

</script>

<style scoped lang="less">
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
  background-color: #fff;
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
      outline: none;
      
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

</style>