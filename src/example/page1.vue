<template>
    <Page :config="config" ref="pageRef"></Page>
</template>
<script setup>
import { Page } from "@/components/ui"
import { ref, toRaw } from "vue";
import { ElButton, ElTag } from "element-plus";
import { de } from "element-plus/es/locales.mjs";

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
                    url: 'https://gips3.baidu.com/it/u=3935430539,3622545779&fm=3074&app=3074&f=PNG?w=2048&h=2048',
                    "status": i % 2 ? '0' : 3
                }
            })
            resolve({
                "success": true,
                "code": 200,
                "message": "提示",
                "data": data,
                "total": 100,
                "curPage": 1,
                "size": 10
            })
        }, 100)
    })
}
const pageRef = ref()
const config = {
    header: {
        path: [{ name: '订单管理',to:{path:'/order/list'} }, '订单列表'],
        buttons: [
        {
            
            name: '新增',
            icon:'add',
            props:{
                type: 'primary',
            },
            click: () => {
                console.log('%c [ pageRef.value ]-52', 'font-size:13px; background:pink; color:#bf2c9f;', pageRef.value.pageState.header().left())
                console.log('%c [ pageRef.value ]-52', 'font-size:13px; background:pink; color:#bf2c9f;', pageRef.value.pageState.header().right())
                console.log('%c [ pageRef.value ]-52', 'font-size:13px; background:pink; color:#bf2c9f;', toRaw(pageRef.value.pageState.form().outerForm))
                console.log('%c [ pageRef.value ]-52', 'font-size:13px; background:pink; color:#bf2c9f;', pageRef.value.pageState.table())
            }
        },
        { 
            name: '导出',
            props:{
                type: 'success',
            },
            click: () => {} 
        },
        { 
            name: '打印',
            click: () => {}
        }
    ]
    },
    form: {
        showRest: true,
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
    table: {
        table: {
            config: {
                selection: true,
                isShowSelectAll: true,
                columns: [
                    {
                        prop: 'id',
                        label: '订单编号',
                        slots: {
                            default: (row, h) => {
                                return h('div', {},   { default:()=>row.id})
                            },
                            header: (column, h) => {
                                return h('div', {}, { default:()=>'自定义表头11'})
                            }
                        }
                    },
                    {
                        prop: 'totalAmount',
                        label: '订单金额',
                        type: 'currency',
                        props: {
                            style: {
                                // color: 'green',
                            },
                            textStyle: {
                                color: 'blue',
                            }
                        }
                    },

                    {
                        prop: 'status',
                        label: '订单状态',
                        slots: {
                            // default: (row, h) => {
                            //     return h(ElTag, { type: 'primary' }, row.status)
                            // },
                            header: (column, h) => {
                                return h(ElButton, { type: 'primary', onClick: () => console.log('click') },{ default:()=>'自定义表头'})
                            }
                        }
                    },
                    {
                        prop: 'payMethod',
                        label: '支付方式',
                        type: 'tag',
                        formatter: (row) => {
                            return row.payMethod
                        }
                    },
                    {
                        prop: 'url',
                        label: '图片',
                        type: 'img',
                    },
                    {
                        prop: 'createTime',
                        label: '提交时间',
                    },
                    {
                        prop: 'action',
                        label: '操作',
                        width: 300
                    }
                ],
                actionBtns: [
                    {
                        name: '详情',
                        visible: (row) => {
                            return row.id % 2 === 0
                        },
                        props: {
                            // link:true,
                            type: 'success',
                            size: 'small',
                        },
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },
                    {
                        name: '编辑',
                        type: 'success',
                        visible: (row) => {
                            return row.id % 2 === 1
                        },
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },
                    {
                        name: '开启',
                        disable: (row) => {
                            return row.id % 2 === 0
                        },
                        type: 'primary',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    }
                ],
                batchBtns: [
                    {
                        type: 'undo',
                        // name: '取消订单',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },
                    {
                        type: 'del',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },
                    {
                        type: 'enable',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },
                    {
                        type: 'print',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },
                    {
                        type: 'review',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },
                    {
                        type: 'disable',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },
                    {
                        type: 'pass',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },
                    {
                        type: 'reject',
                        click: (row) => {
                            console.log('%c [ click ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', row)
                        }
                    },

                ],
                api,
                index: true,
                page: true,
                tab: {
                    isCount: true,
                    tabApi: ()=>{
                        return new Promise((resolve, reject) => {
                            resolve({
                            "success": true,
                            "code": 200,
                            "data": {
                                "ALL": 5,
                                "CANCELLED": 0,
                                "COMPLETED": 3,
                                "CREATED": 0,
                                "PAID": 2
                            }
                            })
                        })
                    },

                    tabs: [
                        {
                            name: 'order.all',
                            value: 'ALL',
                            num: 0
                        },
                        {
                            name: 'prePaid.tabToPay',
                            value: 'CREATED',
                            num: 0,
                            code: 10,
                        },
                        {
                            name: 'prePaid.tabPaid',
                            value: 'PAID',
                            num: 0,
                            code: 20,
                        },
                        {
                            name: 'prePaid.tabCompleted',
                            value: 'COMPLETED',
                            num: 0,
                            code: 30,
                        },
                        {
                            name: 'prePaid.tabCancelled',
                            value: 'CANCELLED',
                            num: 0,
                            code: 30,
                        }
                    ],
                    transformPram: ({ pageCommon }) => {
                        console.log('%c [transformPram pageCommon ]-380', 'font-size:13px; background:pink; color:#bf2c9f;', pageCommon)
                        return {
                         a:1
                        }
                    },
                    onChange: ({ item, pageCommon, updateList }) => {
                       console.log('%c [onChange updateList ]-386', 'font-size:13px; background:pink; color:#bf2c9f;', updateList)
                       console.log('%c [onChange pageCommon ]-386', 'font-size:13px; background:pink; color:#bf2c9f;', pageCommon)
                       console.log('%c [onChange item ]-386', 'font-size:13px; background:pink; color:#bf2c9f;', item)
                       
                    }
                }
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