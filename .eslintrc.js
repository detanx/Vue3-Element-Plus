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
        'no-unused-vars': [
            2,
            {
                vars: 'all', // "local",允许声明未使用变量
                args: 'all', // 检查所有参数
            },
        ],
        quotes: ['error', 'single', { allowTemplateLiterals: true }], // 字符串使用单引号/模版字符串
        'import/no-absolute-path': [0], // 关闭不能使用绝对路径导入模块 @ 别名
        'import/no-unresolved': [0], // 关闭不能使用 @ 导入模块
        'no-multi-assign': [0], // 关闭不能使用 三元
        'vue/comment-directive': [0, {
            reportUnusedDisableDirectives: false,
        }],
        'no-restricted-globals': [0], // 关闭不能使用 isNaN 等方法
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
    settings: {
    // @路径引入的文件也需要校验
        'import/resolver': {
            alias: {
                map: [['@', '/src']],
                extensions: ['.ts', '.js', '.jsx', '.json', '.vue'],
            },
        },
    },
};
