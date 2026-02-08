/*
* @Description: 分类级别搜索组件
* @LastEditors: Please set LastEditors
* @LastEditTime: 2021-09-07 17:09:05
*/
<template>
    <!-- <div class="collection-category"> -->
    <el-form-item prop="firstCategoryId">
        <el-select v-model="form.firstCategoryId" :placeholder="$t('group.firstCategory')"
            @change="searchSecordCategory" clearable>
            <el-option v-for="item in list.firstCategory" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
    </el-form-item>
    <el-form-item prop="secondCategoryId">
        <el-select v-model="form.secondCategoryId" :placeholder="$t('group.secondCategory')"
            @change="searchThirdCategory" clearable>
            <el-option v-for="item in list.secondCategory" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
    </el-form-item>
    <el-form-item prop="thirdCategoryId">
        <el-select v-model="form.thirdCategoryId" :placeholder="$t('group.thirdCategory')" clearable>
            <el-option v-for="item in list.thirdCategory" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
    </el-form-item>
    <!-- </div> -->
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { 
  fetchFirstCategory,
  fetchSecordCategory,
  fetchThirdCategory,
} from '@api/product'
const props = defineProps({
    form: {
        type: Object,
        default: () => ({})
    }
})

const list = reactive({
    firstCategory: [],
    secondCategory: [],
    thirdCategory: []
})
const getFirstCategory = () => {
    fetchFirstCategory().then((res) => {
        if (res.success && res.data?.length) {
            list.firstCategory = res.data
        }
    })
}

const searchSecordCategory = () => {
    props.form.secondCategoryId = '';
    props.form.thirdCategoryId = '';
    list.secondCategory = [];
    list.thirdCategory = [];
    if (!props.form.firstCategoryId) return
    fetchSecordCategory({
        firstCategoryId: props.form.firstCategoryId
    }).then((res) => {
        if (res.success && res.data?.length) {
            list.secondCategory = res.data
        }
    })
}
const searchThirdCategory = () => {
    props.form.thirdCategoryId = '';
    list.thirdCategory = [];
    if (!props.form.secondCategoryId) return
    fetchThirdCategory({
        secondCategoryId: props.form.secondCategoryId
    }).then((res) => {
        if (res.success && res.data?.length) {
            list.thirdCategory = res.data
        }
    })
}

onMounted(() => {
    getFirstCategory();

})
</script>
<style scoped lang="less">
// .collection-category{
//     min-width: 600px;
//     display: flex;
//     gap: 10px;
//      .el-form-item{
//         flex: 1;
//         border: 1px solid #E2E7F5;
//         border-radius: 4px !important;
//     }
// }
.el-form-item {
    // border: 1px solid #E2E7F5;
    border-radius: 8px !important;
    box-sizing: border-box;
    .el-form-item__label {
         padding: 0;
        border-radius: 8px;
        overflow: hidden;
    }
}

</style>