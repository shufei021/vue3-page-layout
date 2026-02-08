<template>
  <!-- 表格页面完整模板 -->
    <div class="page">
      <!-- 头部: 左侧面包屑或则自定义或则不显示、右侧操作按钮群组 -->
        <Header v-if="headerConfig" :config="headerConfig">
          <template #header-left>
            <slot name="header-left"></slot>
          </template>
        </Header>
        <!-- 搜索表单 -->
        <SearchForm v-if="formConfig" :config="formConfig" ref="formRef" @submit="submit"></SearchForm>
        <slot name="custom"></slot>
        <!-- 表格 -->
        <CustomTable v-if="tableConfig" :pageCommonState="pageCommonState" ref="rableRef" :config="tableConfig">
          <template #table-header>
            <slot name="table-header"></slot>
          </template>
        </CustomTable>
        <slot name="dialog"></slot>
    </div>
</template>
<script setup>
import { computed, ref, toRaw } from "vue";
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

const rableRef = ref(null);
const formRef = ref(null);
const pageCommonState = computed(() => {
  return {
    table: rableRef,
    form: formRef.value? toRaw(formRef.value.form) : {},
  };
});
const submit = () => {
  rableRef.value.handleCommand('cancel');
  rableRef.value.handleCurrentChange(1);
};
defineExpose({
  handleCommand:(name)=> rableRef.value.handleCommand(name),
  updateList: () => rableRef.value.updateList(),
  selectionConfig: () => rableRef.value.selectionConfig,
  tableData: () => rableRef.value.tableData,
})
</script>
<style scoped>
.page {
    --el-color-primary: #0052d9;
}

</style>