<template>
  <transition name="fade">
    <svg
      v-if="show"
      class="go-to-top"
      id="go-to-top-plus"
      @click="scrollToTop"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 49.484 28.284"
    >
      <g transform="translate(-229 -126.358)">
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(229 151.107) rotate(-45)"
        />
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(274.949 154.642) rotate(-135)"
        />
      </g>
    </svg>
  </transition>
</template>

<script>
/** debounce防抖 */
import debounce from "lodash.debounce";

export default {
  props: {
    threshold: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      scrollTop: null
    };
  },

  mounted() {
    this.gotop_plus_log(
      this.$goTopPlusAppDescription +
        " ➡️ " +
        this.$goTopPlusAppName +
        " ➡️ " +
        this.$goTopPlusAppUrl
    );

    if (!this.options.mobileShow && !this.isPC()) {
      // 手机端不显示
      return;
    }
    this.scrollTop = this.getScrollTop();
    // `debounce`将多个触发事件的操作延迟到最后一次触发执行，在性能上做了一定的优化
    window.addEventListener(
      "scroll",
      debounce(() => {
        this.scrollTop = this.getScrollTop();
      }, 100)
    );
  },

  methods: {
    /** 判断是否是电脑端访问 */
    isPC() {
      let userAgentInfo = navigator.userAgent || "";
      const Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.scrollTop = 0;
    },
    // 统一输出日志
    gotop_plus_log(str = this.options.pluginName) {
      if (this.options.log) {
        console.log && console.log(str);
      }
    }
  },

  computed: {
    // 获取插件配置
    options() {
      return JSON.parse
        ? JSON.parse(GO_TOP_PLUS_PLUGIN_OPTIONS)
        : GO_TOP_PLUS_PLUGIN_OPTIONS;
    },
    show() {
      return this.scrollTop > this.options.threshold;
    }
  }
};
</script>

<style lang='stylus' scoped>
.go-to-top {
  cursor: pointer;
  position: fixed;
  bottom: 2rem;
  right: 2.5rem;
  width: 2rem;
  color: $accentColor;
  z-index: 1;
}

.go-to-top:hover {
  color: lighten($accentColor, 30%);
}

@media (max-width: 959px) {
  .go-to-top {
    // display: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
