module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //分号设置
    'semi': ['error','always'],
    //indent 缩进设置
    'indent':0,
    "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
    'space-before-function-paren':0,
    'no-unused-vars':0
  }
}
