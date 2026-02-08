<template>
  <el-select v-if="compType === 'ElSelect'"  v-bind="mergeProps" class="form-item">
    <el-option  v-for="item in mergeProps.options" :key="item.value" :label="isUseLang? $t(item.label) : item.label" :value="item.value" />
  </el-select>
  <component v-else :is="comMap[compType || 'ElInput']" v-bind="mergeProps" ref="dynamicCompRef" class="form-item">
    <template v-for="(slotFn, slotName) in ($slots || {})" #[slotName]="slotProps = {}" :key="slotName">
      <slot v-if="slotFn" :name="slotName" v-bind="slotProps" />
    </template>
  </component>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'
import { ElInput, ElSelect, ElDatePicker, ElTimePicker, ElTimeSelect,ElInputNumber } from 'element-plus'
import 'element-plus/dist/index.css'
import useLangConfig from '../composables/useLangConfig.js'
const { isUseLang } = useLangConfig()
// ------------- Props 定义 -------------
const props = defineProps({
  // 组件类型（如 'ElInput'、'ElSelect'）
  compType: {
    type: String,
    required: true
  },
  // 组件自定义属性
  compProps: {
    type: Object,
    default: () => ({})
  },
  // v-model 绑定值
  modelValue: {
    type: [String, Number, Boolean, Array, Date, Object],
    default: ''
  },
  // v-model 触发事件（input/change/select 等）
  modelEvent: {
    type: String,
    default: 'input'
  },
  events:{
    type: Object,
    default: () => ({})
  }
})
const comMap = {
  ElInput,
  ElSelect,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElInputNumber
}
const attrs = useAttrs()
// ------------- 核心逻辑 -------------


// 2. 合并属性：attrs + 自定义属性 + v-model 绑定
const mergeProps = computed(() => {
  return {
    // 透传父组件 attrs（placeholder/disabled 等）
    ...attrs,
    // v-model 核心绑定
    'onUpdate:modelValue': (val) => {
      emit('update:modelValue', val)
    },
    // 绑定组件原生事件（适配不同组件的 v-model 触发事件）
    [`on${props.modelEvent.charAt(0).toUpperCase()}${props.modelEvent.slice(1)}`]: (val) => {
      emit('update:modelValue', val)
    },
    modelValue: props.modelValue,
     // 自定义属性（优先级更高）
    ...props.compProps,
    ...props.events
  }
})
// 3. 组件实例 ref
const dynamicCompRef = ref(null)

// 4. 定义事件发射
const emit = defineEmits(['update:modelValue'])

// 5. 对外暴露实例和通用方法
defineExpose({
  dynamicCompRef,
  // 通用聚焦方法
  focus: () => dynamicCompRef.value?.focus?.(),
  // 通用清空方法
  clear: () => dynamicCompRef.value?.clear?.()
})
</script>
<style scoped>
  .form-item {
    /* min-width: 230px; */
    width: 100%!important;
    height: 30px;
  }
</style>