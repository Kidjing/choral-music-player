module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: [
        'alloy',
        'alloy/react',
        'alloy/typescript',
    ],
    globals: {
        // 解决 eslint 无法识别 react 的 JSX, 在 ts 中是可以识别的
        JSX: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            strict: true,
        },
        ecmaVersion: 2016,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react-hooks'],
    rules: {
        // 采用 4 空格的缩进
        indent: [1, 4],
        '@typescript-eslint/indent': [1, 4],
        // 和 prettier 中规则冲突了, 关闭掉
        'arrow-parens': [0],
        // eslint 对 d.ts 检查为未定义, 覆盖掉 eslint 检查, 使用 ts 规则
        // https://stackoverflow.com/questions/55807329/why-eslint-throws-no-unused-vars-for-typescript-interface
        '@typescript-eslint/no-unused-vars': ['error'],
        // 公司级是推荐, 单元测试代码中不符合, 所以关闭掉
        'function-paren-newline': [0],
        // react hook 的规则: https://reactjs.org/docs/hooks-rules.html
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    },
    overrides: [
        {
            files: ['test/script/**/*'],
            rules: {
                '@typescript-eslint/no-require-imports': 'off',
            },
        },
    ],
};
