<template>
    <div class="tabs-box">
        <div v-for="(item, tindex) in tabs" :key="tindex" :class="{ active: active === tindex }"
            @click="changeTab(tindex, item)">
            {{ isUseLang ? $t(item.name) : item.name }} <span v-if="isCount">( {{ item.num || 0 }} )</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useLangConfig from '../composables/useLangConfig.js'
const { isUseLang } = useLangConfig()
defineOptions({
    name: 'Tab',
})
const props = defineProps({
    tabs: {
        type: Array,
        default: () => []
    },
    isCount: Boolean // 是否计数
})
const emit = defineEmits(['change'])
const active = ref(0)
const changeTab = (index, item) => {
    if (index === active.value) {
        return;
    }
    active.value = index;
    emit('change', item,index)
}

</script>

<style scoped lang="less">
.tabs-box {
    height: 48px;
    display: flex;
    border-bottom: 1px solid #E7E7E7;
    margin: 0 10px;
    box-sizing: border-box;
    margin-bottom: 16px;
    &>div {
        flex: 0 0 auto;
        height: 48px;
        padding: 0 16px;
        // font-family: @regular-family;
        font-weight: 400;
        font-size: 14px;
        color: rgba(26, 26, 26, 0.5);
        cursor: pointer;
        line-height: 48px;
        box-sizing: border-box;
    }

    &>div.active {
        color: #0052D9;
        border-bottom: 3px solid#0052D9;
    }
}
</style>