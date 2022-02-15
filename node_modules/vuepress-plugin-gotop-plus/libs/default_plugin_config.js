const config = require('../package.json');

/* 全局默认配置(插件定义的常量) */
module.exports = {
  // 全局开启是否打印控制台日志
  log: true,
  // 插件名称
  pluginName: config.name,
  // 默认插件配置(此处插件配置可更改)
  // 是否在移动设备上显示
  mobileShow: true,
  // 回到页首元素显示触发的高度阈值
  threshold: 50
};
