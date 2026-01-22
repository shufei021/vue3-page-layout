<template>
  <div class="middle">
    <div class="container">
      <div class="com-warap">

      </div>
    </div>
  </div>
</template>

<script setup>

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