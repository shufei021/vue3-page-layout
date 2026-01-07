<template>
    <Page :config="config"></Page>
</template>
<script setup>
import Page from "@/components/Page/index.vue";
const api = (page) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = Array.from({ length: page.size }, (_, i) => {
                return {
                    id: i + 1 + (page.page) * page.size,
                    "addressId": 0,
                    "createTime": "2025-11-12",
                    "paymentTime": "2025-11-12",
                    "payMethod": "ONLINE",
                    "totalAmount": 333.22,
                    "deliveryServiceId": 0,
                    "deliveryCompanyName": "string",
                    "trackingNo": "string",
                    "customerId": 12,
                    "status":  i % 2 ? '0' : 3
                }
            })
            resolve({
                "success": true,
                "code": 200,
                "message": "提示",
                "data":data,
                "total": 100,
                "curPage":1,
                "size": 10
            })
        },100)
    })
}

const config = {
    form:{
         formItems: [
        {
            prop: 'keyword',
            compType: 'ElInput',
            label: '关键字',
            span: 1,
            compProps: {
                placeholder: '请输入',
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
    },
    table:{
        table: {
            config: {
                selection: true,
                columns: [
                    {
                        prop: 'id',
                        label: '订单编号',
                    },
                    {
                        prop: 'totalAmount',
                        label: '订单金额',
                    },
    
                    {
                        prop: 'status',
                        label: '订单状态',
                        // formatter: (row) => {
                        //     return row.status && t(CUSTOMER_ORDER_STATUS[row.status]) || '-'
                        // }
                    },
                    {
                        prop: 'payMethod',
                        label: '支付方式',
    
                    },
                    {
                        prop: 'createTime',
                        label: '提交时间',
                    },
                    {
                        prop: 'action',
                        label: '操作',
                    }
                ],
                actionBtns: [
                    {
                        name: '详情',
                        type: 'primary',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    }
                ],
                api,
                index: true,
                page:true
            }
        }
    }
}

</script>
<style scoped>
.page {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>