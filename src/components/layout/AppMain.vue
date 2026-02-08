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
import { routes } from '@/router'
const activeMenu = ref('0-0')
const editableTabsValue = ref('0')


const editableTabs = ref([
    {
        title: routes[0].children[0].meta.title,
        name:  routes[0].children[0].meta.title,
        content: '',
    }
])
const handleMenuSelect = ({nav,index,idx}) => {
  if(editableTabs.value.some(item => item.name === nav.meta.title)) return
    editableTabs.value.push({
      title: nav.meta.title,
      name: nav.meta.title,
      content: '',
    })
    editableTabsValue.value = `${index}-${idx}`
}


const handleTabsEdit = (
  targetName,
  action
) => {
  if (action === 'add') {
    // const newTabName = `${++tabIndex}`
    // editableTabs.value.push({
    //   title: 'New Tab',
    //   name: newTabName,
    //   content: 'New Tab content',
    // })
    // editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    console.log('%c [ action ]-81', 'font-size:13px; background:pink; color:#bf2c9f;', action)
    // const tabs = editableTabs.value
    // let activeName = editableTabsValue.value
    // if (activeName === targetName) {
    //   tabs.forEach((tab, index) => {
    //     if (tab.name === targetName) {
    //       const nextTab = tabs[index + 1] || tabs[index - 1]
    //       if (nextTab) {
    //         activeName = nextTab.name
    //       }
    //     }
    //   })
    // }
    // editableTabsValue.value = activeName
    // editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
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