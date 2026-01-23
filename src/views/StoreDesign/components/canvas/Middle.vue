<template>
  <div class="middle">
    <div class="container">
      <div class="com-warap" @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <component :is="component.com" v-for="(component) in components" :key="component.id"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,markRaw } from 'vue'
const modules = import.meta.glob('./components/*.vue', { eager: true });
const map = {};
for (const path in modules) {
    const module = modules[path];
    const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
    map[fileName] = module.default;
}
const dragover = (e) => {
  e.preventDefault();
  e.target.classList.add('drag-over');
}
const dragleave = (e) => {
  e.preventDefault()
  e.target.classList.remove('drag-over');
}
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const components = ref([])
// 处理放置组件（从左侧拖拽过来）
const drop = (e) => {
  e.preventDefault()
  e.target.classList.remove('drag-over');
  const draggingElement = document.querySelector('.draggable.dragging');
  if (draggingElement) {
    // 获取被拖动的元素组件类型
    const type = capitalizeFirstLetter(draggingElement.dataset.type)
    const com = map[type]
    components.value.push({
      id: Date.now(),
      type,
      com:markRaw(com)
    })
    // 将元素移动到当前 dropzone 中
    // e.target.appendChild(draggingElement);
  }
}
</script>

<style scoped lang="less">
.middle {
  flex: 1;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 400px;
    height: 800px;
    background-image: url('../assets/phone-border.png');
    background-repeat: no-repeat;
    background-color: #fff;
    background-size: 95%;
    background-position: center;
    position: relative;

    .com-warap {
      position: absolute;
      width: 341px;
      height: 85%;
      left: 29px;
      top: 76px;
      background-color: aqua;
    }
  }
}
</style>