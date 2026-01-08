<template>
    <div class="page">
        <Header :config="headerConfig"></Header>
        <SearchForm :config="formConfig" @submit="submit"></SearchForm>
        <CustomTable ref="rableRef" :config="tableConfig"></CustomTable>
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
import Header from "@/components/Header/index.vue";
import SearchForm from "@/components/SearchForm/index.vue";
import CustomTable from "@/components/CustomTable/index.vue";
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
const submit = () => {
  rableRef.value.handleCommand('cancel');
  rableRef.value.handleCurrentChange(1);
};
</script>
<style scoped>
.page {
    --el-color-primary: #0052d9;
}

</style>