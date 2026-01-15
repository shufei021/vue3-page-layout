import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { langSet } from './components/ui/index.js'
import router from "./router";
const app = createApp(App)
app.use(router);
langSet(app)
// app.config.globalProperties.$t = (val)=>{
//     return val 
// }
app.use(ElementPlus)
app.mount('#app')
