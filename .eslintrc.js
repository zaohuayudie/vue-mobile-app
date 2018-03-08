// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: 'module'
  // },
  env: {
    browser: true,
  },
  "globals": {
    "AMap": true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  //extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'rule-you-wish-to-disable': 0,
    'space-before-function-paren': [
      "error",
      {
        "anonymous": "ignore",
        "named": "ignore",
        "asyncArrow": "ignore"
      }
    ],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 2,
    // replace var with let or const
    'no-var': 2,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
