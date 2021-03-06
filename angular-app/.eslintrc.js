module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'consistent-return': 2,
    '@typescript-eslint/explicit-function-return-type': ['error'],
    'space-before-function-paren': 'off',
    semi: 'off',
    'no-useless-constructor': 'off'
  }
};
