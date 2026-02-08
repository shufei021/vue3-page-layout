<template>
  <div class="custom-table" v-loading="loading">
    <slot name="table-header"></slot>
    <Tab :pageCommonState="pageCommonState" v-if="tabLoad && Table.config.tab && Table.config.tab.tabs.length"
      :tabs="Table.config.tab.tabs" :buttons="Table.config.tab.buttons || []" :isCount="Table.config.tab.isCount"
      @change="(...args) => onChange(updateList, pageCommonState, ...args)"></Tab>
    <el-table ref="tableRef" v-bind="{ ...$attrs, ...Table.props }" v-loading="loading" :data="tableData" size="small"
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
              <el-dropdown trigger="click" @command="handleCommand" v-if="Table.config.isShowSelectAll">
                <el-icon style="cursor: pointer; position: absolute;transform: translate(-2px, -8px);">
                  <arrow-down />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="all" v-if="selectionConfig.type === 'cur'">{{ Lang.selectAll
                      }}</el-dropdown-item>
                    <el-dropdown-item command="cancel" v-else>{{ Lang.clearAll }}</el-dropdown-item>
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
          <!-- 头部插槽 -->
          <template #header="{ column: col }">
            <component v-if="column.slots.header" :is="column.slots.header(col, h)"></component>
            <slot :name="`header-${col.prop}`" :column="col" v-else>
              <span>{{ col.label }}</span>
            </slot>
          </template>
          <!-- 默认列渲染 -->
          <template #default="{ row, $index }">
            <!-- 操作列 -->
            <div class="action-btns" v-if="column.prop === 'action' && Table.config.actionBtns.length">
              <component :is="column.slots.default(row)"></component>
            </div>
            <!-- 自定义渲染列 -->
            <component v-else-if="column.slots.default" :is="column.slots.default(row, h)"></component>
            <!-- 默认列 -->
            <slot :name="`column-${column.prop}`" :row="row" :index="$index" v-else>
              <span :style="{ ...(column.props && column.props.style || {}) }">{{ renderDefaultCell(row, column)
                }}</span>
            </slot>
          </template>

        </el-table-column>
      </template>

      <!-- 空数据 -->
      <template #empty>
        <slot name="empty">
          <div class="empty-text">
            <SvgcIcon name="empty" style="width: 80px;height: 80px;"></SvgcIcon>
            <div style="line-height: 40px;">{{ Lang.noData }}</div>
            <!-- <el-empty :description="Lang.noData" /> -->
          </div>
        </slot>
      </template>
    </el-table>

    <div class="footer" v-if="Table.config.selection || Table.config.page">
      <div class="hd" v-if="Table.config.selection && selectNum">
        <el-button style="background-color: #fff!important;color:#0052d9!important" type="primary" link @click="cancel"
          v-if="isCurHasSelected">{{ Lang.cancel }}</el-button>
        <span class="line" v-if="isCurHasSelected"></span>
        <el-checkbox v-model="isCancelChecked">
          {{ transform(Lang.PRIVATE_INFO.total, { count: selectNum }) }}
        </el-checkbox>
        <span class="line"></span>
        <div class="batch-options-list-btn" ref="containerRef">
          <!-- 所有按钮先渲染在“测量区”（隐藏） -->
          <div ref="measureRef" class="measure-area">
            <a class="select-btn" ref="buttonRefs" v-for="(btn, index) in batchBtns" :key="index"
              @click="btn.click(btn)"
              style="visibility: hidden; position: absolute; white-space: nowrap;box-sizing: border-box;">
              <div class="icon-font-wrap">
                <SvgcIcon :name="btn.type" style="margin-right: 5px;"></SvgcIcon>
              </div>
              <span class="select-text">{{ btn.name }}</span>
            </a>
          </div>
          <!-- 实际显示区域 -->
          <a class="select-btn" v-for="(btn, index) in visibleButtons" :key="index" @click="btn.click(btn)"
            :style="{ minWidth: btn.width }">
            <div class="icon-font-wrap">
              <SvgcIcon :name="btn.type" style="margin-right: 5px;" :style="btn.style || {}"></SvgcIcon>
            </div>
            <span class="select-text">{{ btn.name }}</span>
          </a>

          <el-dropdown v-if="hiddenButtons.length" @command="(btn) => btn.click(btn)">
            <el-button link>
              {{ Lang.more }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="btn in hiddenButtons" :key="btn.name" :command="btn">
                  <SvgcIcon :name="btn.type" style="margin-right: 5px;"></SvgcIcon> <span class="select-text">{{
                    btn.name }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="bt" v-if="Table.config.page">
        <div class="select-info">
          <!-- {{ transform(Lang.PRIVATE_INFO.page, {total: Page.props.total, pageSize: Page.props.pageSize})}} -->
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
import { computed, ref, watch, onMounted, onUnmounted, nextTick, h, Fragment } from 'vue'
import { ElButton, ElImage, ElTag } from 'element-plus'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import SvgcIcon from '../SvgIcon/index.vue'
import useTab from '../composables/useTab.js'
import useSelection from '../composables/useSelection.js'
import useLangConfig from '../composables/useLangConfig.js'
import useInstanceAttribute from '../composables/useInstanceAttribute.js'
import Tab from '../Tab/index.vue'
import util from '../utils'
import dayjs from 'dayjs'
const { Lang, transform, isUseLang } = useLangConfig()
const t = useInstanceAttribute('$t')
const router = useRouter()
// 批量操作映射
const actionMap = {
  'undo': { name: Lang.value.cancelOrder, type: 'undo', click: (row) => { console.log('撤销', row) } },
  'del': { name: Lang.value.delete, type: 'del', click: (row) => { console.log('删除', row) } },
  'enable': { name: Lang.value.enable, type: 'enable', click: (row) => { console.log('启用', row) } },
  'print': { name: Lang.value.print, type: 'print', click: (row) => { console.log('打印', row) } },
  'review': { name: Lang.value.review, type: 'review', click: (row) => { console.log('审核', row) } },
  'disable': { name: Lang.value.disable, type: 'disable', click: (row) => { console.log('禁用', row) } },
  'pass': { name: Lang.value.approve, click: (row) => { console.log('通过', row) } },
  'reject': { name: Lang.value.reject, click: (row) => { console.log('拒绝', row) } },
}

const actionInfo = {
  isLoad: false,
  with: []
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
  },
  pageCommonState: {
    type: Object,
    default: () => ({})
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
    // indexMethod: (index) => {  // 序号列方法
    //   return index + 1 + (defaultPageProps.value.currentPage - 1) * defaultPageProps.value.pageSize
    // },
  }
  const defaultProps = {
    stripe: false, // 是否显示斑马纹
    border: false, // 是否显示边框
    height: '100%', // 表格高度
    rowKey: 'id', // 行键
  }
  const columns = props.config.table?.config?.columns
  const buttons = props.config.table?.config?.actionBtns
  if (columns) {
    columns.forEach(column => {
      // 没有就初始化一个
      if (!column.slots) {
        column.slots = {}
      }
      if (isUseLang.value) {
        column.label = t(column.label)
      }
      if (column.prop === 'action') {
        column.slots.default = (row) => {
          if (Object.keys(row).length) {
            return h(Fragment, {}, buttons.flatMap((btn, index) => {
              if (typeof btn.visible === 'function') {
                if (!btn.visible(row)) return []
              }
              const style = {
                fontFamily: '"Switzer-Regular"',
                fontWeight: 400,
                fontSize: '14px',
                color: '#0F62FE!important',
                minWidth: 'auto!important',
                borderRadius: '8px!important',
                backgroundColor: 'transparent!important',
              }
              return [h(ElButton, {
                key: index,
                link: true,
                style,
                ...(btn.props || {}),
                disabled: btn.disable ? btn.disable(row) : false,
                onClick: () => btn.click(row, router),
              }, () => isUseLang.value ? t(btn.name) : btn.name)]
            }
            ))
          }
        }
      } else if (column.type === 'img') {
        column.align = "center"
        column.width = column?.prop?.width || '80px'
        column.slots.default = (row) => {
          const { prop: { key, width, height, size } = {} } = column
          const src = key ? row[key] : row.url || row.imgUrl
          return h(ElImage, {
            src,
            previewSrcList: [src],
            hideOnClickModal: true,
            previewTeleported: true,
            style: {
              width: parseInt(width || size || 40) + 'px',
              height: parseInt(height || size || 40) + 'px',
            },
            ...(column.props || {}),
          })
        }
      } else if (column.type === 'currency') {
        column.slots.default = (row) => {
          if (Object.keys(row).length === 0) return null;

          // ✅ 不修改 column，只读取其值
          const size = parseInt(column?.props?.size || 12, 10);
          const width = parseInt(column?.props?.style?.width || size, 10);
          const height = parseInt(column?.props?.style?.height || size, 10);

          const iconProps = {
            name: 'currency',
            style: {
              marginRight: '2px',
              width: `${width}px`,
              height: `${height}px`,
              color: '#1A1A1Aed',
              ...(column?.props?.style || {}),
            },
            ...(column.props ? { ...column.props } : {}),
          };

          delete iconProps.style; 
          const otherProps = { ...column.props };
          delete otherProps.style;

          return h(column?.props?.currency || Fragment, {}, [
            h(SvgcIcon, {
              name: 'currency',
              style: {
                marginRight: '2px',
                width: `${width}px`,
                height: `${height}px`,
                color: '#1A1A1Aed',
                ...(column?.props?.style || {}),
              },
              ...otherProps,
            }),
            h('span', {
              style: {
                ...(column?.props?.textStyle || {}),
              }
            }, renderDefaultCell(row, column))
          ]);
        };
      } else if (column.type === 'tag') {
        column.slots.default = (row) => {
          if (Object.keys(row).length) {
            return h(Fragment, {}, h(ElTag, {
              ...(column.props || {}),
            }, () => renderDefaultCell(row, column))
            )
          }
        }
      } else if (column.type === 'status') {
        column.slots.default = (row) => {
          if (Object.keys(row).length === 0) return null;

          const baseProps = column.props || {};
          const size = parseInt(baseProps.style?.width || baseProps.size || 12);
          const color = baseProps.colorFormat?.(row) || baseProps.color || '#ccc';

          // 构造新的 style 对象（不污染原始 column）
          const dotStyle = {
            marginRight: '4px',
            width: size + 'px',
            height: size + 'px',
            color,
            ...(baseProps.style || {}),
          };

          // 所有数据都来自 row 和 column 的只读属性，不 mutate 任何响应式对象
          return h(Fragment, {}, [
            h(SvgcIcon, {
              name: 'dot',
              ...baseProps,        // 原始 props
              style: dotStyle,     // 覆盖 style（新建对象）
            }),
            h('span', {
               style:{
                  ...(column?.props?.textStyle || {}),
                  ...(typeof column?.props?.textColorFormat === 'function'?{color: column?.props?.textColorFormat(row)}:{})
                }
            }, renderDefaultCell(row, column))
          ]);
        };
      }
    })
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
  pageSizes: [50, 100, 200],
  background: true,
  layout: 'total, sizes, prev, pager, next, jumper'
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
  return (Table.value?.config?.batchBtns || []).map(item => {
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

const { tabLoad, initTabs, active, activeTab, onChange } = useTab(Table, props)
let timer = null
// 计算哪些按钮可见
const calculateVisibleButtons = () => {
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
      if (actionInfo.isLoad === false) {
        actionInfo.with[i] = btnWidth + 'px';
      }
      // 如果加上这个按钮会超出（且还有剩余按钮），就停止
      if (totalWidth + btnWidth + moreButtonWidth > containerWidth && i < buttons.length - 1) {
        break;
      }
      totalWidth += btnWidth;
      visibleCount = i + 1;
    }
    if (actionInfo.isLoad === false) {
      actionInfo.with.forEach((width, index) => {
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
  if (val) {
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
  // 如果是 格式化方法存在，则使用格式化方法返回结果
  if (column.formatter) {
    return column.formatter(row, column, row[column.prop], util,dayjs)
  }
  if(typeof column.format === 'string' && column.type === 'date') {
    return dayjs(row[column.prop]).format(column.format || 'YYYY-MM-DD HH:mm:ss')
  }
  // 如果是数字 且 使用了保留小数位数功能，则使用 fmtNum 格式化
  if (column.digit !== undefined) {
    return util.fmtNum(row[column.prop], false, column.digit)
  }
  // 否则返回数据本身，0 特例处理
  return row[column.prop] === 0 ? 0 : row[column.prop] || '-'
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

const updateList = async (params = {}) => {
  await (Table.value?.config?.preFunc || ((() => Promise.resolve)))()
  loading.value = true;
  // 分页参数
  const pagePareams = {
    [Page.value.config.alias.pageNum]: defaultPageProps.value.currentPage - 1,
    [Page.value.config.alias.pageSize]: defaultPageProps.value.pageSize,
  }
  // 额外参数
  const extraParams = Table.value.config.extraParams || {}
  // 合并参数
  let prams = {
    ...(props.pageCommonState.form || {}),
    ...extraParams,
    ...params,
  }
  // 参数转换
  if (typeof Table.value.config.transformPram === 'function') {
    prams = Table.value.config.transformPram(prams, { tabActive: active.value, activeTab: activeTab() })
  }
  prams = {
    ...prams,
    ...(Table.value.config.page ? pagePareams : {}),
  }
  // 请求数据
  Table.value.config.api(prams).then(res => {
    if (res.success) {
      tableData.value = res.data || [];
      defaultPageProps.value.total = res.total || 0;
    }
  }).finally(() => {
    loading.value = false;
  })
}

updateList();

const resize = () => {
  nextTick(() => {
    calculateVisibleButtons();
  });
}
onMounted(() => {
  if (Table.value.config.selection) {
    window.addEventListener('resize', resize)
    resize()
  }
  if (Table.value.config.tab) {
    initTabs()
  }
})
onUnmounted(() => {
  if (Table.value.config.selection) {
    window.removeEventListener('resize', resize)
  }
})
defineExpose({
  tableRef,
  handleCommand,
  handleCurrentChange,
  selectionConfig,
  updateList,
  tableData,
  selectNum
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
  background-color: #fff;
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
  color: #0052d9 !important;
}

:deep(.el-table .el-table__header-wrapper th) {
  background-color: #F6F8FC !important;
}

:deep(.el-button:hover) {
  background-color: transparent !important;
}
:deep(.el-table td.el-table__cell .cell){
  display: flex;
  align-items: center;
}
</style>
