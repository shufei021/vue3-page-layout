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
                                    style="max-width: 120px;background-color: #f7f8fa;padding: 0 8px;height:100%;box-sizing:  border-box;"
                                    v-if="item.label">
                                    {{ $t(item.label) }}
                                </el-text>
                            </template>
                            <DynamicFormComp 
                                v-model="form[item.prop]" 
                                :model-event="item.modelEvent || 'input'"
                                :comp-type="item.compType" :events="item.events || {}"
                                :comp-props="{ 
                                    ...item.compProps, 
                                    ...(item.compProps && item.compProps.placeholder ? { placeholder: item.compProps.placeholder } : {}), 
                                    ...(item.compType === 'ElDatePicker' ? { startPlaceholder: item.compProps.startPlaceholder || '开始日期', endPlaceholder: item.compProps.endPlaceholder || '结束日期' } : {}) 
                                }">
                            </DynamicFormComp>
                        </el-form-item>
                        <!-- <CollectionCategory v-if="formCategory" :form="form" /> -->
                    </div>
                    <div class="btn-group">
                        <el-button @click="reset" v-if="showRest" style="width: 106px;">重置</el-button>
                        <el-button @click="submit" type="primary">
                            <SearchQuery></SearchQuery> 
                            查询
                        </el-button>
                        <el-button @click="btn.click" v-bind="btn.props || {}" v-for="(btn, index) in actions"
                            :type="btn.type" :key="index">{{ btn.name
                            }}</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="status" @click="expand" v-if="isMore">
            <span style="color: #1447ff;" @click.stop="reset(1)">重置</span>
            <span>{{ isOPen ? '收起' : '展开' }}<el-icon :class="{ up: !isOPen }">
                    <DArrowRight />
                </el-icon></span>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, reactive, watch, toRaw, onMounted, onUnmounted, watchEffect } from 'vue'
import DynamicFormComp from './DynamicFormComp.vue'
import SearchQuery from '@/assets/search-icon.svg'
// import CollectionCategory from './CollectionCategory.vue'
import { DArrowRight } from '@element-plus/icons-vue'
const props = defineProps({
    // 绑定值
    config: {
        type: Object,
        default: () => ({})
    }
})
// const SearchQueryIcon = ref(SearchQuery)
const emit = defineEmits(['submit'])
const formRef = ref(null)
const formItems = computed(() => props.config.formItems)
const actions = computed(() => props.config.actions)
const showRest = computed(() => props.config.showRest)
// const formCategory = computed(() => props.config.formCategory)
const form = reactive({})
const leftRef = ref(null)
const isMore = ref(true)
const isOPen = ref(false)
watch(formItems, (newVal) => {
    newVal.forEach(item => {
        if (!(item.prop in form)) {
            form[item.prop] = item.defaultValue || ''
        }
    })
}, { immediate: true })

const reset = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        formRef?.value.resetFields?.()
        emit('submit', toRaw(form))
        isOPen.value = false
    }, 300)
}
let timer = null
const submit = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        emit('submit', toRaw(form))
        isOPen.value = false
    }, 300)
}
const expand = () => {
    isOPen.value = !isOPen.value
}
const resize = () => {
    const el = leftRef.value
    if (el) {
        const { offsetHeight } = el
        isMore.value = offsetHeight > 32
    }
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
        height: 32px;
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
                    :deep(.el-form-item__label) {
                        padding: 0;
                        height: 30px;
                    }
                }
            }

            :deep(.el-select__wrapper) {
                box-shadow: none;
                border: none;
                height: 30px;
                box-sizing: border-box;
                min-height: 30px !important;
            }

            :deep(.el-input__wrapper) {
                box-shadow: none;
                border: none;
                height: 30px;
                box-sizing: border-box;
            }

            :deep(.el-textarea .el-textarea__inner) {
                box-shadow: none !important;
                border: none !important;
                // min-height: 30px !important;
                box-sizing: border-box;
                // line-height: 30px;
            }

        }

        .btn-group {
            padding-left: 10px;

            :deep(.el-button) {
                flex-grow: 0;
                flex-shrink: 0;
                height: 100%;
                height: 32px;
                line-height: 32px;
                border-radius: 4px !important;
            }
        }
    }

    :deep(.el-form--inline .el-form-item) {
        margin: 0;
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

:deep(.el-button [class*=el-icon] svg) {
    width: 24px;
    height: 24px;
}

</style>