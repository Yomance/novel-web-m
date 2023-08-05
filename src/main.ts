import { createApp } from 'vue'
import './style.less';

import './util/extend'
import App from './App.vue'
import route from './router/index';
// @ts-ignore
import longpress from './directive/longpress.ts';
// 替代v-html防止xss
import VueDOMPurifyHTML from 'vue-dompurify-html'
// pinia持久化插件
import piniaPluginPersist from 'pinia-plugin-persist';
import { createPinia } from 'pinia'


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

