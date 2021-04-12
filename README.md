---
theme: channing-cyan
highlight: a11y-dark
---

- [仓库地址](https://github.com/detanx/Vue3-Element-Plus)，欢迎使用、`Star`。

### 为何使用 `Vite`

1. 快速的冷启动
2. 即时的模块热更新
3. 真正的按需编译

### 初始化项目

- 使用官网提供的命令快速创建一个 `Vue3.0 + Vite2.0` 的项目。

```
# npm 6.x
npm init @vitejs/app my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init @vitejs/app my-vue-app -- --template vue

# yarn
yarn create @vitejs/app my-vue-app --template vue
```

### 添加 `Element-ui`

- 注意：我们需要引入的是 `element-plus` 而不是 `element-ui`（`element-plus` 适配的是 `Vue3.0`）。

#### 组件全部加载

```
yarn add -S element-plus
```

- 修改 `main.js`

```
import { createApp } from 'vue';
import App from './App.vue';

+ import ElementPlus from 'element-plus';
+ import 'element-plus/lib/theme-chalk/index.css';
+ const App = createApp(App);
+ App.use(ElementPlus);
+ App.mount('#app');

- createApp(App).mount('#app');
```

#### 组件按需加载

##### 使用插件

1. 使用`vite-plugin-babel-import`

```
yarn add vite-plugin-babel-import -D
```

- 修改 `vite.config.js`

```
+ import vitePluginImport from 'vite-plugin-babel-import';
export default defineConfig({
    ...
    plugins: [
        ...,
+       vitePluginImport([
+           {
+               libraryName: 'element-plus',
+               libraryDirectory: 'es',
+               style(name) {
+                   return `element-plus/lib/theme-chalk/${name}.css`;
+               },
+           },
+       ])
    ]
})
```

2. 使用 `vite-plugin-style-import`

```
yarn add vite-plugin-style-import -D
```

- 修改 `vite.config.js`
  - **注意 `styleImport` 这个名字不能改**

```
+ import styleImport from 'vite-plugin-style-import';
export default defineConfig({
    ...
    plugins: [
        ...,
+       styleImport({ // 注意 styleImport 这个名字不能改
+           libs: [{
+               libraryName: 'element-plus',
+               esModule: true,
+               ensureStyleFile: true,
+               resolveStyle: (name) => { // 引入 .scss 样式
+                   // eslint-disable-next-line no-param-reassign
+                   name = name.slice(3);
+                   return `element-plus/packages/theme-+halk/src/${name}.scss`;
+               },
+               // resolveStyle: (name) => `element-plus/lib/theme-chalk/${name}.css`, // 引入 .css 样式
+               resolveComponent: (name) => `element-+lus/lib/${name}`,
+           }],
+       }),
    ]
})
```

##### 修改 `main.js`

```
// @需要配置src路径别名，后面会讲到
+ import element from '@/common/element/components';
- import ElementPlus from 'element-plus';
- import 'element-plus/lib/theme-chalk/index.css';

+ // 设置全局统一属性
+ app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 };
// 注册 element 组件 插件
element(app);
```

##### 增加 `components.js`

```
// src/common/element/components.js'
import {
    ElAlert,
    ElAside,
    ..., // 引入所需组件
    ElInfiniteScroll,
    ... // 引入所需插件
];
export const components = [
    ElAlert,
    ElAside,
    ...
]
export const plugins = [
    ElInfiniteScroll,
    ElLoading,
    ElMessage,
    ElMessageBox,
    ElNotification,
];
// 统一注册
export default (app) => {
    components.forEach((component) => {
        app.component(component.name, component);
    });
    plugins.forEach((plugin) => {
        app.use(plugin);
    });
};

```

### 添加 `ESLint`

- 我一直习惯用的是 `airbnb` 那套规范，你也可以选择其他的。

```
yarn add -D eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-vue
```

- 增加 `ESLint` 的配置文件 `.eslintrc.js`。

```
module.exports = {
    extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        // 自己配置的规则
        indent: [2, 4],
        'no-unused-vars': [2, {
            vars: 'all', // "local",允许声明未使用变量
            args: 'all', // 检查所有参数
        }],
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                // 这里写覆盖vue文件的规则
                'no-unused-vars': [0],
            },
        },
    ],
};
```

- 配合 `VS Code` 插件 `beautify`，简单报错保存自动修复。[所有规则](https://eslint.org/docs/rules/)

```
// settings.json
{
    ...,
    "editor.formatOnSave": true, // #每次保存的时候自动格式化
    "editor.codeActionsOnSave": {  // 自动修复
      "source.fixAll.eslint": true,
    },
    "eslint.validate": ["javascript", "vue", "html"],// 配置 ESLint 检查的文件类型
    "eslint.options": { //指定vscode的eslint所处理的文件的后缀
      "extensions": [".js", ".vue", ".ts", ".tsx"]
    },
    "beautify.language": {
      "js": {
          "type": [
              "javascript",
              "json"
          ],
          "filename": [
              ".jshintrc",
              ".jsbeautify"
          ]
      },
      "css": [
          "css",
          "scss"
      ],
      "html": [
          "htm",
          "html",
          "vue"//在这里加上vue
      ]
    },
    "[json]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    }
}
```

- 添加 `ESLint` 忽略检查的配置文件 `.eslintignore`

```
// 根据自己需要可以自行添加
/node_modules
/dist
*.html
```

### 添加 `SASS` 预处理

- 安装

```
yarn add -D sass
```

- `Vite` 引入`SASS`全局变量/样式，`Vite1.0`和`2.0`的写法不太一样，有变化请 [查看文档](https://cn.vitejs.dev/config/#css-preprocessoroptions)。

```
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
    ...,
    css: {
        preprocessorOptions: {
            scss: { // 注意：键名是scss不是sass！
            // 这里写你想导入全局scss变量的路径，注意只能写相对路径，alias貌似在css中不会生效
                additionalData: "@import './src/assets/scss/reset.scss';@import './src/assets/scss/variable.scss';",
            },
        },
    },
    plugins: [vue()],
});

```

### 增加别名配置

- 修改 `vite.config.js`。

```
// vite.config.js
+ import path from 'path';
export default defineConfig({
+    resolve: {
+        alias: [{
+            find: '@',
+            replacement: path.join(__dirname, 'src'),
+        },],
+    },
     ...
});
```

- 修改 `.eslintrc.js`。

```
// .eslintrc.js
module.exports = {
+    settings: { // @路径引入的文件也需要校验
+        'import/resolver': {
+            alias: {
+                map: [
+                    ['@', './src'],
+                ],
+                extensions: ['.ts', '.js', '.jsx', '.json', '.vue'],
+            },
+        },
+    },
    ...
}
```

- 配置好后，发现使用 `@` 引入文件还是在报错。
  ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05dd9c03456e46b59ab49ac5084d65a4~tplv-k3u1fbpfcp-watermark.image)
- 在 `.eslintrc.js` 的规则中加入一下规则。

```
module.exports = {
    rules: {
+        'import/no-absolute-path': [0], // 关闭不能使用绝对路径导入模块
    }
}
```

### 配置 `vue-router`

#### 安装相应的包

```
yarn add -S vue-router; // 4
```

#### 添加 `router` 目录及对应文件

- 添加 `index.js` 文件。

```
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
```

- 添加 `routes.js` 文件。

```
// src/router/routes.js
const home = () => import('@/pages/home/index.vue');
const login = () => import('@/pages/login/index.vue');
const Page404 = () => import('@/components/Page404.vue');

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/home',
        name: 'home',
        component: home,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    }, {
        path: '/:catchAll(.*)',
        name: '404',
        component: Page404,
    },
];
export default routes;
```

- 添加页面文件，以 `home` 页面为例，全部代码请移步仓库查看 [仓库地址](https://github.com/detanx/Vue3-Element-Plus)。

```
// src/pages/home/index.vue
<template>
  <p>home</p>
  <el-button type="primary" @click="toLogin">Login</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const toLogin = (() => {
    router.push({
        name: 'login',
    });
});
</script>
```

### 添加提交校验

#### 添加 `husky`

- [husky 官方文档](https://typicode.github.io/husky/#/)

1. 安装 `husky` 并启用 `git hooks`

```
npx husky add .husky/pre-commit "npm run lint"
```

2. 修改 `package.json` 文件

```
// package.json
{
    scripts: {
        ...,
        "lint": "eslint . --ext .js,.ts,.vue --ignore-path .gitignore",
        "prepare": "husky install"
    },
}
```

3. 添加 `commit` 提交内容规范 `git hooks`

```
npx husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
```

4. 添加 `commitlint.config.js` 及相关依赖

```
// 依赖
yarn add @commitlint/cli @commitlint/config-conventional -D

// commitlint.config.js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
        ],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
    },
};
// commit 的内容，只允许使用下面7个标识。

// feat: 新功能
// fix: 修补bug
// docs: 文档（documentation）
// style: 样式/格式（不影响代码运行的变动）
// refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
// test: 增加测试
// chore: 构建过程或辅助工具的变动
```

#### 添加 `lint-staged`

- [lint-staged 官方文档](https://www.npmjs.com/package/lint-staged)
- `lint-staged` 在我们提交代码时，只会对修改的文件进行检查、修复处理，以保证提交的代码没有语法错误，不会影响其他伙伴在更新代码无法运行的问题。

1. 安装

```
yarn add lint-staged -D
```

2. 添加 `.lintstagedrc` 配置文件及依赖

- [stylelint 规则文档](https://stylelint.io/user-guide/usage/cli)

```
// 依赖
yarn add -D stylelint stylelint-config-standard

// .lintstagedrc
{
  "*.{js,ts,vue}": ["npm run lint"],
  "*.{html,vue,css,scss,sass,less}": ["stylelint --fix"]
}
```

3. 修改 `pre-commit` 文件

```
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

- npm run lint
+ yarn lint-staged --allow-empty "$1"
```

#### 测试代码检查及提交规范

- [VS Code 配置](https://github.com/detanx/Vue3-Element-Plus/blob/main/vscode-setting.json)

1. 代码检查
   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd4e85d7f8d240108049ef3bc9b59afd~tplv-k3u1fbpfcp-watermark.image)
2. `git` 提交规范
   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24f9246dee4247039d9afbd416848e78~tplv-k3u1fbpfcp-watermark.image)

### 增加多语言配置

#### 安装依赖

```
yarn add vue-i18n -S
```

#### 增加 lang 目录及语言配置文件

- 增加 `src/lang/en.js`

```
// src/lang/en.js
export default {
    user: {
        name: 'Detanx',
        changeLang: 'Change Language',
    },
    home: {
        toLogin: 'To Login',
    },
    login: {
        toHome: 'To Home',
    },
};
```

- 增加 `src/lang/zh-cn.js`

```
// src/lang/zh-cn.js
export default {
    user: {
        name: '小小小十七',
        changeLang: '切换语言',
    },
    home: {
        toLogin: '去登录',
    },
    login: {
        toHome: '去首页',
    },
};
```

- 增加 `src/lang/index.js`

```
// src/lang/index.js
import { createI18n } from 'vue-i18n';
import elementlangEn from 'element-plus/lib/locale/lang/en';
import elementlangZhCn from 'element-plus/lib/locale/lang/zh-cn';
import localeLangEn from './en';
import localeLangZhCn from './zh-cn';

const messages = {
    en: {
        ...localeLangEn,
        ...elementlangEn,
    },
    'zh-cn': {
        ...localeLangZhCn,
        ...elementlangZhCn,
    },
};

const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'zh-cn',
    messages,
});

export default i18n;
```

#### 修改 main.js

```
// main.js
import { createApp } from 'vue';
import element from '@/common/element/components';

+ import ElementLocale from 'element-plus/lib/locale';
+ import i18n from '@/lang';
import App from './App.vue';
import router from './router';

+ ElementLocale.i18n((key, value) => i18n.global.t(key, value));

const app = createApp(App);
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 };
// 注册 element 组件 插件
element(app);
app.use(router);
+ app.use(i18n);
app.mount('#app');
```

#### 修改页面文件

```
// src/pages/home/index.vue
<template>
-  <p>home</p>
-  <el-button type="primary" @click="toLogin">Login</el-button>
+  <el-button type="primary" @click="$i18n.locale = $i18n.locale === 'en' ? 'zh-cn' : 'en'">
+    {{$t("user.changeLang")}}
+  </el-button>
+  <p style="margin: 10px;">{{$t("user.name")}}</p>
+  <el-button type="primary" @click="toLogin">{{$t("home.toLogin")}}</el-button>
</template>
...
```

#### 测试结果演示

[i18n-test.mov](https://github.com/detanx/Vue3-Element-Plus/blob/main/i18n-test.mov)

### 往期精彩

- [「前端进阶」JavaScript 手写方法/使用技巧自查](https://juejin.cn/post/6945991002851115021)
- [JavaScript 设计模式之简介及创建型模式](https://juejin.cn/post/6933874018755805197)
- [公众号打开小程序最佳解决方案（Vue）](https://juejin.cn/post/6925346648836112391)
- [Axios 你可能不知道使用方式](https://juejin.cn/post/6844904145082646542)

### 「点赞、收藏和评论」

❤️ 关注+点赞+收藏+评论+转发 ❤️ ，创作不易，鼓励笔者创作更好的文章，谢谢 🙏 大家。
