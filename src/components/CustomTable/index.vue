<template>
  <div class="custom-table" v-loading="loading">
    <slot name="table-header"></slot>
    <el-table ref="tableRef" v-bind="{ ...$attrs, ...Table.props }" v-loading="loading" :data="tableData"  size="small"
      @sort-change="handleSortChange">
      <!-- 序号列 -->
      <el-table-column v-if="Table.config.index" type="index" :index="Table.config.indexMethod" label="序" width="60"
        align="center" />

      <!-- selection 列 -->
      <el-table-column width="55" v-if="Table.config.selection" align="center">
        <template #header>
          <div class="selection-header-wrapper">
            <div style="display: flex; align-items: center; justify-content: center;">
              <!-- 复选框单独控制 -->
              <el-checkbox :model-value="isCurAllSelected" @change="toggleAllSelection" :indeterminate="isIndeterminate"
                style="margin-right: 4px" />
              <!-- 下拉菜单仅由箭头触发 -->
              <el-dropdown trigger="click" @command="handleCommand">
                <el-icon style="cursor: pointer; position: absolute;transform: translate(-2px, -8px);">
                  <arrow-down />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="all" v-if="selectionConfig.type === 'cur'">选中全部</el-dropdown-item>
                    <el-dropdown-item command="cancel" v-else>取消全选</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </template>

        <template #default="{ row }">
          <el-checkbox :model-value="isSelected(row)" @change="(checked) => handleRowCheck(checked, row)" />
        </template>
      </el-table-column>


      <!-- 数据列 -->
      <template v-for="column in Table.config.columns" :key="column.prop">
        <el-table-column :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
          :align="column.align || 'left'" :fixed="column.fixed" :sortable="column.sortable"
          :show-overflow-tooltip="column.showOverflowTooltip !== false">
          <template #header="{ column }">
            <slot :name="`header-${column.prop}`" :column="column">
              <span>{{ column.label }}</span>
            </slot>
          </template>
          <template #default="{ row, $index }">

            <!-- 图片列 -->
            <el-image v-if="column.isImg"
              :style="{ width: (column.imgWidth || 48) + 'px', height: (column.imgHeight || 48) + 'px' }"
              :src="row[column.prop]" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
              :preview-src-list="[row[column.prop]]" fit="cover" hide-on-click-modal preview-teleported />

            <!-- 可扩展列放这里 -->

            <!-- 操作列 -->
            <div class="action-btns" v-else-if="column.prop === 'action' && Table.config.actionBtns.length">
              <el-button v-for="btn in Table.config.actionBtns" :key="btn.name" :type="btn.type" class="action-btn"
                v-bind="btn.props || {}" @click="btn.click(row, $index)">
                {{ btn.name }}
              </el-button>
            </div>

            <!-- 默认列 -->
            <slot :name="`column-${column.prop}`" :row="row" :index="$index" v-else>
              <span>{{ renderDefaultCell(row, column) }}</span>
            </slot>
          </template>

        </el-table-column>
      </template>

      <!-- 空数据 -->
      <template #empty>
        <slot name="empty">
          <div class="empty-text"><el-empty description="暂无数据" /></div>
        </slot>
      </template>

    </el-table>
    <div class="footer" v-if="Table.config.page">
      <div class="hd" v-if="Table.config.selection && selectNum">
        <el-button type="primary" link @click="cancel" v-if="isCurHasSelected">取消</el-button>
        <span class="line" v-if="isCurHasSelected"></span>
        <el-checkbox v-model="isCancelChecked">已选 {{ selectNum }}条</el-checkbox>
        <span class="line"></span>
        <div class="batch-options-list-btn" ref="containerRef">
          <!-- 所有按钮先渲染在“测量区”（隐藏） -->
          <div ref="measureRef" class="measure-area" >
            <a class="select-btn" ref="buttonRefs" v-for="(btn,index) in batchBtns" :key="index" @click="btn.click(btn)"  style="visibility: hidden; position: absolute; white-space: nowrap;box-sizing: border-box;">
              <div class="icon-font-wrap">
                <SvgcIcon :name="btn.type" style="margin-right: 5px;"></SvgcIcon>
                </div>
              <span class="select-text">{{ btn.name }}</span>
            </a>
          </div>
          <!-- 实际显示区域 -->
          <a class="select-btn" v-for="(btn,index) in visibleButtons" :key="index" @click="btn.click(btn)" :style="{minWidth: btn.width}">
            <div class="icon-font-wrap">
               <SvgcIcon :name="btn.type" style="margin-right: 5px;"></SvgcIcon>
              </div>
            <span class="select-text">{{ btn.name }}</span>
          </a>

          <el-dropdown  v-if="hiddenButtons.length" @command="(btn)=>btn.click(btn)">
            <el-button  link>
              更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="btn in hiddenButtons" :key="btn.name" :command="btn"> <SvgcIcon :name="btn.type" style="margin-right: 5px;"></SvgcIcon> <span class="select-text">{{ btn.name }}</span></el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </div>
      </div>
      <div class="bt">
        <div class="select-info">
          总 {{ Page.props.total }} 条, 每页显示 {{ Page.props.pageSize }} 条 
        </div>
        <el-pagination v-bind="{ ...$attrs, ...Page.props }" @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
          <!-- 自定义插槽，可扩展额外内容 -->
          <slot />
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch,onMounted, onUnmounted,nextTick } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import useSelection from './composables/useSelection.js'
import SvgcIcon from '../SvgIcon/index.vue'

