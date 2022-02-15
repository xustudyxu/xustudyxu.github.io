import BackToTopPlus from './BackToTopPlus.vue'
import * as config from "../package.json"

export default ({
  Vue
}) => {
  // 自定义扩展参数
  Vue.prototype.$goTopPlusAppName = config.name;
  Vue.prototype.$goTopPlusAppUrl = config.homepage;
  Vue.prototype.$goTopPlusAppDescription = config.description;

  // 注册Vue全局组件
  Vue.component('BackToTopPlus', BackToTopPlus)
}
