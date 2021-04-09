import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vitePluginImport from 'vite-plugin-babel-import';
// let debugUrl = 'http://116.196.82.30:90' // 测试环境01
const debugUrl = 'http://182.92.160.173:90'; // 测试环境02
const baseUrl = {
    development: './',
    beta: './',
    release: './',
};
// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
    base: baseUrl[mode],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.join(__dirname, '/src'),
            },
        ],
    },
    css: {
        preprocessorOptions: {
            scss: { // 注意，键名是scss不是sass！
                // 这里写你想导入全局scss变量的路径，注意只能写相对路径，alias貌似在css中不会生效
                additionalData: `
                    @import './src/assets/scss/reset.scss';
                    @import './src/assets/scss/variable.scss';
                `,
            },
        },
    },
    devServer: {
        proxy: {
            '/manage': {
                target: debugUrl,
                changeOrigin: false,
            },
        },
    },
    plugins: [
        vue(),
        vitePluginImport([
            {
                libraryName: 'element-plus',
                libraryDirectory: 'es',
                style(name) {
                    return `element-plus/lib/theme-chalk/${name}.css`;
                },
            },
        ])],
    // 配置Dep优化行为
    // optimizeDeps: {
    //     include: ['lodash-es'],
    // },
});
