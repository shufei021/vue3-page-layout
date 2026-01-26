<template>
    <div class="slider-com">
        SliderRight
        {{ config.type }}
        <el-input v-model="config.config.name" style="width: 240px" placeholder="Please input" />
        {{ config.config.name }}
    </div>
</template>
<script setup>
import { watch } from 'vue';
defineOptions({
    name: 'SliderRight'
})
const props = defineProps({
    config: {
        type: Object,
        default: () =>( {})
    }
})

console.log('%c [ props.config ]-19', 'font-size:13px; background:pink; color:#bf2c9f;', props.config)
// watch(() => props.config, (newVal) => {
//     console.log(newVal.config)
// },{
//     immediate: true
// })
</script>
<style scoped>
.slider-com {
    height: 200px;
    background-color: blueviolet;
}
</style>