import Header from "./Header/index.vue";
import SearchForm from "./SearchForm/index.vue";
import CustomTable from "./CustomTable/index.vue";
import Page from "./Page/index.vue";
import SvgIcon from "./SvgIcon/index.vue";
const langSet = (app) => {
  if(!app.config.globalProperties?.$t){
    app.config.globalProperties.$isNotLang = true
    app.config.globalProperties.$t = (val)=>val
  }
  app.config.globalProperties.$uiLangConfig = {
    reset: {
      cn: "重置",
      en: "Reset",
      origin: "common.reset",
    },
    search: {
      cn: "查询",
      en: "Search",
      origin: "common.search",
    },
    add: {
      cn: "新增",
      en: "Add",
      origin: "common.add",
    },
    edit: {
      cn: "编辑",
      en: "Edit",
      origin: "common.edit",
    },
    delete: {
      cn: "删除",
      en: "Delete",
      origin: "common.delete",
    },
    cancel: {
      cn: "取消",
      en: "Cancel",
      origin: "common.cancel",
    },
    detail: {
      cn: "取消",
      en: "Cancel",
      origin: "common.detail",
    },
    confirm: {
      cn: "确定",
      en: "Confirm",
      origin: "common.confirm",
    },
    batchDelete: {
      cn: "批量删除",
      en: "Batch Delete",
      origin: "common.batchDelete",
    },
    batchEdit: {
      cn: "批量编辑",
      en: "Batch Edit",
      origin: "common.batchEdit",
    },
    batchAdd: {
      cn: "批量新增",
      en: "Batch Add",
      origin: "common.batchAdd",
    },
    collapse: {
      cn: "收起",
      en: "Collapse",
      origin: "common.Collapse",
    },
    expand: {
      cn: "展开",
      en: "Expand",
      origin: "common.Expand",
    },
    more: {
      cn: "更多",
      en: "More",
      origin: "common.more",
    },
    noData: {
      cn: "暂无数据",
      en: "No Data",
      origin: "group.noData",
    },
    selectAll: {
      cn: "选中全部",
      en: "Select All",
      origin: "common.selectAll",
    },
    clearAll: {
      cn: "取消全部",
      en: "Clear All",
      origin: "common.clearAll",
    },
    cancelOrder: {
      cn: "取消订单",
      en: "Cancel Order",
      origin: "common.cancelOrder",
    },
    delete: {
      cn: "删除",
      en: "Delete",
      origin: "common.delete",
    },
    enable: {
      cn: "启用",
      en: "Enable",
      origin: "common.enable",
    },
    print: {
      cn: "打印",
      en: "Print",
      origin: "common.print",
    },
    review: {
      cn: "审核",
      en: "Review",
      origin: "common.review",
    },
    disable: {
      cn: "禁用",
      en: "Disable",
      origin: "common.disable",
    },
    approve: {
      cn: "通过",
      en: "Approve",
      origin: "common.approve",
    },
    reject: {
      cn: "拒绝",
      en: "Reject",
      origin: "common.reject",
    },
    selectAll: {
      cn: "选中全部",
      en: "Select All",
      origin: "common.selectAll",
    },
    // 内部使用，可以根据需求继续扩展语言包
    PRIVATE_INFO: {
      isPrivate: true,

      total: {
        cn: "已选 {count} 条",
        en: "{count} selected",
        ar: "{count} مُحددة",
      },
      page: {
        cn: "总 {total} 条, 每页显示 {pageSize} 条",
        en: "{total} total, {pageSize} per page",
        ar: "المجموع: {total}، يُعرض {pageSize} في كل صفحة",
      },
    },
  };
};
export { Header, SearchForm, CustomTable, Page, SvgIcon, langSet };
