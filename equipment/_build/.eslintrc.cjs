/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:import/typescript',
    'plugin:import/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.json', '.vue'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'max-len': 0,
    'no-console': process.env.NODE_ENV !== 'production' ? 'warn' : 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/first': 'error',
    'import/no-mutable-exports': 'error',
    'import/newline-after-import': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
};
