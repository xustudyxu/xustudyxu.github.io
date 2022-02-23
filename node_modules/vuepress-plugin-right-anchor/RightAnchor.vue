<template>
  <div
    v-if="visible"
    class="ra-wrapper"
    :class="[rightAnchorOptions.customClass, global && 'is-global']"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
  >
    <div class="ra-button" @click="btnClick">
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
          class
        />
      </svg>
    </div>
    <ul v-show="opened" class="ra-menu">
      <li
        class="ra-menu-item"
        v-for="(item, index) in listData"
        :key="index"
        @click="itemClick(index, item.slug)"
        :class="[
          index === activeIndex ? 'active' : '',
          item.level > 2 ? 'sub' : '',
          `h${item.level}`,
        ]"
      >{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
import throttle from "lodash.throttle";

export default {
  name: "right-anchor",
  props: {
    global: Boolean
  },
  data() {
    return {
      listData: [],
      activeIndex: null,
      opened: false
    };
  },
  watch: {
    "$page.regularPath"() {
      this.filterDataByLevel();
    }
  },
  computed: {
    visible() {
      return (
        this.listData &&
        this.listData.length &&
        !(this.rightAnchorOptions.disableGlobalUI && this.global)
      );
    },
    rightAnchorOptions() {
      return this.$page.rightAnchor;
    },
    expandOptions() {
      return this.$page.rightAnchor?.expand;
    }
  },
  methods: {
    mouseover() {
      if (this.expandOptions.trigger === "hover") {
        this.opened = true;
      }
    },
    mouseleave() {
      if (this.expandOptions.trigger === "hover") {
        this.opened = false;
      }
    },
    btnClick() {
      if (this.expandOptions.trigger === "click") {
        this.opened = !this.opened;
      }
    },
    itemClick(index, slug) {
      this.activeIndex = index;

      window.scrollTo({
        top: document.getElementById(slug)?.offsetTop || 0,
        behavior: "smooth"
      });
    },
    filterDataByLevel() {
      this.listData = [];

      const { headers } = this.$page;
      const { isIgnore, showDepth } = this.rightAnchorOptions;

      if (isIgnore || showDepth === 0 || !headers) return;

      if (!showDepth) {
        this.listData = [...headers];
      } else {
        this.listData = headers.filter(item => item.level <= showDepth + 1);
      }
    },
    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    }
  },
  mounted() {
    this.filterDataByLevel();

    if (this.expandOptions?.trigger === "click") {
      this.opened = this.expandOptions?.clickModeDefaultOpen;
    }

    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrollTop = this.getScrollTop();

        this.listData.forEach((item, index) => {
          const elOffsetTop = document.getElementById(item.slug)?.offsetTop;
          if (elOffsetTop) {
            if (index === 0 && scrollTop < elOffsetTop) this.activeIndex = 0;
            else if (scrollTop >= elOffsetTop) this.activeIndex = index;
          }
        });
      }, 100)
    );
  }
};
</script>

<style lang="stylus" scoped>
$rightAnchorBgColor ?= #fff;
$rightAnchorTextColor ?= $textColor;
$rightAnchorFontSize ?= 14px;
// btn
$rightAnchorBtnTextColor ?= $rightAnchorTextColor;
$rightAnchorBtnBgColor ?= $rightAnchorBgColor;
// menu
$rightAnchorMenuTextColor ?= $rightAnchorTextColor;

.ra {
  &-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0;
    max-height: 75vh;
    min-width: 140px;

    &.is-global {
      position: fixed;
      top: $navbarHeight;
      right: 0;
      z-index: 1;

      .ra-menu {
        align-items: center;
      }
    }
  }

  &-button {
    position: absolute;
    right: 0.2rem;
    padding: 0.6rem;
    margin: 0.2rem;
    width: 1.75rem;
    height: 1.75rem;
    color: $rightAnchorBtnTextColor;
    background-color: $rightAnchorBtnBgColor;
    border-radius: 4px;
    cursor: pointer;

    .icon {
      width: 1.75rem;
      height: 1.75rem;
    }

    &:hover {
      color: $accentColor;
    }
  }

  &-menu {
    padding: 12px 0 12px 0;
    background-color: $rightAnchorBgColor;
    border-left: 1px solid $borderColor;
    font-size: $rightAnchorFontSize;
    overflow-y: auto;
    max-height: calc(100% - 1.75rem - 0.6rem * 2 + 0.2rem * 2);
    margin: calc(1.75rem + 0.6rem * 2 + 0.2rem * 2) 0 0 0;

    &-item {
      display: block;
      padding: 4px 12px 4px 0;
      margin-left: -1px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      color: $rightAnchorMenuTextColor;

      &.h1 {
        padding-left: 2px;
        font-weight: bold;
        font-size: $rightAnchorFontSize + 2px;
        text-align: center;
      }

      &.h2 {
        padding-left: 16px;
        font-weight: bold;
      }

      &.sub {
        padding-top: 2px;
        padding-bottom: 2px;

        &.h3 {
          padding-left: 24px;
        }

        &.h4 {
          padding-left: 32px;
        }

        &.h5 {
          padding-left: 40px;
        }

        &.h6 {
          padding-left: 48px;
        }
      }

      &:hover, &.active {
        color: $accentColor;
        border-left: 2px solid $accentColor;
        padding-left: 22px;

        &.h1 {
          padding-left: 0px;
        }

        &.h2 {
          padding-left: 14px;
        }

        &.sub {
          &.h3 {
            padding-left: 22px;
          }

          &.h4 {
            padding-left: 30px;
          }

          &.h5 {
            padding-left: 38px;
          }

          &.h6 {
            padding-left: 46px;
          }
        }
      }
    }
  }

  @media (max-width: $MQMobile) {
    .ra-wrapper {
      display: none;
    }
  }
}
</style>
