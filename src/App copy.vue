<template>
  <div class="page">
      <PageLayout  :config="config">
          <template #header-top>
              <div class="margin-top"></div>
          </template>
          <template #column-totalAmount="{row}">
              <div> {{ row.totalAmount }}</div>
          </template>
      </PageLayout>
  </div>
</template>
<script setup>
import PageLayout from "./components/PageLayout/index.vue";
// import { getCustomerOrderList  } from "../../utils/api/customerOrder";
// const router = useRouter()
const api = (page) => {
    console.log('%c [ page ]-19', 'font-size:13px; background:pink; color:#bf2c9f;', page.page)
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
  formConfig: {
      formItems: [
          {
              prop: 'keyword',
              compType: 'ElInput',
              compProps: {
                  placeholder: 'customerOrder.placeholder',
                  style:{
                      width: '600px'
                  }
              },
              modelEvent: 'input'
          }
      ]
  },
  tableConfig: {
      showSelection: true,
      columns: [
          {
              prop: 'id',
              label: 'returnOrder.orderNo',
          },
          {
              prop: 'totalAmount',
              label: 'returnOrder.orderAmount',
          },
         
          {
              prop: 'status',
              label: 'customerOrder.orderStatus',
              // formatter: (row) => {
              //     return row.status && t(CUSTOMER_ORDER_STATUS[row.status]) || '-'
              // }
          },
           {
              prop: 'payMethod',
              label: 'customerOrder.paymentType',
              
          },
           {
              prop: 'createTime',
              label: 'customerOrder.submitTime',
          },
           {
              prop: 'action',
              label: 'common.operation',
          }
      ],
      actionBtns: [
          {
              name: 'common.detail',
              type: 'primary',
              click: (row) => {
                 
              }
          }
      ],
      api
  }
}
</script>
<style scoped>
.page{
  line-height: inherit;
  height:100%;
  background-color: #fff;
  overflow: hidden;
}
  .margin-top{
      height: 24px;
      background-color: #F6F8FC;
  }
 
</style>