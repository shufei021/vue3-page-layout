/**
 * @description: AppContainer 布局整体容器
 */
<template>
    <div class="app-container">
        <AppHeader></AppHeader>
        <AppMain></AppMain>
    </div>
</template>
<script setup>
import AppHeader from './AppHeader.vue'
import AppMain from './AppMain.vue'
</script>
<style scoped>
.app-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
</style>