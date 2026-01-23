<template>
  <div class="store-design">
    <Header></Header>
    <div class="content">
      <Left></Left>
      <Middle></Middle>
      <Right></Right>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Left from "./components/Left.vue";
import Middle from "./components/canvas/Middle.vue";
import Right from "./components/Right.vue";

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