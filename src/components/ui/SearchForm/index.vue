<template>
    <div class="page-layout-header" :class="{ more: isMore }">
        <div class="content" :class="{ 'header-pack': !isOPen }">
            <div class="form-wrap">
                <el-form :inline="true" :model="form" class="form" ref="formRef" @submit.prevent="submit">
                    <div class="left" ref="leftRef">
                        <el-form-item v-for="item in formItems" :key="item.prop" :prop="item.prop"
                            :style="{ 'grid-column': `span ${item.span || 1}` }">
                            <template #label>
                                <el-text line-clamp="1"
                                    style="max-width: 220px;background-color: #f7f8fa;padding: 0 8px;height:100%;box-sizing:  border-box;display: flex;"
                                    v-if="item.label">
                                    {{isUseLang ? $t(item.label) : item.label}} <span v-if="item.type === 'currency'"> <SvgIcon name="currency" style="width: 12px;color: #1a1a1a;margin-left: 4px;"></SvgIcon> </span>
                                </el-text>
                            </template>
                            <RangeNumber :config="{item,form,resetAction}" v-if="item.compType === 'RangeNumber'" />
                            <DynamicFormComp 
                                v-else
                                v-model="form[item.prop]" 
                                :model-event="item.modelEvent || 'input'"
                                :comp-type="item.compType" 
                                :events="item.events || {}"
                                :comp-props="{ 
                                    clearable:true,
                                    ...item.compProps,
                                    ...(item.compProps && item.compProps.placeholder ? { placeholder: isUseLang? $t(item.compProps.placeholder) : item.compProps.placeholder } : {}), 
                                    ...(item.compType === 'ElDatePicker' ? { startPlaceholder: isUseLang? $t(item.compProps.startPlaceholder) : 'Start Date', endPlaceholder:  isUseLang? $t(item.compProps.endPlaceholder) : 'End Date' } : {}) 
                                }">
                            </DynamicFormComp>
                        </el-form-item>
                        <!-- <CollectionCategory v-if="formCategory" :form="form" /> -->
                    </div>
                    <div class="btn-group" :style="{width:(config.btnGroupWidth) + 'px'}" :class="{noReset: !showRest }">
                        <el-button @click="reset" v-if="showRest && !isMore" style="width: 72px;">{{Lang.reset}}</el-button>
                        <el-button @click="submit" type="primary" style="margin:0">
                            <SvgIcon name="search" style="padding-right: 2px;"></SvgIcon> 
                            {{Lang.search}}
                        </el-button>
                        <el-button 
                            @click="btn.click(router)" 
                            v-bind="btn.props || {}" 
                            v-for="(btn, index) in actions"
                            :key="index">
                            <SvgIcon v-if="btn.icon" :name="btn.icon" style="padding-right: 2px;"></SvgIcon>
                            {{ isUseLang ? $t(btn.name) : btn.name }}
                        </el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="status" @click="expand" v-if="isMore">
            <span style="color: #1447ff;" @click.stop="reset(1)">{{Lang.reset}}</span>
            <span>{{ isOPen ? transform(Lang.PRIVATE_INFO.collapse,{}) : transform(Lang.PRIVATE_INFO.expand,{}) }}<el-icon :class="{ up: !isOPen }">
                    <DArrowRight />
                </el-icon></span>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, reactive, watch, toRaw, onMounted, onUnmounted, watchEffect,nextTick } from 'vue'
import DynamicFormComp from './DynamicFormComp.vue'
import { DArrowRight } from '@element-plus/icons-vue'
import useLangConfig from '../composables/useLangConfig.js'
import SvgIcon from '../SvgIcon/index.vue'
// import CollectionCategory from './CollectionCategory.vue'
import RangeNumber from './RangeNumber.vue'
import { useRouter } from 'vue-router'
const { Lang,transform, isUseLang } = useLangConfig()
const router = useRouter()
const props = defineProps({
    // 绑定值
    config: {
        type: Object,
        default: () => ({})
    }
})
const emit = defineEmits(['submit'])
const formRef = ref(null)
const formItems = computed(() => props.config.formItems)
const actions = computed(() => props.config.actions)
const showRest = computed(() => props.config.showRest)
const formCategory = computed(() => props.config.formCategory)
const form = reactive({})
const leftRef = ref(null)
const isMore = ref(true)
const isOPen = ref(false)
watch(formItems, (newVal) => {
    newVal.forEach(item => {
        if(item.compType === 'RangeNumber'){
            if (!(item.props[0] in form)) {
                form[item.props[0]] = item.minDefaultValue
            }
            if (!(item.props[1] in form)) {
                form[item.props[1]] = item.maxDefaultValue
            }
        } else{
            if (!(item.prop in form)) {
                form[item.prop] = item.defaultValue
            }
            if(item.compType === 'ElInputNumber'){
                form[item.prop] = item.defaultValue || null
            }
        }
    })
}, { immediate: true })

const resetAction =  ref(false)

