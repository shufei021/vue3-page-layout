
import { getCurrentInstance, computed } from 'vue'
export default function useLang(){
    const instance = getCurrentInstance()
    const isUseLang = computed(() => !!(instance?.appContext.config.globalProperties.$uiLangConfig && instance.proxy.$t))
    const curLang = computed(() => {
        return (localStorage.getItem('lang') || 'en-US').includes('ar') ? 'ar' : 'en'
    })
    const Lang = computed(() => {
        const langConfig = instance?.appContext?.config?.globalProperties?.$uiLangConfig ||{}
        return new Proxy(langConfig, {
            get(target, key) {
                if(target[key].isPrivate){ // 私有字段
                    return target[key]
                } else{
                    return isUseLang.value ? instance.proxy.$t(target[key].origin) : target[key].en
                }
            }
        })
    })
    const transform = (value,obj) => {
        value = value[curLang.value]
        for(let key in obj){
           value = value.replace(new RegExp(`{${key}}`, 'g'), obj[key]);
        }
        return  value
    }
    return {
        Lang,
        curLang,
        transform,
        isUseLang
    }
}