<template>
    <div class="tabs-box">
        <div class="left">
            <div v-for="(item, tindex) in tabs" :key="tindex" :class="{ active: active === tindex }"
            @click="changeTab(tindex, item)">
            {{ isUseLang ? $t(item.name) : item.name }} <span v-if="isCount">( {{ item.num || 0 }} )</span>
        </div>
        </div>
        <div class="right">
             <el-button v-bind="{...$attrs, ...(btn.props || {})}" v-for="btn in buttons" :key="btn.name" @click="()=>btn.click(router,pageCommonState)">
                <SvgIcon v-if="btn.icon" :name="btn.icon" style="padding-right: 2px;"></SvgIcon>
                {{ isUseLang ? $t(btn.name):btn.name }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useLangConfig from '../composables/useLangConfig.js'
const router = useRouter()
const { isUseLang } = useLangConfig()
defineOptions({
    name: 'Tab',
})
const props = defineProps({
    tabs: {
        type: Array,
        default: () => []
    },
    buttons: {
        type: Array,
        default: () => []
    },
    pageCommonState:{
        type: Object,
        default: () => ({})
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
    emit('change', {item,index})
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
    display: flex;
    justify-content: space-between;
    .left{
        display: flex;
        &>div {
            flex: 0 0 auto;
            height: 48px;
            padding: 0 16px;
            font-family: @regular-family;
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
    .el-button{
        border-radius: 8px!important;
        height: 36px!important;
    }
    .right{
        display: flex;
        align-items: center;
        // :deep(.el-button:hove){
        //     background-color: auto!important;
        // }
        :deep(.el-button:hover){
            background-color: #0052d9!important;
        }
    }
}
</style>