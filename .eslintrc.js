module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'valid-jsdoc': ['off'],
    'require-jsdoc': ['off'],
    'max-len': ['off'],
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'never']
  },
  ignorePatterns: ['dist/*.js', 'rollup.config.js']
};
