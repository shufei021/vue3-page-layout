import Header from './Header/index.vue'
import SearchForm from './SearchForm/index.vue'
import CustomTable from './CustomTable/index.vue'
import Page from './Page/index.vue'
import SvgIcon from './SvgIcon/index.vue'
console.log('%c [ Page ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', Page)
const langSet =  (app)=>{
    app.config.globalProperties.$uiLangConfig = {
        reset: {
            text: '重置',
            origin:'common.reset'
        },
        search: {
            text: '查询',
            origin:'common.search'
        },
        add: {
            text: '新增',
            origin:'common.add'
        },
        edit:{
            text: '编辑',
            origin:'common.edit'
        },
        delete:{
            text: '删除',
            origin:'common.delete'
        },
        cancel: {
            text: '取消',
            origin:'common.cancel'
        },
        confirm: {
            text: '确定',
            origin:'common.confirm'
        },
        batchDelete: {
            text: '批量删除',
            origin:'common.batchDelete'
        },
        batchEdit: {
            text: '批量编辑',
            origin:'common.batchEdit'
        },
        batchAdd:{
            text: '批量新增',
            origin:'common.batchAdd'
        }
    }
    new Proxy(app.config.globalProperties.$uiLangConfig, {
        get(target, key) {
            return target[key].origin
        }
    })
}
export { Header, SearchForm, CustomTable, Page, SvgIcon,langSet }
