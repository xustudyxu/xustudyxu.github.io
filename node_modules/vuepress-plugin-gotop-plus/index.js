// VuePress内置函数
const {
  path
} = require('@vuepress/shared-utils')

// 默认插件配置
const defaultPluginConfig = require('./libs/default_plugin_config');

// 自定义插件实现
module.exports = (options = {}, context) => ({
  /* 插件的名称 */
  name: defaultPluginConfig.pluginName,

  /* 在应用初始化之后，并在某些特定的函数式 API 执行之前执行 */
  async ready() {
    options = Object.assign(defaultPluginConfig, options);
  },

  define() {
    if (options.log) {
      console.log && console.log("加载" + options.pluginName + "插件配置：" + (JSON.stringify ? JSON.stringify(options) : options));
    }
    return {
      GO_TOP_PLUS_PLUGIN_OPTIONS: JSON.stringify(options)
    };
  },

  /* 指向增强文件的绝对文件路径或返回该路径的函数 */
  enhanceAppFiles: [
    path.resolve(__dirname, './libs/enhanceAppFile.js')
  ],

  /* 全局 UI Vue 组件 */
  globalUIComponents: 'BackToTopPlus'

});
