module.exports = {
  parser: 'babel-eslint',
  extends: ['yoctol-base', 'prettier'],
  env: {
    node: true,
    jest: true,
    jasmine: true,
  },
  plugins: ['prettier'],
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
  },
};
