import { createApp } from 'vue';
import element from '@/common/element/components';
// import 'element-plus/lib/theme-chalk/index.css';

import router from './router';
import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 };
// 注册 element 组件 插件
element(app);
app.use(router);
app.mount('#app');
