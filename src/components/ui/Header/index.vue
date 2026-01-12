<template>
    <div class="page-header">
        <div class="page-left">
             <el-breadcrumb separator="/" class="breadcrumb">
                <el-breadcrumb-item :to="{ ...(item.to || {} ) }" v-for="item in left" :key="item.name">{{ isUseLang ? $t(item.name) : item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-right">
            <el-button v-bind="{...$attrs, ...(btn.props || {})}" v-for="btn in right" :key="btn.name" @click="btn.click">
                <SvgIcon v-if="btn.icon" :name="btn.icon" style="padding-right: 2px;"></SvgIcon>
                {{ isUseLang ? $t(btn.name):btn.name }}
            </el-button>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import useLangConfig from '../composables/useLangConfig.js'
import  SvgIcon from '../SvgIcon/index.vue'
const { isUseLang } = useLangConfig()
defineOptions({
    name: 'PageHeader'
})
const props = defineProps({
    config: {
        type: Object,
        default: () => ({})
    }
})

const left = computed(() => { 
    return props.config.path.map(item => {
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
    return props.config.buttons || []
})
</script>
<style scoped>
.page-header {
    height: 50px;
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
.breadcrumb {
    display: flex;
    align-items: center;
}
</style>