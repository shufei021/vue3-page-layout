<template>
    <div class="page">
        <div class="page-header">
            <div class="page-left">订单列表</div>
            <div class="page-right">
                <el-button type="primary">新增</el-button>
                <el-button type="primary">导出</el-button>
                <el-button type="primary">打印</el-button>
            </div>
        </div>
        <SearchForm :config="formConfig" @submit="submit"></SearchForm>
        <CustomTable ref="rableRef" :config="tableConfig"></CustomTable>
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
import CustomTable from "@/components/CustomTable/index.vue";
import SearchForm from "@/components/SearchForm/index.vue";
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
});
const formConfig = computed(() => {
  return props.config.form;
});
const tableConfig = computed(() => {
  return props.config.table;
});
const rableRef = ref(null);
const submit = () => {
  rableRef.value.handleCommand('cancel');
  rableRef.value.handleCurrentChange(1);
};
</script>
<style scoped>
.page {
    --el-color-primary: #0052d9;
}
.page-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    background-image: linear-gradient(0deg, #fff, #e9f2fe 90%, #e9f2fe 0);
    border-bottom: 1px solid #e6ebf1;
}
.page-left{
    font-size: 18px;
    font-weight: 600;
    color: #262626;
}
</style>