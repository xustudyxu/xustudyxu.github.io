<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <header>
      <Navbar class="layout-header" v-if="showNavbar" />
    </header>

    <Home v-if="$page.frontmatter.home" />
    <main v-else>
      <Sidebar v-show="showSidebar" :items="sidebarItems"></Sidebar>

      <Page :sidebarItems="sidebarItems" :style="pageStyle"></Page>
    </main>
  </div>
</template>

<script>
import Sidebar from "@theme/components/Sidebar.vue";
import Home from "@theme/components/Home.vue";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";

import { resolveSidebarItems } from "../util";

export default {
  name: "Layout",
  components: {
    Home,
    Navbar,
    Page,
    Sidebar
  },
  computed: {
    pageClasses() {
      this.$page.pageClasses;
    },
    showNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      // 页面配置优先或者在config文件中配置了 直接返回false不显示navbar
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocalConfig.nav
      );
    },
    showSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.$store.state.global.sidebar &&
        this.sidebarItems.length
      );
    },
    pageStyle() {
      console.log(this)
      return {
        'padding-left':this.showSidebar? 299 + 'px': ''
      }
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localPath
      );
    }
  },
  methods: {
    onTouchStart(e) {
      console.log(e);
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
    handelPagePaddingLeft() {
      const SIDEBAR_WIDTH = this.$el.childNodes[2].childNodes[0].clientWidth;
      if (this.showSidebar) {
        this.$el.childNodes[2].childNodes[2].style.paddingLeft =
          SIDEBAR_WIDTH + "px";
      } else {
        this.$el.childNodes[2].childNodes[2].style.paddingLeft = 0 + "px";
      }
    }
  },
  mounted(){
    this.handelPagePaddingLeft()
  },
  watch: {
    "$store.state.global.sidebar": function(val) {
      console.log(val)
      if (val) {
 
        const SIDEBAR_WIDTH = this.$el.childNodes[2].childNodes[0].clientWidth;
        console.log(SIDEBAR_WIDTH)
        
        this.$el.childNodes[2].childNodes[2].style.paddingLeft =
          SIDEBAR_WIDTH + "px";
      } else {
        this.$el.childNodes[2].childNodes[2].style.paddingLeft = 0;
        // const SIDEBAR_WIDTH = this.$el.childNodes[2].childNodes[0].clientWidth;
        
        // this.$el.childNodes[2].childNodes[2].style.paddingLeft =
        //   SIDEBAR_WIDTH + "px";
      }
    }
  }
};
</script>
