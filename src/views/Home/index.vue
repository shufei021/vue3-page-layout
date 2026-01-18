<template>
    <div class="button-row">
      <!-- 每个按钮传入不同的 id，用于区分跳转目标 -->
      <el-button type="primary" @click="to(1)">商城装修示例</el-button>
      <el-button type="success" @click="to(2)">Page示例</el-button>
      <el-button type="info" @click="to(3)">Header 示例</el-button>
      <el-button type="warning" @click="to(4)">SearchForm 示例</el-button>
      <el-button type="danger" @click="to(5)">Table 示例</el-button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // 根据 id 跳转到不同路由
  const to = (id) => {
    let path = '/design' // 默认路径
  
    // 可以根据 id 映射到不同页面（你也可以用 switch 或对象映射）
    switch (id) {
      case 1:
        path = '/design'         // 商城装修
        break
      case 2:
        path = '/page-demo'      // Page 示例
        break
      case 3:
        path = '/header-demo'    // Header 示例
        break
      case 4:
        path = '/search-form'    // SearchForm 示例
        break
      case 5:
        path = '/table-demo'     // Table 示例
        break
      default:
        path = '/design'
    }
  
    router.push({ path })
  }
  </script>
  
  <style scoped>
  .button-row {
    padding: 20px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  </style>