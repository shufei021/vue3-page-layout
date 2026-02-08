<template>
    <div class="page">
        <CustomTable :config="config"></CustomTable>
    </div>
</template>
<script setup>
import {CustomTable} from "@/components/ui";
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
    table: {
        config: {
            selection: true,
            columns: [
                {
                    prop: 'id',
                    label: 'orderNo',
                },
                {
                    prop: 'totalAmount',
                    label: 'orderAmount',
                },

                {
                    prop: 'status',
                    label: 'orderStatus',
                    // formatter: (row) => {
                    //     return row.status && t(CUSTOMER_ORDER_STATUS[row.status]) || '-'
                    // }
                },
                {
                    prop: 'payMethod',
                    label: 'paymentType',

                },
                {
                    prop: 'createTime',
                    label: 'submitTime',
                },
                {
                    prop: 'action',
                    label: 'operation',
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

</script>
<style scoped>
.page {
    height: 100%;
    overflow: hidden;
}
</style>