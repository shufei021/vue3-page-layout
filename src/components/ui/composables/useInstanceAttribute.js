import { getCurrentInstance } from 'vue'
export default function useInstanceAttribute(keys) {
    const result = {}
    const { proxy } = getCurrentInstance();
    if(typeof keys === 'string') {
        return proxy[keys]
    } else if(Array.isArray(keys)) {
        keys.forEach(key => {
            result[key] = proxy[key]
        })
    }else{
        throw new Error("keys must be string or array")
    }
    return result
}