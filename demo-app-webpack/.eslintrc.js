require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    extends: [
        'plugin:vue/vue3-essential',
    ],

    parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
    },
    rules: {
    }
  }