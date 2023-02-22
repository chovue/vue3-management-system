import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from "echarts";
import axios from 'axios'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VXETable)
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$axios = axios

app.mount('#app')
