<template>
  <!-- 表格页面完整模板 -->
    <div class="page">
      <!-- 头部: 左侧面包屑或则自定义或则不显示、右侧操作按钮群组 -->
        <Header v-if="headerConfig" :config="headerConfig" ref="headerRef" :pageState="pageState">
          <template #header-left>
            <slot name="header-left"></slot>
          </template>
        </Header>
        <!-- 搜索表单 -->
        <SearchForm v-if="formConfig" :config="formConfig" @submit="submit" ref="formRef" :pageState="pageState"></SearchForm>
        <!-- 表格 -->
        <CustomTable v-if="tableConfig" :config="tableConfig" ref="tableRef" :pageState="pageState"></CustomTable>
        <slot name="dialog"></slot>
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
import Header from "../Header/index.vue";
import SearchForm from "../SearchForm/index.vue";
import CustomTable from "../CustomTable/index.vue";

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
});
const headerConfig = computed(() => {
  return props.config.header;
});
const formConfig = computed(() => {
  return props.config.form;
});
const tableConfig = computed(() => {
  return props.config.table;
});
const headerRef = ref(null);
const formRef = ref(null);
const tableRef = ref(null);
//  收集子组件的状态统一到父组件，进行对外抛出进行访问和调用
const pageState = computed(() => {
  return {
    header:()=> headerRef.value,
    form:()=> formRef.value,
    table:()=> tableRef.value,
  };
})
const submit = () => {
  tableRef.value.handleCommand('cancel');
  tableRef.value.handleCurrentChange(1);
};
defineExpose({
  handleCommand:(name)=> tableRef.value.handleCommand(name),
  updateList: () => tableRef.value.updateList(),
  selectionConfig: () => tableRef.value.selectionConfig,
  tableData: () => tableRef.value.tableData,
  pageState: pageState,
})
</script>
<style scoped>
.page {
    --el-color-primary: #0052d9;
}
</style>