<template>
  <div class="right">
   <div v-if="rightComponent">
    <component :is="rightComponent" :config="config"></component>
   </div>
   <div v-else >
     暂无组件信息
   </div>
  </div>
</template>

<script setup>
import { watch, ref, shallowRef } from 'vue'
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const rightComponent = shallowRef(null)
const modules = import.meta.glob('./components/*.vue', { eager: true });
const map = {};
for (const path in modules) {
  const module = modules[path];
  const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
  map[fileName] = module.default;
}
watch(() => props.config, (val) => {
  rightComponent.value = map[`${val.type}Right`]
})
</script>

<style scoped>
.right {
  width: 350px;
  height: 100%;
  background-color: #eee;
}
</style>