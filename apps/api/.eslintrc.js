module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        sourceType: 'module',
        ecmaVersion: 2022,
        babelOptions: {
            plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
        },
    },
    plugins: ['prettier'],
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    env: {
        node: true,
        es2022: true,
    },
    rules: {
        'no-console': 'error',
        'no-var': 'error',
        'prettier/prettier': 'error',
        'max-len': [
            'error',
            {
                code: 120,
                ignoreStrings: true,
                ignoreComments: true,
                ignoreTemplateLiterals: true,
            },
        ],
    },
}
