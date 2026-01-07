<template>
    <SearchForm :config="formConfig"></SearchForm>
</template>
<script setup>
import SearchForm from "@/components/SearchForm/index.vue";
const formConfig = {
    formItems: [
        {
            prop: 'keyword',
            compType: 'ElInput',
            label: '关键字',
            span: 1,
            compProps: {
                placeholder: '请输入',
                disabled : true,
            },
            modelEvent: 'input'
        },

        {
            prop: 'dateMap',
            compType: 'ElDatePicker',
            label: '日期',
            compProps: {
                type: 'monthrange',
                format: "YYYY-MM",
                unlinkPanels: true,
                valueFormat: "YYYY-MM-DD",
            },
            modelEvent: 'input'
        },
        {
            prop: 'size',
            compType: 'ElInput',
            defaultValue: 40,
            label: '数字输入框',
            compProps: {
                placeholder: '数字',
                type: 'number',
            },
            modelEvent: 'input',
            events: {
                onBlur: (val) => {
                    if (val.target.value <= 0) {
                        console.log('%c [  ]-47', 'font-size:13px; background:pink; color:#bf2c9f;', val)
                        //    searchForm.value.form.size = 40;
                    }
                }
            }
        },
        {
            prop: 'status',
            compType: 'ElSelect',
            label: '下拉单选',
            defaultValue: '1',
            compProps: {
                placeholder: '请选择',
                clearable: true,
                options: [
                    {
                        label: '类型1',
                        value: '1'
                    },
                    {
                        label: '类型2',
                        value: '2'
                    },
                ],
            },
            modelEvent: 'change'
        },
        {
            prop: 'status',
            compType: 'ElSelect',
            label: '下拉多选',
            defaultValue: 'COMPLETED',
            compProps: {
                placeholder: '请选择',
                clearable: true,
                multiple: true,
                collapseTags: true,
                collapseTagsTooltip: true,
                options: [
                    {
                        label: '类型1',
                        value: '1'
                    },
                    {
                        label: '类型2',
                        value: '2'
                    },
                    {
                        label: '类型3',
                        value: '3'
                    },
                    {
                        label: '类型4',
                        value: '4'
                    },
                ],
            },
            modelEvent: 'change'
        },
    ]
}

</script>
<style scoped></style>