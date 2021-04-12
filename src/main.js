import { createApp } from 'vue';
import element from '@/common/element/components';
// import 'element-plus/lib/theme-chalk/index.css';

import ElementLocale from 'element-plus/lib/locale';
import i18n from '@/lang';
import App from './App.vue';
import router from './router';

ElementLocale.i18n((key, value) => i18n.global.t(key, value));

const app = createApp(App);
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 };
// 注册 element 组件 插件
element(app);
app.use(router);
app.use(i18n);
app.mount('#app');
