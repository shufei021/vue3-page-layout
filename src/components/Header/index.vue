<template>
    <div class="page-header">
        <div class="page-left">
             <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ ...(item.to || {} ) }" v-for="item in left" :key="item.name">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-right">
            <el-button v-bind="{...$attrs, ...(btn.props || {})}" v-for="btn in right" :key="btn.name" @click="btn.click">{{ btn.name }}</el-button>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
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
    display: flex;
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
</style>