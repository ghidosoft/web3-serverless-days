module.exports = {
    extends: ['eslint:recommended', 'google', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react-hooks'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'linebreak-style': 0,
        'eol-last': 2,
        'indent': [2, 4, {SwitchCase: 1}],
        'jsx-quotes': 2,
        'max-len': [2, 160, 2],
        'quotes': [2, 'single', 'avoid-escape'],
        'quote-props': [2, 'consistent-as-needed'],
        'no-warning-comments': 1,
        'require-jsdoc': 0,
        'space-infix-ops': 2,
        'react/prop-types': [2, {skipUndeclared: true}],
        'react-hooks/rules-of-hooks': 2,
        'react-hooks/exhaustive-deps': 1,
    },
};
