module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    curly: 'error',
    'default-case': 'warn',
    'no-empty-function': 'error',
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-floating-decimal': 'error',
    'no-lone-blocks': 'error',
    'no-multi-spaces': 'error',
    'no-new': 'warn',
    'no-return-assign': 'error',
    'no-self-compare': 'error',
    'no-useless-call': 'error',
    'no-undef-init': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-dangle': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'new-parens': 'error',
    'no-nested-ternary': 'error',
    quotes: [
      'warn',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true }
    ],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-prototype-builtins': 'off',
    'no-var': 'warn'
  },
  parser: 'babel-eslint'
};
