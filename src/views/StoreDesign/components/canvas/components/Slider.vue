<template>
    <div class="slider-com">
        slider 组件
       <div>组件类型： {{ viewConfig.type }}</div>
       <div>组件name：  {{ viewConfig.config.name }}</div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
    config: {
        type: Object,
        default: () => null
    },
    initConfig:{
        type: Object,
        default: () => ({
            type: 'Slider',
            config: {
                name:'11111'
            }
        })
    }
})
const viewConfig = computed(() => ({
    ...props.initConfig,
    ...(props.config || {}),
}))
console.log('%c [ viewConfig ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', props)
</script>
<style scoped>
.slider-com {
    height: 200px;
    background-color: blueviolet;
    color: #fff;
}
</style>