// 批量操作映射
const actionMap = {
  'undo': { name: '撤销',type:'undo', click: (row) => { console.log('撤销', row) } },
  'del': { name: '删除',type:'del', click: (row) => { console.log('删除', row) } },
  'enable': { name: '启用',type:'enable', click: (row) => { console.log('启用', row) } },
  'print': { name: '打印',type:'print', click: (row) => { console.log('打印', row) } },
  'review': { name: '审核',type:'review', click: (row) => { console.log('审核', row) } },
  'disable': { name: '禁用',type:'disable', click: (row) => { console.log('禁用', row) } },
  'pass': { name: '通过', click: (row) => { console.log('通过', row) } },
  'reject': { name: '拒绝', click: (row) => { console.log('拒绝', row) } },
}

const actionInfo = {
  isLoad: false,
  with:[]
}

const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      table: {
        config: {

        },
        props: {

        }
      },
      pagination: {
        props: {

        },
        config: {

        }
      }
    })
  }
})

// 表格配置
const Table = computed(() => {
  const defaultConfig = {
    data: [], // 数据源
    columns: [], // 表格列
    selection: false, // 是否显示多选框
    index: false, // 是否显示序号列
    page: true, // 是否显示分页
    actionBtns: [], // 操作列按钮
    indexMethod: (index) => {
      return index + 1 + (defaultPageProps.value.currentPage - 1) * defaultPageProps.value.pageSize
    }, // 序号列方法
  }
  const defaultProps = {
    stripe: false, // 是否显示斑马纹
    border: true, // 是否显示边框
    height: '100%', // 表格高度
    rowKey: 'id', // 行键
  }
  return {
    props: {
      ...defaultProps,
      ...(props.config.table?.props || {})
    },
    config: {
      ...defaultConfig,
      ...(props.config.table?.config || {})
    }
  }
})
// 默认分页属性
const defaultPageProps = ref({
  total: 0,
  currentPage: 1,
  pageSize: 50,
  pageSizes: [50, 100],
  background: true,
  layout: 'prev, pager, next, sizes'
})
// 默认分页配置
const defaultPageConfig = ref({
  alias: {
    total: 'total',
    pageNum: 'page',
    pageSize: 'size'
  }
})
// 分页配置
const Page = computed(() => {
  return {
    props: {
      ...defaultPageProps.value,
      ...(props.config?.pagination?.props || {})
    },
    config: {
      ...defaultPageConfig.value,
      ...(props.config?.pagination?.config || {})
    }
  }
})

// 批量操作按钮
const batchBtns = computed(() => {
  return Table.value.config.batchBtns.map(item => {
    return {
      ...actionMap[item.type],
      ...item
    }
  })
})

const containerRef = ref(null);// 默认显示前6个
const measureRef = ref(null);
const buttonRefs = ref([]);

const hiddenButtons = ref([]); // 其余隐藏
const visibleButtons = ref([]);


let timer = null
// 计算哪些按钮可见
const calculateVisibleButtons =  () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    const container = containerRef.value;
    const measureArea = measureRef.value;
    const buttons = batchBtns.value;
    if (!container || !measureArea) return;
  
    const containerWidth = container.clientWidth;
    let totalWidth = 0;
    let visibleCount = 0;
  
    // “更多”按钮预留宽度（约 53px）
    const moreButtonWidth = 53;
   
    // 遍历每个按钮的实际宽度
    for (let i = 0; i < buttonRefs.value.length; i++) {
      const btnEl = buttonRefs.value[i];
      const btnWidth = btnEl?.offsetWidth || 73; // fallback
      if(actionInfo.isLoad === false){
        actionInfo.with[i] = btnWidth + 'px';
      }
      // 如果加上这个按钮会超出（且还有剩余按钮），就停止
      if (totalWidth + btnWidth + moreButtonWidth > containerWidth && i < buttons.length - 1) {
        break;
      }
      totalWidth += btnWidth;
      visibleCount = i + 1;
    }
    if(actionInfo.isLoad === false){
      actionInfo.with.forEach((width, index)=>{
        batchBtns.value[index].width = width;
      })
      actionInfo.isLoad = true;
    }

    visibleButtons.value = buttons.slice(0, visibleCount);
    hiddenButtons.value = buttons.slice(visibleCount);
  }, 300)
};

