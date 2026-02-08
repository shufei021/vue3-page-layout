<template>
    <!-- 主容器布局 -->
    <el-container class="main-container">

     <!-- 侧边栏菜单 -->
      <Sidebar 
        :active-menu="activeMenu"
        @menu-select="handleMenuSelect"
      />
      <!-- 主内容区 -->
      <el-container class="view-container">
        <el-tabs
            v-model="editableTabsValue"
           type="border-card"
            editable
            class="demo-tabs"
            @edit="handleTabsEdit"
        >
            <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>
       
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
    
</template>

<script  setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
// 菜单状态
const breadcrumb = ref(['仪表盘', '数据概览'])
const activeMenu = ref('1-1')
const handleMenuSelect = (key) => {
  breadcrumb.value = key.split('-')
  activeMenu.value = key
}
let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])
const handleTabsEdit = (
  targetName,
  action
) => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}
</script>

<style scoped>
.view-container{
    display: flex;
    flex-direction: column;
}
:deep(.el-tabs__content){
    display: none;
}
.sass-main{
    padding: 0;
}
</style>