import { ref, reactive, watchEffect,computed } from "vue";
import util from "../utils";

export default function useSelection(Table, tableData,Page) {
  const props = Table.value.props;
  // 当前页是否是否全选
  const isCurAllSelected = ref(false);
  // 当前页是否部分选中
  const isIndeterminate = ref(false);
  // 选项配置
  const selectionConfig = reactive({
    type: "cur", // all - 全部选中状态, cur - 当前页状态
    checkedList: [], // 当前页状态下选中列表
    uncheckedList: [], // 全选状态下的取消选择列表
    checkedRows: [], // 当前页状态下选中行
  });

  watchEffect(() => {
    // 当前页是否全部选中
    let isCurSelectedAll = false;
    // 当前页是否部分选中
    let isCurSelectedSome = false;
    // 全部选中状态情况下
    if (selectionConfig.type === "all") {
      // 当前页是否全部选中
      isCurSelectedAll = tableData.value.every(
        (item) => !selectionConfig.uncheckedList.includes(item[props.rowKey])
      );
      // 当前页是否部分选中
      isCurSelectedSome =
        tableData.value.some((item) =>
          selectionConfig.uncheckedList.includes(item[props.rowKey])
        ) &&
        !tableData.value.every((item) =>
          selectionConfig.uncheckedList.includes(item[props.rowKey])
        );
    } else {
      // 当前页是否全部选中
      isCurSelectedAll = tableData.value.every((item) =>
        selectionConfig.checkedList.includes(item[props.rowKey])
      );
      // 当前页是否部分选中
      isCurSelectedSome =
        tableData.value.some((item) =>
          selectionConfig.checkedList.includes(item[props.rowKey])
        ) &&
        !tableData.value.every((item) =>
          selectionConfig.checkedList.includes(item[props.rowKey])
        );
    }
    // 如果是当前页全部都选中，顶部复选框变成勾选状态，半选变成 false
    if (isCurSelectedAll) {
      isCurAllSelected.value = true;
      isIndeterminate.value = false;
    } else {
      if (isCurSelectedSome) {
        // 如果是半选状态
        isCurAllSelected.value = false;
        isIndeterminate.value = true;
      } else {
        // 如果没有选中
        isCurAllSelected.value = false;
        isIndeterminate.value = false;
      }
    }
  });
  // 当前页是否是否全选和取消全选的复选框状态切换
  const toggleAllSelection = (checked) => {
    isCurAllSelected.value = checked;
    if (selectionConfig.type === "all") {
      // 全选状态下
      // 是否当前页是否全部选中，当前页没有一个 在 uncheckedList 中
      const isCurSelectedAll = tableData.value.every(
        (item) => !selectionConfig.uncheckedList.includes(item[props.rowKey])
      );
      if (checked) {
        // 选中
        if (isCurSelectedAll) { // 当前页全部选中,则进行取消当前页选中
          selectionConfig.uncheckedList.push(
            ...tableData.value.map((item) => item[props.rowKey])
          );
        } else {  // 当前页部分选中,或都没有选中，则进行当前页全部选中
          selectionConfig.uncheckedList = selectionConfig.uncheckedList.filter(
            (item) =>
              !tableData.value.map((item) => item[props.rowKey]).includes(item)
          );
        }
      } else {
        // 取消全选
        if (isCurSelectedAll) {  // 当前页全部选中,则进行取消当前页选中，当前页 全部放入到 uncheckedList 中
          selectionConfig.uncheckedList = [
            ...new Set([
              ...selectionConfig.uncheckedList,
              ...tableData.value.map((item) => item[props.rowKey]),
            ]),
          ];
        } else {  // 当前页部分选中,或都没有选中，则进行当前页全部选中
          selectionConfig.uncheckedList = selectionConfig.uncheckedList.filter(
            (item) =>
              !tableData.value.map((item) => item[props.rowKey]).includes(item)
          );
        }
      }
    } else {
      // 当前页状态下
      // 是否当前页是否全部选中，当前页没有一个 在 uncheckedList 中
      const isCurSelectedAll = tableData.value.every((item) =>
        selectionConfig.checkedList.includes(item[props.rowKey])
      );
      if (checked) {
        // 选中
        if (isCurSelectedAll) {
          // 当前页全部选中,则进行取消当前页选中
          selectionConfig.checkedList = selectionConfig.checkedList.filter(
            (item) =>
              !tableData.value.map((item) => item[props.rowKey]).includes(item)
          );
          selectionConfig.checkedRows = selectionConfig.checkedRows.filter(
            (item) =>
              !tableData.value.map((item) => item[props.rowKey]).includes(item[props.rowKey])
          );
        } else {
          selectionConfig.checkedList = [
            ...new Set([
              ...selectionConfig.checkedList,
              ...tableData.value.map((item) => item[props.rowKey]),
            ]),
          ];
          selectionConfig.checkedRows = util.unique([...selectionConfig.checkedRows, ...tableData.value],props.rowKey) 
        }
      } else {
        // 取消全选
        if (isCurSelectedAll) {
          selectionConfig.checkedList = selectionConfig.checkedList.filter(
            (item) =>
              !tableData.value.map((item) => item[props.rowKey]).includes(item)
          );
        } else {
          selectionConfig.checkedList = [
            ...new Set([
              ...selectionConfig.checkedList,
              ...tableData.value.map((item) => item[props.rowKey]),
            ]),
          ];
        }
      }
    }
  };
  /* 选项 row 复选框操作 */
  const isSelected = (row) => {
    return selectionConfig.type === "all"
      ? !selectionConfig.uncheckedList.includes(row[props.rowKey])
      : selectionConfig.checkedList.includes(row[props.rowKey]);
  };
  // 单个 row 操作
  const handleRowCheck = (checked, row) => {
    if (selectionConfig.type === "all") {
      // 全选状态下
      if (checked) {
        // 选中, 只需要把取消勾选的项 移出 uncheckedList 中
        selectionConfig.uncheckedList = selectionConfig.uncheckedList.filter(
          (item) => item !== row[props.rowKey]
        );
      } else {
        // 取消勾选，只需要把勾选的项 加入到  uncheckedList 中
        selectionConfig.uncheckedList.push(row[props.rowKey]);
      }
    } else {
      // 当前页状态下
      if (checked) {
        // 选中
        selectionConfig.checkedList.push(row[props.rowKey]);
        selectionConfig.checkedRows.push(row);
      } else {
        // 取消勾选
        selectionConfig.checkedList = selectionConfig.checkedList.filter(
          (item) => item !== row[props.rowKey]
        );
        selectionConfig.checkedRows = selectionConfig.checkedRows.filter(
          (item) => item[props.rowKey] !== row[props.rowKey]
        );
      }
    }
  };
  const handleCommand = (command) => {
    if (command === "all") {
      selectionConfig.uncheckedList = [];
      selectionConfig.checkedList = [];
      selectionConfig.type = "all";
      isCurAllSelected.value = true;
      selectionConfig.checkedRows =[]
    } else {
      selectionConfig.uncheckedList = [];
      selectionConfig.checkedList = [];
      selectionConfig.type = "cur";
      isCurAllSelected.value = false;
      selectionConfig.checkedRows =[]
    }
  };
  const selectNum = computed(()=>{
    if(selectionConfig.type === 'all' ){
      return Page.value.props.total - selectionConfig?.uncheckedList?.length
    } else{
      return selectionConfig?.checkedList?.length
    }
  })
  // 当前页是否有选中
  const isCurHasSelected = computed(()=>{
    if(selectionConfig.type === 'all' ){
      return tableData.value.some((item) => !selectionConfig.uncheckedList.includes(item[props.rowKey]))
    } else{
      return  tableData.value.some((item) =>selectionConfig.checkedList.includes(item[props.rowKey]))
    }
  })
  const cancelCurSelection = () => {
    if(selectionConfig.type === 'all' ){
      selectionConfig.uncheckedList = [
        ...new Set([
          ...selectionConfig.uncheckedList,
          ...tableData.value.map((item) => item[props.rowKey]),
        ]),
      ];
    } else{
      selectionConfig.checkedList =  selectionConfig.checkedList.filter((item) => !tableData.value.map(i=>i[props.rowKey]).includes(item))
      selectionConfig.checkedRows = selectionConfig.checkedRows.filter((item) => !tableData.value.map(i=>i[props.rowKey]).includes(item[props.rowKey]))
    }
  }

  return {
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
  };
}
