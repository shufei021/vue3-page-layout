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
import { useRouter } from 'vue-router'
const activeMenu = ref('0-0')
const editableTabsValue = ref('0-0')
const router = useRouter()

const editableTabs = ref([
    {
        title: routes[0].children[0].meta.title,
        name:  '0-0',
        content: '',
    }
])
const handleMenuSelect = ({nav,index,idx}) => {
     editableTabsValue.value = `${index}-${idx}`
  if(editableTabs.value.some(item => item.name === editableTabsValue.value)) return
    editableTabs.value.push({
      title: nav.meta.title,
      name: `${index}-${idx}`,
      content: '',
    })
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
    editableTabs.value = editableTabs.value.filter((tab) => tab.name !== targetName)
    editableTabsValue.value = editableTabs.value[editableTabs.value.length - 1]?.name || ''
    activeMenu.value = editableTabsValue.value
    router.replace({ path: editableTabs.value[editableTabs.value.length - 1].path || '/' })
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