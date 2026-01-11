<template>
    <div class="page">
      {{ lang.reset }}
        <Header v-if="headerConfig" :config="headerConfig"></Header>
        <SearchForm v-if="formConfig" :config="formConfig" @submit="submit"></SearchForm>
        <CustomTable v-if="tableConfig" ref="rableRef" :config="tableConfig"></CustomTable>
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
import Header from "../Header/index.vue";
import SearchForm from "../SearchForm/index.vue";
import CustomTable from "../CustomTable/index.vue";
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const lang = computed(() => {
  const langConfig = instance?.appContext.config.globalProperties.$uiLangConfig || {}
  return new Proxy(langConfig, {
    get(target, key) {
      return target[key].origin  
    }
  })
})



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