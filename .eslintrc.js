module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    eqeqeq: 'error',
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
}
