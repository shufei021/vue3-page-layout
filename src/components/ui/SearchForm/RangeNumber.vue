<template>
    <div class="range-number">
        <el-input-number 
        v-model="config.form[config.item.props[0]]" 
        :min="config.item.compProps.min" 
        :max="config.item.compProps.max || 999999999" 
        :placeholder="isUseLang? $t(config.item.compProps.minPlaceholder) : config.item.compProps.minPlaceholder"
        ></el-input-number>
        <span> - </span>
        <el-input-number 
        class="max-input" 
        v-model="config.form[config.item.props[1]]" 
        :min="config.item.compProps.min" 
        :max="config.item.compProps.max || 999999999" 
        :placeholder="isUseLang? $t(config.item.compProps.maxPlaceholder) : config.item.compProps.maxPlaceholder">
            <template #suffix v-if="config.item.compProps.suffix || config.item.compProps.suffixType==='default'">
                <span class="suffix" v-if="isFunc(config.item.compProps.suffix)">
                    <component :is="config.item.compProps.suffix"></component>
                </span>
                <span v-else-if="config.item.compProps.suffixType==='default'" class="suffix">
                    <SvgcIcon name="currency" style="color: #1A1A1A; width: 12px "></SvgcIcon>
                </span>
                <span v-else class="suffix">{{config.item.compProps.suffix}}</span>
            </template>
        </el-input-number>
    </div>
</template>
<script setup>
import SvgcIcon from '../SvgIcon/index.vue'
import useLangConfig from '../composables/useLangConfig.js'
const { Lang,transform, isUseLang } = useLangConfig()
const props = defineProps({
    config: {
        type: Object,
        default: () => ({})
    }
})
const  isFunc = (val) => typeof val === 'function'
watch(() => props.config.resetAction, (newVal) => {
    if(newVal){
        props.config.form[props.config.item.props[0]] = undefined
        props.config.form[props.config.item.props[1]] = undefined
     }
})
</script>
<style scoped lang="less">
.range-number{
    width: 100%;
    display: flex;
    :deep(.el-input-number){
        flex: 1;
    }
    :deep(.el-input-number__increase){
        display: none;
    }
    :deep(.el-input-number__decrease){
        display: none;
    }
    :deep(.el-input-number .el-input__wrapper){
        padding-left: 20px;
        padding-right: 20px;
    }
    :deep(.el-input-number){
        width: 60px;
    }
    :deep(.el-input__wrapper){
        box-shadow: none!important;
    }
    .suffix{
        background-color: #f5f7fa;
        height: 100%;
        line-height: 38px;
        padding: 0 4px;
        min-width: 20px;
    }
    .max-input{
        :deep(.el-input__wrapper){
            padding-right: 0;
        }
    }
}
</style>