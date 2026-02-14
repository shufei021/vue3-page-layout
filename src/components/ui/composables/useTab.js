import { ref } from "vue";
export default function useTab(Table,props) {
  // tab 配置
  const tabConfig = Table.value?.config?.tab || {};
  // 当前高亮索引
  const active = ref(tabConfig.active || 0);
  // tab 数据（对象形式）
  const tabMap = ref({});
  // tab 数据是否已经请求过
  const tabLoad = ref(false);
  // tab数据请求
  const initTabs = async (params = {}) => {
    const { tabs = [], tabApi: api, transformPram,formatter } = tabConfig;
    if (typeof transformPram === "function") {
      params = transformPram({ params, pageCommonState: props.pageCommonState });
    }
    if (api) {
      const res = await api(params);
      if (res.success) {
        const data = res?.data;
        tabMap.value = data;
        if(formatter){
          formatter(data,tabs)
        } else{
          data && tabs.forEach((tab) => {
            tab.num = data[tab.value] || 0;
          });
        }
       
        if(!tabLoad.value){
            tabLoad.value = true
        }
      }
    } 
  };

//   watch(tabMap, (val) => {
//     if (props.config.table.config.tab.tabs.length) {
//       props.config.table.config.tab.tabs.forEach((tab) => {
//         const num = val[tab.value] || 0;
//         if (tab.num !== num) {
//           tab.num = num;
//         }
//       });
//     }
//     tabLoad.value = true;
//   });
  // tab 改变
  const changeTab = (updateList,pageCommonState,{index, item}) => {
    if (index === active.value) return
    active.value = index;
    tabConfig.onChange &&
    tabConfig.onChange({
        index,
        item,
        pageCommonState,
        tabInit: initTabs,
        updateList,
    });
  };
  return {
    changeTab,
    tabLoad,
    active,
    activeTab: ()=>tabConfig?.tabs?.[active?.value],
    tabMap,
    initTabs,
    onChange: (updateList,pageCommonState,obj) => changeTab(updateList,pageCommonState,obj),
  };
}