// 事件
const emit = defineEmits([
  'selection-change',
  'sort-change',
  'action',
  'pagination-change'
])
const tableRef = ref(null)
// 计算表格数据
const tableData = ref(Table.value.config.data || [])
const loading = ref(false)
const {
  isCurAllSelected,
  isIndeterminate,
  selectionConfig,
  toggleAllSelection,
  isSelected,
  handleRowCheck,
  handleCommand,
  isCurHasSelected,
  cancelCurSelection,
  selectNum
} = useSelection(Table, tableData, Page)

const isCancelChecked = ref(false);

watch(selectNum, (val) => {
  isCancelChecked.value = val > 0;
  if(val){
    nextTick(() => {
      calculateVisibleButtons();
    });
  }
})
watch(isCancelChecked, (val) => {
  if (!val) {
    handleCommand('cancel');
  }
})
// 处理排序变化
const handleSortChange = (sort) => {
  emit('sort-change', sort)
}

// 取消选择当前页
const cancel = () => {
  isCurAllSelected.value = false;
  isIndeterminate.value = false;
  cancelCurSelection();
}

// 渲染默认单元格
const renderDefaultCell = (row, column) => {
  if (column.formatter) {
    return column.formatter(row, column, row[column.prop], 0)
  }
  return row[column.prop] || '-'
}

// 处理每页条数改变
const handleSizeChange = (val) => {
  defaultPageProps.value.currentPage = 1
  defaultPageProps.value.pageSize = val
  updateList();
}

// 处理当前页码改变
const handleCurrentChange = (val) => {
  defaultPageProps.value.currentPage = val
  updateList();
}

const updateList = () => {
  loading.value = true;
  // 分页参数
  const pagePareams = {
    [Page.value.config.alias.pageNum]: defaultPageProps.value.currentPage,
    [Page.value.config.alias.pageSize]: defaultPageProps.value.pageSize,
  }
  // 额外参数
  const extraParams = Table.value.config.extraParams || {}
  // 合并参数
  let prams = {
    ...(Table.value.config.page ? pagePareams : {}),
    ...extraParams.value
  }
  // 参数转换
  if (typeof Table.value.config.transformPram === 'function') {
    prams = Table.value.config.transformPram(prams)
  }
  // 请求数据
  Table.value.config.api(prams).then(res => {
    tableData.value = res.data || [];
    defaultPageProps.value.total = res.total
  }).finally(() => {
    loading.value = false;
  })
}

updateList();

const resize = ()=>{
  nextTick(() => {
    calculateVisibleButtons();
  });
}
onMounted(()=>{
  window.addEventListener('resize', resize)
  resize()
})
onUnmounted(()=>{
  window.removeEventListener('resize', resize)
})
defineExpose({
  tableRef,
  handleCommand,
  handleCurrentChange,
  selectionConfig
})
</script>

<style scoped>
.custom-table {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* background-color: #eee; */
  height: 100%;
}

.custom-table .table-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}

.custom-table .el-table {
  height: 100%;
}

.custom-table :deep(.el-scrollbar__wrap--hidden-default) {
  display: flex;
}

.footer {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer .hd {
  height: 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  border-top: 1px solid #1447ff;
}

.footer .bt {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.select-info {
  line-height: 32px;
  color: #262626;
  font-size: 14px;
  font-variant: tabular-nums;
  font-feature-settings: "tnum";
}

.line {
  width: 1px;
  height: 12px;
  background: #bec4ca;
  margin: 0 8px 0 6px;
}

.select-btn {
  min-width: 73px;
  display: block;
  height: 48px;
  line-height: 48px;
  padding: 0 12px;
  color: #262626;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color .3s;
  display: flex;
  box-sizing: border-box;
}

.icon-font-wrap {
  /* width: 16px;
  height: 16px; */
  color: rgb(82, 196, 26);
  font-size: 12px;
  display: flex;
    align-items: center;
  overflow: hidden;
}

.select-btn-text {
  color: #262626;
  vertical-align: middle;
  margin-left: 4px;
  font-size: 14px;
}
.batch-options-list-btn {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.batch-options-list-btn .select-btn:hover {
    background: #e7ecff;
     color: #0052d9;
}
.batch-options-list-btn .select-btn:hover .icon-font-wrap {
    color: #0052d9!important;
}

</style>
