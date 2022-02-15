#!/usr/bin/env node

'use strict';

// 实现深拷贝
const _ = require('lodash');
// 默认配置
const defaultConfig = require('./package.json');
// import * as defaultConfig from "./package.json"

// 引入调用者的`package.json`配置
var pkg = require(require('path').resolve('./package.json'));
// console.log(require('path').resolve('./package.json'))
// console.log(JSON.stringify(pkg));

// Object.assign函数为浅拷贝 | lodash深拷贝
const config = _.defaultsDeep({}, pkg, defaultConfig);

// 欢迎语(输出作者信息等)
var BANNER = `Thank you for installing \u001b[35m${config.name}[${config.version}]\u001b[0m: built with the \u001b[32m${config.author.name}\u001b[0m ${config.description} (\u001b[32m${config.author.url}\u001b[0m)\n\n`;

// 打赏
if (config.openteam.donate.enable) {
  BANNER += `\u001b[0m\u001b[96mIf you rely on this package, please consider donating or supporting our open group:\u001b[22m\u001b[39m\n> \u001b[94m${config.openteam.donate.url}\u001b[0m\n`;
}

// Others
// BANNER += config.openteam.others.banner.replace("${name}", config.name)
//   .replace("${openteam.github}", config.openteam.github);
// replace方法的第二参数为`function`时，参数的顺序问题分析
// 1.整个匹配的结果
// 2.最外层括号的匹配结果 
// 3.内层匹配结果中从左至右第一个匹配结果 
// 4.目标字符串和正则表达式中第一次匹配的索引 
// 5.目标字符串(被匹配的字符串)
if (!!config.openteam.others.banner) {
  BANNER += config.openteam.others.banner.replace(/\$\{(\w+(\.\w+)*)\}/g, (matched, capture1, capture2, index, regStr) => {
    // console.log("matched:" + matched, "capture1:" + capture1, "capture2:" + capture2,
    // "index:" + index, "regStr:" + regStr);
    // let captureStr = capture1 + (!!capture2 ? capture2 : "");
    // 获取最外层括号的匹配结果
    let captureStr = capture1;
    try {
      // 执行脚本代码并解析字符串
      let resolveStr = eval("config." + captureStr);
      debug_log(`捕获待解析表达式[${captureStr}]，解析后的值为：${resolveStr}`);
      return resolveStr;
    } catch (e) {
      debug_log(`捕获待解析表达式[${captureStr}]，解析错误(跳过解析)：${e.message}`);
    }
    return captureStr;
  });
}

let envDisable = isTrue(process.env.DISABLE_OPENCOLLECTIVE) || isTrue(process.env.CI);
var logLevel = process.env.npm_config_loglevel;
let logLevelDisplay = ['silent', 'error', 'warn'].indexOf(logLevel) > -1;

// install后在控制台输出一段日志
if (!envDisable && !logLevelDisplay) {
  console.log && console.log(BANNER);
} else {}

function isTrue(value) {
  return !!value && value !== '0' && value !== 'false';
}

// 输出调试日志
function debug_log(str = config.name) {
  if (!!str && config.openteam.debug) {
    console.log(str);
  }
}
