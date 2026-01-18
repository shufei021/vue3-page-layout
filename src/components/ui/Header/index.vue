<template>
    <div class="page-header" v-if="right.length || (left.length>1 && !right.length)">
        <div class="page-left" >
            <slot name="header-left">
                <el-breadcrumb  v-if="left.length>1" separator="/" class="breadcrumb">
                   <el-breadcrumb-item :to="{ ...(item.to || {} ) }" v-for="item in left" :key="item.name">{{ isUseLang ? $t(item.name) : item.name }}</el-breadcrumb-item>
               </el-breadcrumb>
            </slot>
        </div>
        <div class="page-right">
            <el-button v-bind="{...$attrs, ...(btn.props || {})}" v-for="btn in right" :key="btn.name" @click="()=>btn.click(router)">
                <SvgIcon v-if="btn.icon" :name="btn.icon" style="padding-right: 2px;"></SvgIcon>
                {{ isUseLang ? $t(btn.name):btn.name }}
            </el-button>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import SvgIcon from '../SvgIcon/index.vue'
import useLangConfig from '../composables/useLangConfig.js'
const { isUseLang } = useLangConfig()
const router = useRouter()
defineOptions({
    name: 'PageHeader'
})
const props = defineProps({
    config: {
        type: Object,
        default: () => ({})
    },
    pageState: {
        type: Object,
        default: () => ({})
    }
})

const left = computed(() => { 
    return (props.config?.path || []).map(item => {
        if(typeof item === 'string'){
            return {
                name: item
            }
        } else {
            return item
        }
    })
})
const right = computed(() => { 
    return props.config?.buttons || []
})

defineExpose({
    left: ()=>left.value,
    right: ()=>right.value
})
</script>
<style scoped>
.page-header {
    height: 56px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    background-image: linear-gradient(0deg, #fff, #e9f2fe 90%, #e9f2fe 0);
    border-bottom: 1px solid #e6ebf1;
}

.page-left {
    font-size: 18px;
    font-weight: 600;
    color: #262626;
}

.page-right .el-button{
    border-radius: 8px!important;
    height: 36px!important;
}
.breadcrumb {
    display: flex;
    align-items: center;
}
</style>