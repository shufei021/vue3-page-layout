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
           type="border-card"
            editable
            v-model="editableTabsValue"
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
const activeMenu = ref('0-0')
let tabIndex = 2
const editableTabsValue = ref('0-0')
const handleMenuSelect = ({nav,index,idx}) => {
  console.log('%c [ handleMenuSelect ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', nav)
  if(editableTabs.value.some(item => item.name === nav.meta.title)) return
//   breadcrumb.value = key.split('-')
//   activeMenu.value = key
    editableTabs.value.push({
      title: nav.meta.title,
      name: nav.meta.title,
    })
    editableTabsValue.value = `${index}-${idx}`
}


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
.main-container{
    overflow: hidden;
}
.view-container{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}
:deep(.el-tabs__content){
    display: none;
}
.sass-main{
    flex: 1;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
</style>