const reset = () => {
    clearTimeout(timer)
    resetAction.value = true
    timer = setTimeout(() => {
        formRef?.value.resetFields?.()
        resetAction.value = false
        emit('submit', toRaw(form))
         if(props.config.isPack){
            isOPen.value = true
            isMore.value = false
        } else{
            isOPen.value = false
        }
    }, 300)
}
let timer = null
const submit = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        emit('submit', toRaw(form))
        if(props.config.isPack){
            isOPen.value = true
            isMore.value = false
        } else{
            isOPen.value = false
        }
    }, 300)
}
const expand = () => {
    isOPen.value = !isOPen.value
}
const resize = () => {
    nextTick(() => {
        const el = leftRef.value
        if (el) {
            const { offsetHeight } = el
            if(props.config.isPack){
             isOPen.value = true
             isMore.value = false
           } else{
               isMore.value = offsetHeight > 50
           }
        }
    });
}
watchEffect(() => {
    resize()
})
onMounted(() => {
    resize()
    window.addEventListener('resize', resize)
})
onUnmounted(() => {
    window.removeEventListener('resize', resize)
})
defineExpose({
    form,
})
</script>
<style scoped lang="less">
.page-layout-header {
    --el-color-primary: #0052d9;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    width: 100%;
    border-bottom: 1px solid #e6ebf1;
    position: relative;
    box-sizing: border-box;
    min-width: 965px;
    .content {
        width: 100%;
        max-height: 230px;
        background: #fff;
        overflow: auto;
    }

    .status {
        z-index: 18;
        cursor: pointer;
        position: absolute;
        bottom: -18px;
        width: 132px;
        height: 21px;
        left: 50%;
        margin-left: -55px;
        font-size: 12px;
        color: #262626;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;

        // padding: 0 22px;
        .el-icon {
            transform: rotate(90deg);
        }

        .el-icon.up {
            transform: rotate(-90deg) !important;
        }
    }

    .header-pack {
        height: 44px;
        overflow: hidden;
    }

    .form-wrap {
        flex: 1;

        .form {
            display: flex;
            .left {
                flex: 1;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(244px, 1fr));
                gap: 10px;
                align-items: flex-start; 
                .el-form-item {
                    box-sizing: border-box;
                    border: 1px solid #E2E7F5;
                     border-radius: 8px !important;
                     overflow: hidden;
                    
                    :deep(.el-form-item__label) {
                        padding: 0;
                        // border-radius: 8px;
                        border-top-left-radius: 8px;
                        border-bottom-left-radius:8px ;
                        overflow: hidden;
                    }
                     :deep(.label-has){
                        border-top-left-radius: 0!important;
                        border-bottom-left-radius: 0!important;
                    }
                }
                .form-item{
                    height: 100%;
                    //  box-shadow: 0 0 0 1px #dcdfe6 inset;
                }
            }
            :deep(.el-select__wrapper) {
                box-shadow: none;
                // border: none;
                // height: 40px;
            }

            :deep(.el-input__wrapper) {
                // box-shadow: 0 0 0 1px #dcdfe6 inset;
                border: none;
                height: 40px !important;
                overflow: hidden !important;
                border-radius: 8px !important;
                box-sizing: border-box;
                box-shadow: none;
                // height: 40px;
                // box-shadow: 0 0 0 1px #dcdfe6 inset;
            }
            :deep(.el-textarea .el-textarea__inner){
                // box-shadow: none!important;
                // box-shadow: 0 0 0 1px #dcdfe6 inset;
                border: none!important;
                min-height: 40px!important;
                box-sizing: border-box;
                line-height: 32px;
            }

        }

        .btn-group {
            padding-left: 10px;

            :deep(.el-button) {
                border-radius: 8px !important;
            }
        }
    }

    :deep(.el-form--inline .el-form-item) {
        margin: 0;
    }
    :deep(.el-form--inline .el-form-item) {
        margin: 0;
    }
    :deep(.el-form-item > label + .el-form-item__content .el-select__wrapper){
        border: none;
    }

    .form-container {
        display: flex;
    }

    .right {
        margin-left: 10px;
        display: flex;
        align-items: end;

        :deep(.el-button) {
            border-radius: 4px !important;
        }
    }

}

.more {
    .content {
        &::after {
            z-index: 18;
            content: "";
            width: 142px;
            height: 20px;
            position: absolute;
            bottom: -20px;
            left: 50%;
            margin-left: -62px;
            background: #fff;
            border: 1px solid #e6ebf1;
            border-top: 0;
            transform: perspective(40px) rotateX(343deg);
            box-shadow: 0 3px 3px rgba(0, 0, 0, .15);
        }
    }

    &:hover .status {
        border-bottom: none;
    }

    &:hover {
        border-bottom: 1px solid #1d48d4;
    }

    &:hover .status {
        color: #1d48d4;
    }

    &:hover .content::after {
        background: linear-gradient(180deg, #fff, #e7ecff);
        border: 1px solid #1d48d4;
        border-top: none;
    }
}
:deep(.el-button [class*=el-icon] svg){
    width: 24px;
    height: 24px;
}

:deep(.el-textarea__inner) {
  /* 隐藏滚动条（现代浏览器） */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
:deep(.el-textarea__inner::-webkit-scrollbar) {
  display: none; /* Chrome/Safari */
}

</style>