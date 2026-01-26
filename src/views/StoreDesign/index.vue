<template>
  <div class="store-design">
    <Header></Header>
    <div class="content">
      <Left></Left>
      <Middle @outputComponentConfig="outputComponentConfig"></Middle>
      <Right :config="activeConfig"></Right>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Left from "./components/Left.vue";
import Middle from "./components/canvas/Middle.vue";
import Right from "./components/right/Right.vue";
import { ref } from "vue";
const activeConfig = ref(null);
const outputComponentConfig = (component) => {
  activeConfig.value = component.rightConfig;
  console.log('%c [ activeConfig.value ]-21', 'font-size:13px; background:pink; color:#bf2c9f;', activeConfig.value)
}
</script>

<style scoped length="less">
.store-design{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .content{
    flex: 1;
    display: flex;
  }
}

</style>