<template>
  <div class="header">
    <el-button size="large" type="primary">预览</el-button>
    <el-button size="large" type="primary" @click="save">保存</el-button>
  </div>
</template>

<script  setup>
const save = () => {
    // 保存前 弹窗 让填 该商城页面的相关信息
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 50px;
    /* background-color: rgb(214, 200, 200); */
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>