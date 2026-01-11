import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { langSet } from './components/ui/index.js'
const app = createApp(App)
langSet(app)
app.config.globalProperties.$t = (val)=>{
    return val
}
app.config.globalProperties.$t = (val)=>val;
app.use(ElementPlus)
app.mount('#app')
