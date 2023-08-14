import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as echarts from 'echarts';
import axios from 'axios';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'tailwindcss/tailwind.css'; // tailwindcss样式

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(VXETable);
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$axios = axios;
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
