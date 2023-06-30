module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'semi': 'warn',
    'quotes': ['warn', 'single'],
    'no-unused-vars': 'warn',
    'indent': ['warn', 2],
    'jsx-quotes': ['warn', 'prefer-single'],
    'max-len': ['warn', { code: 80 }],
  },
};
