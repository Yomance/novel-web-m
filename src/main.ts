import { createApp } from 'vue'
import './assets/css/style.less'

import App from './App.vue'
import route from './router/index';
// @ts-ignore
import longpress from './directive/longpress.ts';
// 替代v-html防止xss
import VueDOMPurifyHTML from 'vue-dompurify-html'
// pinia持久化插件
import piniaPluginPersist from 'pinia-plugin-persist';
import { createPinia } from 'pinia'

// vant样式
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

// mock数据
// import "./moke/index";

// store
const pinia = createPinia();
pinia.use(piniaPluginPersist);
createApp(App)
    .use(route)
    .use(VueDOMPurifyHTML)
    .use(pinia)
    .use(longpress)
    .mount('#app')

