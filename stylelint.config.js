module.exports = {
    processors: [],
    plugins: [],
    extends: 'stylelint-config-standard', // 官方推荐的方式
    rules: {
        'at-rule-empty-line-before': 'never',
        'at-rule-name-case': 'lower',
        'block-no-empty': true,
    },
};
